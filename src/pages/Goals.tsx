
import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { GoalsList } from "@/components/goals/GoalsList";
import { GoalForm } from "@/components/goals/GoalForm";
import { RoundButton } from "@/components/ui/RoundButton";
import { Target, Plus, Filter, RefreshCcw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Goals = () => {
  const isMobile = useIsMobile();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'active' | 'completed'>('all');
  
  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Goals data refreshed");
    }, 1500);
  };
  
  const handleFilterChange = (type: 'all' | 'active' | 'completed') => {
    setFilterType(type);
    toast.info(`Showing ${type} goals`);
    setIsFilterOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div className="flex items-center">
              <Target className="h-7 w-7 mr-3 text-purple" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Financial Goals</h1>
                <p className="text-muted-foreground">Track and manage your savings goals</p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4 sm:mt-0">
              <RoundButton variant="outline" onClick={handleRefreshData} disabled={isRefreshing}>
                <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </RoundButton>
              
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <RoundButton variant="outline" onClick={() => setIsFilterOpen(true)}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </RoundButton>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filter Goals</DialogTitle>
                    <DialogDescription>
                      Select which goals you want to display.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <RoundButton 
                      onClick={() => handleFilterChange('all')} 
                      variant={filterType === 'all' ? 'primary' : 'outline'}
                      className="w-full justify-center"
                    >
                      All Goals
                    </RoundButton>
                    <RoundButton 
                      onClick={() => handleFilterChange('active')} 
                      variant={filterType === 'active' ? 'primary' : 'outline'}
                      className="w-full justify-center"
                    >
                      Active Goals
                    </RoundButton>
                    <RoundButton 
                      onClick={() => handleFilterChange('completed')} 
                      variant={filterType === 'completed' ? 'primary' : 'outline'}
                      className="w-full justify-center"
                    >
                      Completed Goals
                    </RoundButton>
                  </div>
                </DialogContent>
              </Dialog>
              
              <RoundButton onClick={() => setIsAddGoalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Goal
              </RoundButton>
            </div>
          </div>
          
          <GoalsList filter={filterType} />
          
          <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Create New Financial Goal</DialogTitle>
                <DialogDescription>
                  Set up a new financial goal to track your savings progress.
                </DialogDescription>
              </DialogHeader>
              <GoalForm onSuccess={() => setIsAddGoalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Goals;
