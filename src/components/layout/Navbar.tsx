
import { Bell, CreditCard, Landmark, Layers, LineChart, Menu, Search, Settings, User } from "lucide-react";
import { RoundButton } from "../ui/RoundButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <Layers className="h-4 w-4" />, active: true },
    { name: "Transactions", icon: <CreditCard className="h-4 w-4" /> },
    { name: "Budgets", icon: <LineChart className="h-4 w-4" /> },
    { name: "Accounts", icon: <Landmark className="h-4 w-4" /> },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-purple-dark flex items-center">
              <span className="bg-purple text-white p-1 rounded-md mr-2">Fin</span>
              <span>Track</span>
            </h1>
          </div>
        </div>
        
        {!isMobile && (
          <nav className="ml-10 flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground ${
                  item.active 
                    ? "text-foreground rounded-full bg-accent"
                    : "text-muted-foreground"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </a>
            ))}
          </nav>
        )}
        
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:block relative mr-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-full bg-background pl-8 pr-3 py-2 text-sm ring-1 ring-border focus:ring-primary focus:outline-none w-[180px] transition-all focus:w-[200px]"
            />
          </div>
          
          {!isMobile ? (
            <>
              <RoundButton variant="ghost" size="sm" className="relative" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red animate-pulse" />
              </RoundButton>
              <RoundButton variant="ghost" size="sm" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </RoundButton>
              <RoundButton variant="ghost" size="sm" aria-label="User">
                <User className="h-4 w-4" />
              </RoundButton>
              <div className="ml-4 h-8 w-8 rounded-full bg-purple flex items-center justify-center text-white text-sm font-medium">JD</div>
            </>
          ) : (
            <>
              <RoundButton 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </RoundButton>
              
              {isMobileMenuOpen && (
                <div className="absolute top-16 right-0 w-full bg-background border-b z-50 animate-in">
                  <nav className="px-4 py-2 flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href="#"
                        className={`flex items-center px-3 py-3 text-sm font-medium transition-colors hover:text-foreground ${
                          item.active 
                            ? "text-foreground bg-accent rounded-md"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </a>
                    ))}
                    <div className="border-t my-2"></div>
                    <a href="#" className="flex items-center px-3 py-3 text-sm font-medium text-muted-foreground">
                      <Bell className="h-4 w-4 mr-2" />
                      <span>Notifications</span>
                    </a>
                    <a href="#" className="flex items-center px-3 py-3 text-sm font-medium text-muted-foreground">
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Settings</span>
                    </a>
                    <a href="#" className="flex items-center px-3 py-3 text-sm font-medium text-muted-foreground">
                      <User className="h-4 w-4 mr-2" />
                      <span>Profile</span>
                    </a>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
