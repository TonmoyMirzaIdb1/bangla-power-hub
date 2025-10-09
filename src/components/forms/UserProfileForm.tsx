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
import { toast } from "sonner";

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  employee_id: z.string().optional(),
  avatar_url: z.string().optional(),
});

interface UserProfileFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  initialData?: Partial<z.infer<typeof formSchema>>;
  mode?: "create" | "edit";
}

export const UserProfileForm = ({ onSubmit, initialData, mode = "edit" }: UserProfileFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      toast.success(mode === "create" ? "User created successfully" : "Profile updated successfully");
      if (mode === "create") {
        form.reset();
      }
    } catch (error) {
      toast.error(mode === "create" ? "Failed to create user" : "Failed to update profile");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+880 1XXX-XXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employee_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter employee ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {mode === "create" ? "Create User" : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};
