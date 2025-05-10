
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, DollarSign, PiggyBank, Wallet } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type SummaryCardProps = {
  title: string;
  amount: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  bgColor: string;
  className?: string;
}

const SummaryCard = ({ title, amount, change, trend, icon, bgColor, className = '' }: SummaryCardProps) => {
  const trendIcon = trend === 'up' ? (
    <ArrowUpIcon className="h-3 w-3 trend-up" />
  ) : trend === 'down' ? (
    <ArrowDownIcon className="h-3 w-3 trend-down" />
  ) : null;

  const changeText = trend === 'up' ? (
    <span className="trend-up text-xs">+{change}</span>
  ) : trend === 'down' ? (
    <span className="trend-down text-xs">-{change}</span>
  ) : (
    <span className="text-muted-foreground text-xs">{change}</span>
  );

  return (
    <div className={`rounded-lg p-4 transition-all hover:shadow-md ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{amount}</h3>
          <div className="flex items-center mt-1 text-muted-foreground gap-1">
            {trendIcon}
            {changeText}
            <span className="text-xs">this month</span>
          </div>
        </div>
        <div className={`rounded-full p-3 ${bgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export const FinancialSummary = () => {
  const isMobile = useIsMobile();
  
  const wrapperClass = isMobile 
    ? 'grid grid-cols-1 gap-4' 
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

  return (
    <div className={wrapperClass}>
      <SummaryCard 
        title="Total Balance"
        amount="$24,563.00"
        change="15.3%"
        trend="up"
        icon={<DollarSign className="h-5 w-5 text-blue" />}
        bgColor="bg-blue-light"
      />
      
      <SummaryCard 
        title="Monthly Income"
        amount="$8,350.00"
        change="2.5%"
        trend="up"
        icon={<Wallet className="h-5 w-5 text-revenue" />}
        bgColor="bg-revenue-light"
      />
      
      <SummaryCard 
        title="Total Savings"
        amount="$5,775.00"
        change="8.2%"
        trend="up"
        icon={<PiggyBank className="h-5 w-5 text-investment" />}
        bgColor="bg-investment-light"
      />
    </div>
  );
};
