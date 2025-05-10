
import { Bell, CreditCard, Landmark, Layers, LineChart, Menu, Search, Settings, User, DollarSign, Target, X } from "lucide-react";
import { RoundButton } from "../ui/RoundButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Focus search input when search is activated
  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const navItems = [
    { name: "Dashboard", icon: <Layers className="h-4 w-4" />, path: "/" },
    { name: "Transactions", icon: <CreditCard className="h-4 w-4" />, path: "/transactions" },
    { name: "Budgets", icon: <LineChart className="h-4 w-4" />, path: "/budgets" },
    { name: "Goals", icon: <Target className="h-4 w-4" />, path: "/goals" },
    { name: "Accounts", icon: <Landmark className="h-4 w-4" />, path: "/accounts" },
    { name: "Plans", icon: <DollarSign className="h-4 w-4" />, path: "/plans" },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    toast.info(`Searching for "${searchQuery}"...`);
    // In a real app, this would search through transactions, goals, etc.
    // For now, we'll just show a toast
    
    // Reset search after searching
    setSearchQuery("");
    setIsSearchActive(false);
  };

  const notifications = [
    { id: 1, title: "Budget Alert", message: "You're close to your restaurant budget limit", time: "10 minutes ago", unread: true },
    { id: 2, title: "Payment Reminder", message: "Electricity bill due in 3 days", time: "1 hour ago", unread: true },
    { id: 3, title: "Goal Update", message: "You've reached 50% of your vacation savings goal", time: "2 days ago", unread: false },
    { id: 4, title: "New Feature", message: "Check out the new budgeting tools", time: "1 week ago", unread: false }
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-semibold text-purple-dark flex items-center">
              <span className="bg-purple text-white p-1 rounded-md mr-2">Fin</span>
              <span>Track</span>
            </Link>
          </div>
        </div>
        
        {!isMobile && (
          <nav className="ml-10 flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground ${
                  location.pathname === item.path 
                    ? "text-foreground rounded-full bg-accent"
                    : "text-muted-foreground"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </nav>
        )}
        
        <div className="ml-auto flex items-center gap-2">
          <div className={`lg:block relative ${isSearchActive ? 'w-64' : 'w-auto'}`}>
            <form onSubmit={handleSearch}>
              {isSearchActive ? (
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search transactions, goals..."
                    className="rounded-full bg-background pl-8 pr-8 py-2 text-sm ring-1 ring-border focus:ring-primary focus:outline-none w-full transition-all"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <RoundButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-6 w-6 p-0"
                    onClick={() => setIsSearchActive(false)}
                  >
                    <X className="h-3 w-3" />
                  </RoundButton>
                </div>
              ) : (
                <RoundButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchActive(true)}
                  className="hidden lg:flex"
                >
                  <Search className="h-4 w-4" />
                </RoundButton>
              )}
            </form>
          </div>
          
          {!isMobile ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <RoundButton variant="ghost" size="sm" className="relative" aria-label="Notifications">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red animate-pulse" />
                  </RoundButton>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b last:border-b-0 hover:bg-accent/50 cursor-pointer ${notification.unread ? 'bg-accent/20' : ''}`}
                        onClick={() => {
                          toast.success(`Viewed notification: ${notification.title}`);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          {notification.unread && <div className="h-2 w-2 rounded-full bg-purple"></div>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t flex justify-center">
                    <RoundButton variant="ghost" size="sm" className="w-full text-xs" onClick={() => toast.info("All notifications marked as read")}>
                      Mark all as read
                    </RoundButton>
                  </div>
                </PopoverContent>
              </Popover>
              <Link to="/settings">
                <RoundButton variant="ghost" size="sm" aria-label="Settings">
                  <Settings className="h-4 w-4" />
                </RoundButton>
              </Link>
              <Link to="/profile">
                <RoundButton variant="ghost" size="sm" aria-label="User">
                  <User className="h-4 w-4" />
                </RoundButton>
              </Link>
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
                  <div className="px-4 py-3 border-b">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="rounded-full bg-background pl-8 pr-3 py-2 text-sm ring-1 ring-border focus:ring-primary focus:outline-none w-full"
                      />
                    </form>
                  </div>
                  <nav className="px-4 py-2 flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-3 py-3 text-sm font-medium transition-colors hover:text-foreground ${
                          location.pathname === item.path
                            ? "text-foreground bg-accent rounded-md"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </Link>
                    ))}
                    <div className="border-t my-2"></div>
                    <div
                      className="flex items-center px-3 py-3 text-sm font-medium text-muted-foreground"
                      onClick={() => {
                        toast.info("Notifications viewed");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      <span>Notifications</span>
                      <div className="ml-auto h-2 w-2 rounded-full bg-red"></div>
                    </div>
                    <Link to="/settings" className="flex items-center px-3 py-3 text-sm font-medium text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Settings</span>
                    </Link>
                    <Link to="/profile" className="flex items-center px-3 py-3 text-sm font-medium text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      <span>Profile</span>
                    </Link>
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
