
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BudgetsList } from "@/components/budgets/BudgetsList";
import { BudgetForm } from "@/components/budgets/BudgetForm";
import { RoundButton } from "@/components/ui/RoundButton";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const Budgets = () => {
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Budgets</h1>
              <p className="text-muted-foreground">Create and manage your spending limits</p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <RoundButton onClick={() => setShowBudgetForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Budget
              </RoundButton>
            </div>
          </div>
          
          {showBudgetForm && (
            <div className="mb-6">
              <BudgetForm onCancel={() => setShowBudgetForm(false)} onSuccess={() => {
                setShowBudgetForm(false);
                toast.success("Budget created successfully");
              }} />
            </div>
          )}
          
          <BudgetsList />
        </div>
      </main>
    </div>
  );
};

export default Budgets;
