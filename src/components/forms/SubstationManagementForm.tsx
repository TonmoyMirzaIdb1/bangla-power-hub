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
  capacity_mva: z.string().min(1, "Capacity is required"),
  voltage_level: z.string().min(1, "Voltage level is required"),
  is_active: z.boolean().default(true),
});

interface SubstationManagementFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  initialData?: Partial<z.infer<typeof formSchema>>;
  mode?: "create" | "edit";
}

export const SubstationManagementForm = ({ onSubmit, initialData, mode = "create" }: SubstationManagementFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      is_active: true,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      toast.success(`Substation ${mode === "create" ? "created" : "updated"} successfully`);
      if (mode === "create") {
        form.reset();
      }
    } catch (error) {
      toast.error(`Failed to ${mode} substation`);
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
              <FormLabel>Substation Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter substation name" {...field} />
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
          name="capacity_mva"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity (MVA)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voltage_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voltage Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select voltage level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="400kV">400 kV</SelectItem>
                  <SelectItem value="230kV">230 kV</SelectItem>
                  <SelectItem value="132kV">132 kV</SelectItem>
                  <SelectItem value="33kV">33 kV</SelectItem>
                  <SelectItem value="11kV">11 kV</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {mode === "create" ? "Create Substation" : "Update Substation"}
        </Button>
      </form>
    </Form>
  );
};
