import { RoundButton } from "@/components/ui/RoundButton";
import { Navbar } from "@/components/layout/Navbar";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { BudgetOverview } from "@/components/dashboard/BudgetOverview";
import { GoalTracker } from "@/components/dashboard/GoalTracker";
import { InsightCard } from "@/components/insights/InsightCard";
import { BadgeInfo, Download, Filter, Plus, RefreshCcw, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GoalForm } from "@/components/goals/GoalForm";

const Index = () => {
  const isMobile = useIsMobile();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const navigate = useNavigate();
  
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
  
  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard data refreshed");
    }, 1500);
  };

  const handleGoToPage = (path: string) => {
    navigate(path);
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
              <RoundButton variant="outline" onClick={handleRefreshData} disabled={isRefreshing}>
                <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </RoundButton>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <RoundButton variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </RoundButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toast.info("Showing data for the current month")}>
                    This Month
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Showing data for the last 3 months")}>
                    Last 3 Months
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Showing data for the current year")}>
                    This Year
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={showFeatureNotAvailable}>
                    Custom Range...
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <RoundButton>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                  </RoundButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleGoToPage('/transactions')}>
                    Add Transaction
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGoToPage('/budgets')}>
                    Add Budget
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsAddGoalOpen(true)}>
                    Add Goal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGoToPage('/accounts')}>
                    Add Account
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activities</CardDescription>
                </div>
                <Link to="/transactions">
                  <RoundButton variant="ghost" size="sm">View All</RoundButton>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Grocery Store', amount: -82.35, date: 'Today', category: 'Food' },
                    { name: 'Salary Deposit', amount: 2750.00, date: 'Yesterday', category: 'Income' },
                    { name: 'Electric Bill', amount: -94.20, date: '3 days ago', category: 'Utilities' }
                  ].map((transaction, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <div className="font-medium">{transaction.name}</div>
                        <div className="text-xs text-muted-foreground">{transaction.date} • {transaction.category}</div>
                      </div>
                      <div className={`font-medium ${transaction.amount > 0 ? 'text-green' : ''}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Actions</CardTitle>
                  <CardDescription>Quick access to common tasks</CardDescription>
                </div>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <RoundButton variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => handleGoToPage('/transactions')}>
                    <Plus className="h-5 w-5 mb-2" />
                    <span>New Transaction</span>
                  </RoundButton>
                  
                  <RoundButton variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => handleGoToPage('/budgets')}>
                    <Plus className="h-5 w-5 mb-2" />
                    <span>New Budget</span>
                  </RoundButton>
                  
                  <RoundButton variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={showFeatureNotAvailable}>
                    <Download className="h-5 w-5 mb-2" />
                    <span>Export Report</span>
                  </RoundButton>
                  
                  <RoundButton variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => handleGoToPage('/plans')}>
                    <BadgeInfo className="h-5 w-5 mb-2" />
                    <span>Upgrade Plan</span>
                  </RoundButton>
                </div>
              </CardContent>
            </Card>
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
              <Link
                to="/plans"
                className="ml-1 text-purple hover:underline"
              >
                Upgrade Now
              </Link>
            </p>
          </footer>
        </div>
      </main>

      <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Create New Financial Goal</DialogTitle>
            <DialogDescription>
              Set up a new financial goal to track your savings progress.
            </DialogDescription>
          </DialogHeader>
          <GoalForm onSuccess={() => {
            setIsAddGoalOpen(false);
            toast.success("Goal created successfully!");
            // Navigate to goals page after a short delay so user can see the success message
            setTimeout(() => navigate('/goals'), 1000);
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
