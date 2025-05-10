
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { AccountsList } from "@/components/accounts/AccountsList";
import { AccountForm } from "@/components/accounts/AccountForm";
import { RoundButton } from "@/components/ui/RoundButton";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Accounts = () => {
  const [isAccountFormOpen, setIsAccountFormOpen] = useState(false);

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
            
            <div className="mt-4 sm:mt-0">
              <RoundButton onClick={() => setIsAccountFormOpen(true)}>
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
