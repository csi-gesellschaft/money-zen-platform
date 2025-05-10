
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { AccountsList } from "@/components/accounts/AccountsList";
import { AccountForm } from "@/components/accounts/AccountForm";
import { RoundButton } from "@/components/ui/RoundButton";
import { Plus, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { exportToCSV, generateDetailedReport, generateSimpleReport } from "@/utils/reportExport";

// Sample account data for export
const accountData = [
  {
    id: "1",
    name: "Main Checking",
    type: "Checking",
    balance: 3500.25,
    institution: "Bank of America"
  },
  {
    id: "2",
    name: "Savings",
    type: "Savings",
    balance: 15000.00,
    institution: "Wells Fargo"
  },
  {
    id: "3",
    name: "Credit Card",
    type: "Credit",
    balance: -2500.50,
    institution: "Chase"
  }
];

const Accounts = () => {
  const [isAccountFormOpen, setIsAccountFormOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const handleExportSimple = () => {
    generateSimpleReport(
      accountData,
      { fileName: 'accounts', title: 'Accounts Report' },
      ['id', 'name', 'type', 'balance']
    );
    toast.success('Simple account report exported');
  };

  const handleExportDetailed = () => {
    generateDetailedReport(
      accountData,
      { fileName: 'accounts', title: 'Detailed Accounts Report' }
    );
    toast.success('Detailed account report exported');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Accounts</h1>
              <p className="text-muted-foreground">Manage your financial accounts</p>
            </div>
            
            <div className="flex gap-3 mt-4 sm:mt-0">
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
              
              <RoundButton onClick={() => setIsAccountFormOpen(true)} className="bg-gradient-purple text-white hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </RoundButton>
            </div>
          </div>
          
          <AccountsList />
          
          <Dialog open={isAccountFormOpen} onOpenChange={setIsAccountFormOpen}>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
                <DialogDescription>
                  Connect a new financial account to track your balance and transactions.
                </DialogDescription>
              </DialogHeader>
              <AccountForm 
                onCancel={() => setIsAccountFormOpen(false)} 
                onSuccess={() => {
                  setIsAccountFormOpen(false);
                  toast.success("Account added successfully");
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Accounts;
