
import React, { useState } from 'react';
import { CreditCard, Landmark, PiggyBank, Briefcase } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample account data
const accountData = [
  {
    id: "1",
    name: "Main Checking",
    institution: "Chase Bank",
    balance: 4250.75,
    type: "checking",
    icon: CreditCard,
    color: "bg-purple-light",
    iconColor: "text-purple",
  },
  {
    id: "2",
    name: "Savings",
    institution: "Wells Fargo",
    balance: 12150.42,
    type: "savings",
    icon: PiggyBank,
    color: "bg-blue-light",
    iconColor: "text-blue",
  },
  {
    id: "3",
    name: "Credit Card",
    institution: "American Express",
    balance: -1540.30,
    limit: 5000,
    type: "credit",
    icon: CreditCard,
    color: "bg-orange-light",
    iconColor: "text-orange",
  },
  {
    id: "4",
    name: "Investment",
    institution: "Fidelity",
    balance: 8300.25,
    performance: 5.2,
    type: "investment",
    icon: Briefcase,
    color: "bg-green-light",
    iconColor: "text-green",
  },
];

export const AccountsList = () => {
  const isMobile = useIsMobile();
  const [accounts] = useState(accountData);
  
  // Calculate total balance
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  return (
    <>
      <div className="border rounded-xl p-5 bg-background mb-6">
        <h3 className="text-xl font-semibold mb-2">Net Worth</h3>
        <p className="text-2xl font-bold mb-4">${totalBalance.toFixed(2)}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Checking & Savings</p>
            <p className="font-medium">
              ${accounts
                .filter(a => a.type === "checking" || a.type === "savings")
                .reduce((sum, account) => sum + account.balance, 0)
                .toFixed(2)
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Investments</p>
            <p className="font-medium">
              ${accounts
                .filter(a => a.type === "investment")
                .reduce((sum, account) => sum + account.balance, 0)
                .toFixed(2)
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Credit Card Debt</p>
            <p className="font-medium text-red">
              ${Math.abs(accounts
                .filter(a => a.type === "credit")
                .reduce((sum, account) => sum + account.balance, 0))
                .toFixed(2)
              }
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="border rounded-lg p-4 bg-background">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`rounded-full p-2 ${account.color}`}>
                  <account.icon className={`h-5 w-5 ${account.iconColor}`} />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-xs text-muted-foreground">{account.institution}</p>
                </div>
              </div>
            </div>
            
            {account.type === "credit" && account.limit && (
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Credit Used</span>
                  <span>{Math.round((Math.abs(account.balance) / account.limit) * 100)}%</span>
                </div>
                <Progress 
                  value={Math.round((Math.abs(account.balance) / account.limit) * 100)} 
                  className="h-2" 
                />
              </div>
            )}
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">
                  {account.type === "investment" ? "Current Value" : "Current Balance"}
                </p>
                <p className={`text-lg font-semibold ${
                  account.balance < 0 ? 'text-red' : ''
                }`}>
                  ${Math.abs(account.balance).toFixed(2)}
                  {account.balance < 0 ? ' (Debt)' : ''}
                </p>
              </div>
              
              {account.type === "investment" && account.performance && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p className={`font-medium ${account.performance > 0 ? 'text-green' : 'text-red'}`}>
                    {account.performance > 0 ? '+' : ''}{account.performance}%
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
