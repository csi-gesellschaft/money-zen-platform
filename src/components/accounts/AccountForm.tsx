
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RoundButton } from '@/components/ui/RoundButton';
import { X } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Account name must be at least 2 characters.",
  }),
  institution: z.string().min(2, {
    message: "Institution name must be at least 2 characters.",
  }),
  type: z.string().min(1, {
    message: "Please select an account type.",
  }),
  balance: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Balance must be a number.",
  }),
  creditLimit: z.string().optional(),
});

type AccountFormValues = z.infer<typeof formSchema>;

interface AccountFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const AccountForm = ({ onCancel, onSuccess }: AccountFormProps) => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      institution: "",
      type: "",
      balance: "",
      creditLimit: "",
    },
  });

  const accountType = form.watch("type");

  const onSubmit = (data: AccountFormValues) => {
    // Here we would normally save the account to a database
    console.log(data);
    
    // Call success callback
    onSuccess();
  };

  const accountTypes = [
    { value: "checking", label: "Checking" },
    { value: "savings", label: "Savings" },
    { value: "credit", label: "Credit Card" },
    { value: "investment", label: "Investment" },
    { value: "loan", label: "Loan" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="border rounded-xl p-5 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add New Account</h2>
        <RoundButton variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </RoundButton>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Main Checking" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financial Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Chase Bank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    {...field}
                  >
                    <option value="" disabled>Select account type</option>
                    {accountTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {accountType === "credit" || accountType === "loan" 
                    ? "Current Balance (use negative for debt)" 
                    : "Current Balance"
                  }
                </FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {accountType === "credit" && (
            <FormField
              control={form.control}
              name="creditLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Limit</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <div className="flex justify-end space-x-2 pt-2">
            <RoundButton type="button" variant="outline" onClick={onCancel}>
              Cancel
            </RoundButton>
            <RoundButton type="submit">
              Add Account
            </RoundButton>
          </div>
        </form>
      </Form>
    </div>
  );
};
