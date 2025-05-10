
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoundButton } from '../ui/RoundButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Home, Car, GraduationCap, Plane, Briefcase, HeartPulse, Gift } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const goalCategories = [
  { value: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { value: 'car', label: 'Vehicle', icon: <Car className="h-4 w-4" /> },
  { value: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
  { value: 'travel', label: 'Travel', icon: <Plane className="h-4 w-4" /> },
  { value: 'emergency', label: 'Emergency Fund', icon: <Briefcase className="h-4 w-4" /> },
  { value: 'medical', label: 'Medical', icon: <HeartPulse className="h-4 w-4" /> },
  { value: 'retirement', label: 'Retirement', icon: <Gift className="h-4 w-4" /> },
  { value: 'other', label: 'Other', icon: null },
];

interface GoalFormProps {
  onSuccess?: () => void;
  existingGoal?: {
    id: string;
    title: string;
    category: string;
    targetAmount: number;
    savedAmount: number;
    dueDate: Date;
  };
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }).max(50, {
    message: "Title must not exceed 50 characters."
  }),
  category: z.string({
    required_error: "Please select a category",
  }),
  targetAmount: z.coerce.number().positive({
    message: "Target amount must be positive.",
  }),
  initialSavings: z.coerce.number().min(0, {
    message: "Initial savings cannot be negative.",
  }),
  dueDate: z.date({
    required_error: "Due date is required",
  }).refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const GoalForm = ({ onSuccess, existingGoal }: GoalFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: existingGoal ? {
      title: existingGoal.title,
      category: existingGoal.category,
      targetAmount: existingGoal.targetAmount,
      initialSavings: existingGoal.savedAmount,
      dueDate: existingGoal.dueDate,
    } : {
      title: "",
      category: "",
      targetAmount: 0,
      initialSavings: 0,
      dueDate: undefined,
    }
  });
  
  const onSubmit = (values: FormValues) => {
    // In a real app, this would save to a database
    console.log(values);
    
    toast.success(
      existingGoal 
        ? `Goal "${values.title}" updated successfully!` 
        : `Goal "${values.title}" created successfully!`
    );
    
    if (onSuccess) {
      onSuccess();
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., New Car, Down Payment, etc." {...field} />
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
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {goalCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center">
                        {category.icon && <span className="mr-2">{category.icon}</span>}
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="initialSavings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Savings ($)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Target Completion Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <RoundButton
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                    </RoundButton>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <RoundButton type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </RoundButton>
          <RoundButton type="submit">
            {existingGoal ? 'Update Goal' : 'Create Goal'}
          </RoundButton>
        </div>
      </form>
    </Form>
  );
};
