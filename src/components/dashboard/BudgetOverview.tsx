
import React from 'react';
import { BadgePlus, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RoundButton } from '../ui/RoundButton';
import { useIsMobile } from '@/hooks/use-mobile';

const budgetItems = [
  {
    category: 'Housing',
    spent: 1200,
    total: 1500,
    percentSpent: 80,
    color: 'bg-blue',
  },
  {
    category: 'Groceries',
    spent: 450,
    total: 500,
    percentSpent: 90,
    color: 'bg-orange',
  },
  {
    category: 'Transportation',
    spent: 250,
    total: 350,
    percentSpent: 71,
    color: 'bg-teal',
  },
  {
    category: 'Entertainment',
    spent: 180,
    total: 200,
    percentSpent: 90,
    color: 'bg-brick',
  },
];

export const BudgetOverview = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="border rounded-xl p-5 bg-background">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Budget Overview</h2>
          <p className="text-sm text-muted-foreground">Track your monthly spending limits</p>
        </div>
        
        <RoundButton size="sm">
          <BadgePlus className="h-4 w-4 mr-2" />
          New Budget
        </RoundButton>
      </div>
      
      <div className="space-y-5">
        {budgetItems.map((item) => (
          <div key={item.category}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <span className={`h-3 w-3 rounded-full ${item.color} mr-2`}></span>
                <span className="text-sm font-medium">{item.category}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">${item.spent}</span>
                <span className="text-sm text-muted-foreground mx-1">/</span>
                <span className="text-sm text-muted-foreground">${item.total}</span>
                
                {item.percentSpent >= 90 && (
                  <div className="ml-2 rounded-full bg-expense-light p-1" title="Over budget">
                    <Info className="h-3 w-3 text-expense" />
                  </div>
                )}
              </div>
            </div>
            <Progress value={item.percentSpent} className={`h-2 ${
              item.percentSpent >= 90 ? 'bg-expense-light' : ''
            }`} />
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Total Budget</p>
            <p className="text-lg font-semibold">$2,550 / $2,850</p>
          </div>
          <div>
            <p className="text-sm text-right text-muted-foreground">Remaining</p>
            <p className="text-lg font-semibold text-revenue">$300</p>
          </div>
        </div>
        <Progress value={89} className="h-2 mt-2" />
      </div>
    </div>
  );
};
