
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample budget data (similar to what we have in BudgetOverview but with more details)
const budgetData = [
  {
    id: "1",
    category: "Housing",
    spent: 1200,
    total: 1500,
    percentSpent: 80,
    color: "bg-purple",
  },
  {
    id: "2",
    category: "Groceries",
    spent: 450,
    total: 500,
    percentSpent: 90,
    color: "bg-orange",
  },
  {
    id: "3",
    category: "Transportation",
    spent: 250,
    total: 350,
    percentSpent: 71,
    color: "bg-blue",
  },
  {
    id: "4",
    category: "Entertainment",
    spent: 180,
    total: 200,
    percentSpent: 90,
    color: "bg-green",
  },
  {
    id: "5",
    category: "Dining",
    spent: 320,
    total: 400,
    percentSpent: 80,
    color: "bg-orange",
  },
  {
    id: "6",
    category: "Shopping",
    spent: 150,
    total: 250,
    percentSpent: 60,
    color: "bg-blue",
  },
];

export const BudgetsList = () => {
  const isMobile = useIsMobile();
  const [budgets] = useState(budgetData);
  
  // Calculate overall budget totals
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.total, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overallPercentSpent = Math.round((totalSpent / totalBudget) * 100);
  
  return (
    <>
      <div className="border rounded-xl p-5 bg-background mb-6">
        <h3 className="text-xl font-semibold mb-4">Overall Budget</h3>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-lg font-semibold">${totalBudget.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Spent</p>
            <p className="text-lg font-semibold">${totalSpent.toFixed(2)} ({overallPercentSpent}%)</p>
          </div>
        </div>
        <Progress value={overallPercentSpent} className="h-2 mb-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {totalBudget - totalSpent > 0 
            ? `You have $${(totalBudget - totalSpent).toFixed(2)} left to spend this month.` 
            : `You've exceeded your monthly budget by $${Math.abs(totalBudget - totalSpent).toFixed(2)}.`
          }
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((budget) => (
          <div key={budget.id} className="border rounded-lg p-5 bg-background">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className={`h-3 w-3 rounded-full ${budget.color} mr-2`}></span>
                <h3 className="font-medium">{budget.category}</h3>
              </div>
              <div className="text-sm font-medium">
                {budget.percentSpent}%
              </div>
            </div>
            
            <Progress 
              value={budget.percentSpent} 
              className={`h-2 mb-4 ${
                budget.percentSpent >= 90 ? 'bg-red-light' : ''
              }`} 
            />
            
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Spent</p>
                <p className="font-medium">${budget.spent.toFixed(2)}</p>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="font-medium">${budget.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
