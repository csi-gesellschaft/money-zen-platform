
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TransactionsList } from "@/components/transactions/TransactionsList";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { RoundButton } from "@/components/ui/RoundButton";
import { Plus, Filter, ArrowUpDown, FileText, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { exportToCSV, generateDetailedReport, generateSimpleReport } from "@/utils/reportExport";

// Sample transaction data for export purposes
const transactionData = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: -120.50,
    date: "2025-05-08",
    category: "Groceries",
    account: "Main Checking",
  },
  {
    id: "2",
    title: "Salary Deposit",
    amount: 3500.00,
    date: "2025-05-01",
    category: "Income",
    account: "Main Checking",
  },
  {
    id: "3",
    title: "Coffee Shop",
    amount: -5.75,
    date: "2025-05-07",
    category: "Dining",
    account: "Credit Card",
  },
  {
    id: "4",
    title: "Rent Payment",
    amount: -1200.00,
    date: "2025-05-05",
    category: "Housing",
    account: "Main Checking",
  },
  {
    id: "5",
    title: "Car Insurance",
    amount: -89.99,
    date: "2025-05-03",
    category: "Insurance",
    account: "Savings",
  },
];

const Transactions = () => {
  const isMobile = useIsMobile();
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const handleFilterChange = (type: 'all' | 'income' | 'expense') => {
    setFilterType(type);
    toast.info(`Showing ${type} transactions`);
  };

  const handleExportSimple = () => {
    generateSimpleReport(
      transactionData,
      { fileName: 'transactions', title: 'Transactions Report' },
      ['id', 'title', 'amount', 'date']
    );
    toast.success('Simple transactions report exported');
  };

  const handleExportDetailed = () => {
    generateDetailedReport(
      transactionData,
      { fileName: 'transactions', title: 'Detailed Transactions Report' }
    );
    toast.success('Detailed transactions report exported');
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

              <DropdownMenu open={isExportMenuOpen} onOpenChange={setIsExportMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <RoundButton variant="outline" className="bg-gradient-blue text-white hover:opacity-90">
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
              
              <RoundButton onClick={() => setIsTransactionFormOpen(true)} className="bg-gradient-blue text-white hover:opacity-90">
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
