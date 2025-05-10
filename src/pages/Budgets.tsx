
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BudgetsList } from "@/components/budgets/BudgetsList";
import { BudgetForm } from "@/components/budgets/BudgetForm";
import { RoundButton } from "@/components/ui/RoundButton";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Budgets = () => {
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);

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
              <RoundButton onClick={() => setIsBudgetFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Budget
              </RoundButton>
            </div>
          </div>
          
          <BudgetsList />
          
          <Dialog open={isBudgetFormOpen} onOpenChange={setIsBudgetFormOpen}>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
                <DialogDescription>
                  Set spending limits for different categories to help manage your finances.
                </DialogDescription>
              </DialogHeader>
              <BudgetForm 
                onCancel={() => setIsBudgetFormOpen(false)} 
                onSuccess={() => {
                  setIsBudgetFormOpen(false);
                  toast.success("Budget created successfully");
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Budgets;
