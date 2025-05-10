
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BudgetsList } from "@/components/budgets/BudgetsList";
import { BudgetForm } from "@/components/budgets/BudgetForm";
import { RoundButton } from "@/components/ui/RoundButton";
import { Plus, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { exportToCSV, generateDetailedReport, generateSimpleReport } from "@/utils/reportExport";

// Sample budget data for export
const budgetData = [
  {
    id: "1",
    category: "Housing",
    spent: 1200,
    total: 1500,
    percentSpent: 80,
  },
  {
    id: "2",
    category: "Groceries",
    spent: 450,
    total: 500,
    percentSpent: 90,
  },
  {
    id: "3",
    category: "Transportation",
    spent: 250,
    total: 350,
    percentSpent: 71,
  },
  {
    id: "4",
    category: "Entertainment",
    spent: 180,
    total: 200,
    percentSpent: 90,
  },
];

const Budgets = () => {
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const handleExportSimple = () => {
    generateSimpleReport(
      budgetData,
      { fileName: 'budgets', title: 'Budgets Report' },
      ['id', 'category', 'total', 'spent']
    );
    toast.success('Simple budget report exported');
  };

  const handleExportDetailed = () => {
    generateDetailedReport(
      budgetData,
      { fileName: 'budgets', title: 'Detailed Budget Report' }
    );
    toast.success('Detailed budget report exported');
  };

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
            
            <div className="flex gap-3 mt-4 sm:mt-0">
              <DropdownMenu open={isExportMenuOpen} onOpenChange={setIsExportMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <RoundButton variant="outline" className="bg-gradient-green text-white hover:opacity-90">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </RoundButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportSimple}>
                    <FileText className="mr-2 h-4 w-4" />
                    Simple Report
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportDetailed}>
                    <FileText className="mr-2 h-4 w-4" />
                    Detailed Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            
              <RoundButton onClick={() => setIsBudgetFormOpen(true)} className="bg-gradient-purple text-white hover:opacity-90">
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
