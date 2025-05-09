
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
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Budget amount must be greater than 0.",
  }),
  period: z.string().min(1, {
    message: "Please select a budget period.",
  }),
  color: z.string().min(1, {
    message: "Please select a color.",
  }),
});

type BudgetFormValues = z.infer<typeof formSchema>;

interface BudgetFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const BudgetForm = ({ onCancel, onSuccess }: BudgetFormProps) => {
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      amount: "",
      period: "monthly",
      color: "bg-purple",
    },
  });

  const onSubmit = (data: BudgetFormValues) => {
    // Here we would normally save the budget to a database
    console.log(data);
    
    // Call success callback
    onSuccess();
  };

  const budgetPeriods = ["weekly", "monthly", "quarterly", "yearly"];
  
  const colorOptions = [
    { value: "bg-purple", label: "Purple" },
    { value: "bg-blue", label: "Blue" },
    { value: "bg-green", label: "Green" },
    { value: "bg-orange", label: "Orange" },
    { value: "bg-red", label: "Red" },
  ];

  return (
    <div className="border rounded-xl p-5 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Create New Budget</h2>
        <RoundButton variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </RoundButton>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Housing, Groceries" {...field} />
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
                <FormLabel>Budget Amount</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Period</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    {...field}
                  >
                    {budgetPeriods.map(period => (
                      <option key={period} value={period}>
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <div className="flex space-x-3 mt-2">
                  {colorOptions.map(color => (
                    <div 
                      key={color.value}
                      onClick={() => form.setValue("color", color.value)}
                      className={`h-8 w-8 rounded-full ${color.value} cursor-pointer transition-all ${
                        field.value === color.value ? "ring-2 ring-black ring-offset-2" : ""
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-2 pt-2">
            <RoundButton type="button" variant="outline" onClick={onCancel}>
              Cancel
            </RoundButton>
            <RoundButton type="submit">
              Create Budget
            </RoundButton>
          </div>
        </form>
      </Form>
    </div>
  );
};
