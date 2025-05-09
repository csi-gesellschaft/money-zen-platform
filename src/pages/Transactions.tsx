
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TransactionsList } from "@/components/transactions/TransactionsList";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { RoundButton } from "@/components/ui/RoundButton";
import { Plus, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Transactions = () => {
  const isMobile = useIsMobile();
  const [showTransactionForm, setShowTransactionForm] = useState(false);

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
              <RoundButton variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </RoundButton>
              <RoundButton onClick={() => setShowTransactionForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </RoundButton>
            </div>
          </div>
          
          {showTransactionForm && (
            <div className="mb-6">
              <TransactionForm onCancel={() => setShowTransactionForm(false)} onSuccess={() => {
                setShowTransactionForm(false);
                toast.success("Transaction added successfully");
              }} />
            </div>
          )}
          
          <TransactionsList />
        </div>
      </main>
    </div>
  );
};

export default Transactions;
