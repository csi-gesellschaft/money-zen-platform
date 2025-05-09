
import { useState } from 'react';
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
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
    message: "Amount must be a non-zero number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  account: z.string().min(1, {
    message: "Please select an account.",
  }),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  notes: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof formSchema>;

interface TransactionFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const TransactionForm = ({ onCancel, onSuccess }: TransactionFormProps) => {
  const [isIncome, setIsIncome] = useState(false);
  
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      account: "",
      date: new Date().toISOString().split('T')[0],
      notes: "",
    },
  });

  const onSubmit = (data: TransactionFormValues) => {
    // Here we would normally save the transaction to a database
    // Adjust the amount based on whether it's income or expense
    const amount = isIncome ? Math.abs(Number(data.amount)) : -Math.abs(Number(data.amount));
    console.log({ ...data, amount });
    
    // Call success callback
    onSuccess();
  };

  const categories = isIncome 
    ? ["Salary", "Investments", "Gifts", "Other Income"] 
    : ["Groceries", "Dining", "Transportation", "Housing", "Entertainment", "Utilities", "Shopping", "Health", "Travel", "Education", "Other"];

  const accounts = ["Main Checking", "Savings", "Credit Card", "Investment"];

  return (
    <div className="border rounded-xl p-5 bg-background">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{isIncome ? "Add Income" : "Add Expense"}</h2>
        <RoundButton variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </RoundButton>
      </div>
      
      <div className="flex space-x-2 mb-6">
        <RoundButton 
          onClick={() => setIsIncome(false)}
          variant={isIncome ? "outline" : "primary"}
          className={isIncome ? "" : "bg-purple"}
        >
          Expense
        </RoundButton>
        <RoundButton 
          onClick={() => setIsIncome(true)}
          variant={isIncome ? "primary" : "outline"}
          className={isIncome ? "bg-green" : ""}
        >
          Income
        </RoundButton>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Grocery shopping" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="" disabled>Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="" disabled>Select an account</option>
                      {accounts.map(account => (
                        <option key={account} value={account}>{account}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Add any additional details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-2 pt-2">
            <RoundButton type="button" variant="outline" onClick={onCancel}>
              Cancel
            </RoundButton>
            <RoundButton type="submit">
              Save {isIncome ? "Income" : "Expense"}
            </RoundButton>
          </div>
        </form>
      </Form>
    </div>
  );
};
