
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, ChevronDown, Filter } from 'lucide-react';
import { RoundButton } from '../ui/RoundButton';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data
const data = [
  { name: 'Jan', amount: 2400 },
  { name: 'Feb', amount: 1398 },
  { name: 'Mar', amount: 9800 },
  { name: 'Apr', amount: 3908 },
  { name: 'May', amount: 4800 },
  { name: 'Jun', amount: 3800 },
  { name: 'Jul', amount: 4300 },
  { name: 'Aug', amount: 2300 },
  { name: 'Sep', amount: 6300 },
  { name: 'Oct', amount: 4500 },
  { name: 'Nov', amount: 3800 },
  { name: 'Dec', amount: 7800 },
];

const categoryData = [
  { name: 'Housing', value: 1200, color: '#9b87f5' },
  { name: 'Food', value: 850, color: '#F97316' },
  { name: 'Transportation', value: 450, color: '#0EA5E9' },
  { name: 'Entertainment', value: 680, color: '#22c55e' },
  { name: 'Shopping', value: 540, color: '#eab308' },
  { name: 'Others', value: 280, color: '#ef4444' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-4 border rounded-lg shadow-md">
        <p className="text-sm">{`${payload[0].name} : $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const ExpenseChart = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'categories'>('overview');
  const isMobile = useIsMobile();
  
  return (
    <div className="border rounded-xl p-5 bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Expense Analysis</h2>
          <p className="text-sm text-muted-foreground">Track your spending patterns</p>
        </div>
        
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <RoundButton variant="outline" size="sm" className="text-xs">
            <Calendar className="mr-1 h-3 w-3" />
            This Year
            <ChevronDown className="ml-1 h-3 w-3" />
          </RoundButton>
          
          <RoundButton variant="ghost" size="sm">
            <Filter className="h-4 w-4" />
          </RoundButton>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6 border-b">
        <button
          className={`pb-2 text-sm font-medium relative ${
            activeTab === 'overview'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground transition-colors'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
          {activeTab === 'overview' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
        <button
          className={`pb-2 text-sm font-medium relative ${
            activeTab === 'categories'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground transition-colors'
          }`}
          onClick={() => setActiveTab('categories')}
        >
          By Category
          {activeTab === 'categories' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>
      
      {activeTab === 'overview' ? (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#888' }}
                dy={10}
              />
              <YAxis 
                hide={isMobile}
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#888' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Bar 
                dataKey="amount" 
                radius={[4, 4, 0, 0]} 
                fill="#9b87f5"
                barSize={isMobile ? 15 : 30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                layout="vertical"
                data={categoryData} 
                margin={{ top: 5, right: 20, bottom: 5, left: isMobile ? 60 : 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#888' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis 
                  type="category"
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#888' }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
            <div className="space-y-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span 
                      className="h-3 w-3 rounded-full mr-2" 
                      style={{ backgroundColor: category.color }}
                    ></span>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium">${category.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
