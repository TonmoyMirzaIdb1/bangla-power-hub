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
  name: z.string().min(3, "Name must be at least 3 characters"),
  location: z.string().min(1, "Location is required"),
  capacity_mw: z.string().min(1, "Capacity is required"),
  fuel_type: z.string().min(1, "Fuel type is required"),
  is_active: z.boolean().default(true),
});

interface PlantManagementFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  initialData?: Partial<z.infer<typeof formSchema>>;
  mode?: "create" | "edit";
}

export const PlantManagementForm = ({ onSubmit, initialData, mode = "create" }: PlantManagementFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      is_active: true,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      toast.success(`Power plant ${mode === "create" ? "created" : "updated"} successfully`);
      if (mode === "create") {
        form.reset();
      }
    } catch (error) {
      toast.error(`Failed to ${mode} power plant`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plant Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter plant name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity_mw"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity (MW)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fuel_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="coal">Coal</SelectItem>
                  <SelectItem value="gas">Natural Gas</SelectItem>
                  <SelectItem value="oil">Oil</SelectItem>
                  <SelectItem value="nuclear">Nuclear</SelectItem>
                  <SelectItem value="hydro">Hydro</SelectItem>
                  <SelectItem value="solar">Solar</SelectItem>
                  <SelectItem value="wind">Wind</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {mode === "create" ? "Create Plant" : "Update Plant"}
        </Button>
      </form>
    </Form>
  );
};
