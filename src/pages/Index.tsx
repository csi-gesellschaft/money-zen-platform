
import { RoundButton } from "@/components/ui/RoundButton";
import { Navbar } from "@/components/layout/Navbar";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { BudgetOverview } from "@/components/dashboard/BudgetOverview";
import { GoalTracker } from "@/components/dashboard/GoalTracker";
import { InsightCard } from "@/components/insights/InsightCard";
import { BadgeInfo, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { useEffect } from "react";

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Welcome toast
    toast("Welcome to FinTrack", {
      description: "Your personal finance management dashboard",
      duration: 5000,
    });
  }, []);

  const showFeatureNotAvailable = () => {
    toast("Feature Not Available", {
      description: "This feature is not available in the demo version.",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Jordan!</p>
            </div>
            
            <div className="flex gap-3 mt-4 sm:mt-0">
              <RoundButton variant="outline" onClick={showFeatureNotAvailable}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </RoundButton>
              <RoundButton onClick={showFeatureNotAvailable}>
                + Add Transaction
              </RoundButton>
            </div>
          </div>
          
          <FinancialSummary />
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ExpenseChart />
            </div>
            
            <div>
              <BudgetOverview />
            </div>
          </div>
          
          <div className="mt-6">
            <GoalTracker />
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BadgeInfo className="h-5 w-5 mr-2 text-purple" />
                <h2 className="text-xl font-semibold">Smart Insights</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InsightCard 
                title="Subscription Alert"
                description="You're spending 15% more on subscriptions compared to last month."
                type="warning"
                actionText="Review Subscriptions"
                onAction={showFeatureNotAvailable}
              />
              
              <InsightCard 
                title="Savings Opportunity"
                description="Based on your spending, you could increase your savings by $350 this month."
                type="info"
                actionText="See How"
                onAction={showFeatureNotAvailable}
              />
              
              <InsightCard 
                title="Bill Payment Reminder"
                description="Your electricity bill is due in 3 days. Set up automatic payment?"
                type="success"
                actionText="Set Up Payment"
                onAction={showFeatureNotAvailable}
              />
            </div>
          </div>
          
          <footer className="mt-12 text-center text-sm text-muted-foreground pb-4">
            <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
            <p className="mt-1">
              Pro version available with advanced features. 
              <button 
                onClick={showFeatureNotAvailable}
                className="ml-1 text-purple hover:underline"
              >
                Upgrade Now
              </button>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
