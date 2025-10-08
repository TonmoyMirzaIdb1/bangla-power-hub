import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  feeder_name: z.string().min(1, "Feeder name is required"),
  region: z.string().min(1, "Region is required"),
  load_mw: z.string().min(1, "Load is required"),
  voltage_kv: z.string().optional(),
  status: z.enum(["operational", "maintenance", "offline"]),
  outage_duration_minutes: z.string().optional(),
  customers_affected: z.string().optional(),
});

interface DistributionDataFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
}

export const DistributionDataForm = ({ onSubmit }: DistributionDataFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "operational",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      toast.success("Distribution data recorded successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to record distribution data");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="feeder_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feeder Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter feeder name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input placeholder="Enter region" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="load_mw"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Load (MW)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voltage_kv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voltage (kV)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outage_duration_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outage Duration (minutes)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customers_affected"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customers Affected</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit Distribution Data
        </Button>
      </form>
    </Form>
  );
};
