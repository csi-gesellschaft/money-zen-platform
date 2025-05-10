
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TransactionsList } from "@/components/transactions/TransactionsList";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { RoundButton } from "@/components/ui/RoundButton";
import { Plus, Filter, ArrowUpDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Transactions = () => {
  const isMobile = useIsMobile();
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const handleFilterChange = (type: 'all' | 'income' | 'expense') => {
    setFilterType(type);
    toast.info(`Showing ${type} transactions`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Transactions</h1>
              <p className="text-muted-foreground">Manage your financial transactions</p>
            </div>
            
            <div className="flex gap-3 mt-4 sm:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <RoundButton variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </RoundButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleFilterChange('all')}>
                    All Transactions
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange('income')}>
                    Income Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange('expense')}>
                    Expenses Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Sort by date applied")}>
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort by Date
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Sort by amount applied")}>
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort by Amount
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <RoundButton onClick={() => setIsTransactionFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </RoundButton>
            </div>
          </div>
          
          <TransactionsList filter={filterType} />
          
          <Dialog open={isTransactionFormOpen} onOpenChange={setIsTransactionFormOpen}>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Record a new financial transaction for your account.
                </DialogDescription>
              </DialogHeader>
              <TransactionForm 
                onCancel={() => setIsTransactionFormOpen(false)} 
                onSuccess={() => {
                  setIsTransactionFormOpen(false);
                  toast.success("Transaction added successfully");
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
