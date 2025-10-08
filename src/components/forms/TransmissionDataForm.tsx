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
  substation_id: z.string().min(1, "Substation is required"),
  load_mw: z.string().min(1, "Load is required"),
  voltage_kv: z.string().optional(),
  frequency_hz: z.string().optional(),
  losses_percent: z.string().optional(),
  status: z.enum(["operational", "maintenance", "offline"]),
});

interface TransmissionDataFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  substations: { id: string; name: string }[];
}

export const TransmissionDataForm = ({ onSubmit, substations }: TransmissionDataFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "operational",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      toast.success("Transmission data recorded successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to record transmission data");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="substation_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Substation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a substation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background z-50">
                  {substations.map((substation) => (
                    <SelectItem key={substation.id} value={substation.id}>
                      {substation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          name="frequency_hz"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency (Hz)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="50.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="losses_percent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Losses (%)</FormLabel>
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

        <Button type="submit" className="w-full">
          Submit Transmission Data
        </Button>
      </form>
    </Form>
  );
};
