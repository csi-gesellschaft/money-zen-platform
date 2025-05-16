
import React from 'react';
import { AlertCircle, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { RoundButton } from '../ui/RoundButton';

type InsightCardProps = {
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success';
  actionText?: string;
  onAction?: () => void;
}

export const InsightCard = ({ 
  title, 
  description, 
  type, 
  actionText = "View Details", 
  onAction = () => {} 
}: InsightCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'info':
        return <TrendingUp className="h-5 w-5 text-blue" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-orange" />;
      case 'success':
        return <TrendingDown className="h-5 w-5 text-revenue" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue" />;
    }
  };
  
  const getBgColor = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-light';
      case 'warning':
        return 'bg-orange-light';
      case 'success':
        return 'bg-revenue-light';
      default:
        return 'bg-blue-light';
    }
  };

  return (
    <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className={`p-2 rounded-lg ${getBgColor()} mr-4`}>
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          
          <RoundButton 
            variant="ghost" 
            size="sm" 
            onClick={onAction}
            className="text-sm p-0 hover:bg-transparent hover:underline"
          >
            {actionText}
            <ArrowRight className="ml-1 h-3 w-3" />
          </RoundButton>
        </div>
      </div>
    </div>
  );
};
