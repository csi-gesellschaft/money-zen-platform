
import React, { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Calendar, ChevronDown, Filter, Download, RefreshCcw } from 'lucide-react';
import { RoundButton } from '../ui/RoundButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Sample data
const monthlyData = [
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

const weeklyData = [
  { name: 'Mon', amount: 500 },
  { name: 'Tue', amount: 650 },
  { name: 'Wed', amount: 400 },
  { name: 'Thu', amount: 720 },
  { name: 'Fri', amount: 980 },
  { name: 'Sat', amount: 1200 },
  { name: 'Sun', amount: 850 },
];

const categoryData = [
  { name: 'Housing', value: 1200, color: '#9b87f5' },
  { name: 'Food', value: 850, color: '#F97316' },
  { name: 'Transportation', value: 450, color: '#0EA5E9' },
  { name: 'Entertainment', value: 680, color: '#22c55e' },
  { name: 'Shopping', value: 540, color: '#eab308' },
  { name: 'Others', value: 280, color: '#ef4444' },
];

const timeRanges = ['This Week', 'This Month', 'This Quarter', 'This Year', 'Custom Range'];

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
  const [timeRange, setTimeRange] = useState('This Year');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [chartData, setChartData] = useState(monthlyData);
  const isMobile = useIsMobile();
  
  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Randomize data for demo purposes
      const updatedData = chartData.map(item => ({
        ...item,
        amount: Math.floor(Math.random() * 10000)
      }));
      
      setChartData(updatedData);
      setIsRefreshing(false);
      toast.success("Chart data refreshed");
    }, 1000);
  }, [chartData]);

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    
    // Update chart data based on selected time range
    if (range === 'This Week') {
      setChartData(weeklyData);
    } else {
      setChartData(monthlyData);
    }
    
    toast.info(`Showing data for ${range.toLowerCase()}`);
  };

  const handleExportData = () => {
    toast.success("Exporting data...");
    
    // In a real app, this would trigger a CSV download
    setTimeout(() => {
      toast.info("Data exported successfully");
    }, 1000);
  };
  
  return (
    <div className="border rounded-xl p-5 bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Expense Analysis</h2>
          <p className="text-sm text-muted-foreground">Track your spending patterns</p>
        </div>
        
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <Popover>
            <PopoverTrigger asChild>
              <RoundButton variant="outline" size="sm" className="text-xs">
                <Calendar className="mr-1 h-3 w-3" />
                {timeRange}
                <ChevronDown className="ml-1 h-3 w-3" />
              </RoundButton>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex flex-col space-y-1">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    className={`px-3 py-1.5 text-sm text-left hover:bg-accent rounded-md ${
                      timeRange === range ? 'bg-accent/50 font-medium' : ''
                    }`}
                    onClick={() => handleTimeRangeChange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <RoundButton variant="ghost" size="sm" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </RoundButton>
          
          <RoundButton variant="ghost" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4" />
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
            <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
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
            <div className="mt-5">
              <RoundButton size="sm" variant="outline" className="w-full" onClick={() => toast.info("Manage spending categories")}>
                Manage Categories
              </RoundButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
