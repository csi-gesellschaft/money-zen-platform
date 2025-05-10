
import React from 'react';
import { BadgePlus, Home, Gift, Briefcase, Car } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RoundButton } from '../ui/RoundButton';

type GoalCardProps = {
  title: string;
  icon: React.ReactNode;
  saved: number;
  target: number;
  percentSaved: number;
  dueDate: string;
}

const GoalCard = ({ title, icon, saved, target, percentSaved, dueDate }: GoalCardProps) => {
  return (
    <div className="border rounded-lg p-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="bg-investment-light p-2 rounded-lg">
            {icon}
          </div>
          <h3 className="ml-3 font-medium">{title}</h3>
        </div>
      </div>
      
      <div className="mb-2 flex justify-between">
        <span className="text-sm text-muted-foreground">Progress</span>
        <span className="text-sm font-medium">{percentSaved}%</span>
      </div>
      
      <Progress value={percentSaved} className="h-2 mb-3" />
      
      <div className="flex justify-between items-end mt-3">
        <div>
          <p className="text-xs text-muted-foreground">Saved</p>
          <p className="text-sm font-medium">${saved.toLocaleString()}</p>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Target</p>
          <p className="text-sm font-medium">${target.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t">
        <p className="text-xs text-muted-foreground">Due by {dueDate}</p>
      </div>
    </div>
  );
};

export const GoalTracker = () => {
  return (
    <div className="border rounded-xl p-5 bg-background">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Financial Goals</h2>
          <p className="text-sm text-muted-foreground">Track your saving progress</p>
        </div>
        
        <RoundButton size="sm">
          <BadgePlus className="h-4 w-4 mr-2" />
          New Goal
        </RoundButton>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GoalCard 
          title="Down Payment"
          icon={<Home className="h-4 w-4 text-blue" />}
          saved={15000}
          target={60000}
          percentSaved={25}
          dueDate="Dec 2025"
        />
        
        <GoalCard 
          title="Vacation"
          icon={<Gift className="h-4 w-4 text-orange" />}
          saved={3200}
          target={5000}
          percentSaved={64}
          dueDate="Jul 2025"
        />
        
        <GoalCard 
          title="Emergency Fund"
          icon={<Briefcase className="h-4 w-4 text-investment" />}
          saved={8500}
          target={10000}
          percentSaved={85}
          dueDate="Mar 2025"
        />
        
        <GoalCard 
          title="New Car"
          icon={<Car className="h-4 w-4 text-revenue" />}
          saved={12000}
          target={30000}
          percentSaved={40}
          dueDate="Sep 2026"
        />
      </div>
    </div>
  );
};
