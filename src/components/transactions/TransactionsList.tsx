
import React, { useState } from 'react';
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  CreditCard, 
  ShoppingCart, 
  Coffee, 
  Home, 
  Car 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample transaction data
const transactionData = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: -120.50,
    date: "2025-05-08",
    category: "Groceries",
    account: "Main Checking",
    icon: ShoppingCart,
  },
  {
    id: "2",
    title: "Salary Deposit",
    amount: 3500.00,
    date: "2025-05-01",
    category: "Income",
    account: "Main Checking",
    icon: CreditCard,
  },
  {
    id: "3",
    title: "Coffee Shop",
    amount: -5.75,
    date: "2025-05-07",
    category: "Dining",
    account: "Credit Card",
    icon: Coffee,
  },
  {
    id: "4",
    title: "Rent Payment",
    amount: -1200.00,
    date: "2025-05-05",
    category: "Housing",
    account: "Main Checking",
    icon: Home,
  },
  {
    id: "5",
    title: "Car Insurance",
    amount: -89.99,
    date: "2025-05-03",
    category: "Insurance",
    account: "Savings",
    icon: Car,
  },
];

interface TransactionsListProps {
  filter?: 'all' | 'income' | 'expense';
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ filter = 'all' }) => {
  const isMobile = useIsMobile();
  const [transactions] = useState(transactionData);
  
  // Filter transactions based on the filter prop
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'income') return transaction.amount > 0;
    if (filter === 'expense') return transaction.amount < 0;
    return true;
  });
  
  // Get unique dates to group transactions
  const uniqueDates = [...new Set(filteredTransactions.map(t => t.date))].sort().reverse();
  
  return (
    <div className="space-y-6">
      {uniqueDates.map(date => (
        <div key={date} className="border rounded-xl p-5 bg-background">
          <h3 className="text-md font-medium mb-4">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h3>
          
          <div className="space-y-3">
            {filteredTransactions
              .filter(t => t.date === date)
              .map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center">
                    <div className={`rounded-full p-2 mr-3 ${
                      transaction.amount > 0 ? 'bg-green-light' : 'bg-purple-light'
                    }`}>
                      {transaction.amount > 0 ? (
                        <ArrowDownIcon className="h-4 w-4 text-green" />
                      ) : (
                        <transaction.icon className="h-4 w-4 text-purple" />
                      )}
                    </div>
                    
                    <div>
                      <p className="font-medium">{transaction.title}</p>
                      <p className="text-sm text-muted-foreground">{transaction.account}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.amount > 0 ? 'text-green' : ''
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
