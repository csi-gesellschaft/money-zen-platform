
import React, { useState } from 'react';
import { Home, Gift, Briefcase, Car, GraduationCap, Plane, HeartPulse, Goal, MoreHorizontal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RoundButton } from '../ui/RoundButton';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

type GoalCategory = 'home' | 'car' | 'education' | 'travel' | 'emergency' | 'retirement' | 'medical' | 'other';

interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  targetAmount: number;
  savedAmount: number;
  dueDate: Date;
  createdAt: Date;
  isCompleted: boolean;
}

interface GoalsListProps {
  filter: 'all' | 'active' | 'completed';
}

// Sample data
const goalData: Goal[] = [
  {
    id: '1',
    title: 'Down Payment',
    category: 'home',
    savedAmount: 15000,
    targetAmount: 60000,
    dueDate: new Date('2025-12-31'),
    createdAt: new Date('2023-01-15'),
    isCompleted: false
  },
  {
    id: '2',
    title: 'Vacation',
    category: 'travel',
    savedAmount: 3200,
    targetAmount: 5000,
    dueDate: new Date('2025-07-01'),
    createdAt: new Date('2023-05-20'),
    isCompleted: false
  },
  {
    id: '3',
    title: 'Emergency Fund',
    category: 'emergency',
    savedAmount: 8500,
    targetAmount: 10000,
    dueDate: new Date('2025-03-31'),
    createdAt: new Date('2023-02-01'),
    isCompleted: false
  },
  {
    id: '4',
    title: 'New Car',
    category: 'car',
    savedAmount: 12000,
    targetAmount: 30000,
    dueDate: new Date('2026-09-30'),
    createdAt: new Date('2023-03-10'),
    isCompleted: false
  },
  {
    id: '5',
    title: 'Student Loan',
    category: 'education',
    savedAmount: 5000,
    targetAmount: 5000,
    dueDate: new Date('2024-12-31'),
    createdAt: new Date('2022-11-05'),
    isCompleted: true
  }
];

const getCategoryIcon = (category: GoalCategory) => {
  switch (category) {
    case 'home':
      return <Home className="h-4 w-4 text-purple" />;
    case 'car':
      return <Car className="h-4 w-4 text-green" />;
    case 'education':
      return <GraduationCap className="h-4 w-4 text-blue" />;
    case 'travel':
      return <Plane className="h-4 w-4 text-orange" />;
    case 'emergency':
      return <Briefcase className="h-4 w-4 text-blue" />;
    case 'medical':
      return <HeartPulse className="h-4 w-4 text-red" />;
    case 'retirement':
      return <Gift className="h-4 w-4 text-purple" />;
    default:
      return <Goal className="h-4 w-4 text-gray-500" />;
  }
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const GoalCard = ({ goal }: { goal: Goal }) => {
  const percentSaved = Math.round((goal.savedAmount / goal.targetAmount) * 100);
  const icon = getCategoryIcon(goal.category);
  
  const addContribution = () => {
    toast.success("Contribution dialog would open here");
  };
  
  const editGoal = () => {
    toast.info("Edit goal dialog would open here");
  };
  
  const deleteGoal = () => {
    toast.error("Delete confirmation would appear here");
  };
  
  const markAsCompleted = () => {
    toast.success(`"${goal.title}" marked as completed!`);
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-purple-light p-2 rounded-lg">
              {icon}
            </div>
            <div className="ml-3">
              <h3 className="font-medium flex items-center">
                {goal.title}
                {goal.isCompleted && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-green text-white rounded-full">
                    Completed
                  </span>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">
                Due by {formatDate(goal.dueDate)}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <RoundButton variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </RoundButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={addContribution}>
                Add Contribution
              </DropdownMenuItem>
              <DropdownMenuItem onClick={editGoal}>
                Edit Goal
              </DropdownMenuItem>
              {!goal.isCompleted && (
                <DropdownMenuItem onClick={markAsCompleted}>
                  Mark as Completed
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={deleteGoal} className="text-red">
                Delete Goal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">{percentSaved}%</span>
        </div>
        
        <Progress value={percentSaved} className="h-2 mb-3" />
        
        <div className="flex justify-between items-end mt-3">
          <div>
            <p className="text-xs text-muted-foreground">Saved</p>
            <p className="text-sm font-medium">${goal.savedAmount.toLocaleString()}</p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Target</p>
            <p className="text-sm font-medium">${goal.targetAmount.toLocaleString()}</p>
          </div>
        </div>
        
        {!goal.isCompleted && (
          <div className="mt-4 flex justify-between">
            <RoundButton 
              variant="outline" 
              size="sm" 
              className="text-xs" 
              onClick={addContribution}
            >
              Add Contribution
            </RoundButton>
            
            <RoundButton 
              variant="ghost" 
              size="sm" 
              className="text-xs" 
              onClick={editGoal}
            >
              Edit Goal
            </RoundButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const GoalsList = ({ filter }: GoalsListProps) => {
  // Filter goals based on the selected filter
  const filteredGoals = goalData.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'active') return !goal.isCompleted;
    if (filter === 'completed') return goal.isCompleted;
    return true;
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredGoals.length > 0 ? (
        filteredGoals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))
      ) : (
        <div className="col-span-3 text-center py-10">
          <h3 className="text-lg font-medium text-muted-foreground">No goals found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {filter === 'completed' 
              ? "You don't have any completed goals yet."
              : filter === 'active'
              ? "You don't have any active goals. Add a new goal to get started."
              : "You don't have any goals yet. Create your first financial goal!"}
          </p>
        </div>
      )}
    </div>
  );
};
