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
  bill_id: z.string().min(1, "Bill is required"),
  payment_method: z.enum(["cash", "card", "mobile_banking", "bank_transfer"]),
  amount: z.string().min(1, "Amount is required"),
  transaction_reference: z.string().optional(),
});

interface BillPaymentFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  bills: { id: string; billing_month: string; amount_bdt: number }[];
}

export const BillPaymentForm = ({ onSubmit, bills }: BillPaymentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payment_method: "mobile_banking",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      toast.success("Payment processed successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to process payment");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="bill_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Bill</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bill to pay" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background z-50">
                  {bills.map((bill) => (
                    <SelectItem key={bill.id} value={bill.id}>
                      {bill.billing_month} - ৳{bill.amount_bdt.toLocaleString()}
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
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="mobile_banking">Mobile Banking (bKash/Nagad)</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (৳)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transaction_reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Reference (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter transaction reference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Process Payment
        </Button>
      </form>
    </Form>
  );
};
