
import React from 'react';
import { cn } from "@/lib/utils";

interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tech' | 'accent' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const RoundButton = React.forwardRef<HTMLButtonElement, RoundButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, icon, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground',
      ghost: 'hover:bg-accent/10 hover:text-accent-foreground',
      tech: 'bg-zentrix-accent1 text-zentrix-background hover:bg-zentrix-accent1/90 shadow-md shadow-zentrix-accent1/20 transition-colors duration-200 btn-tech',
      accent: 'bg-zentrix-accent2 text-zentrix-background hover:bg-zentrix-accent2/90 shadow-md shadow-zentrix-accent2/20 transition-colors duration-200 btn-tech',
      success: 'bg-revenue text-zentrix-background hover:bg-revenue/90 shadow-md shadow-revenue/20 transition-colors duration-200 btn-tech',
      danger: 'bg-expense text-zentrix-background hover:bg-expense/90 shadow-md shadow-expense/20 transition-colors duration-200 btn-tech',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-11 px-5',
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

RoundButton.displayName = 'RoundButton';

export { RoundButton };
