
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RoundButton } from "@/components/ui/RoundButton";
import { toast } from "sonner";
import { CheckSquare, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const planFeatures = {
  free: [
    "Basic expense tracking",
    "Up to 2 accounts",
    "Monthly budget limits",
    "Basic reports",
  ],
  premium: [
    "Unlimited expense tracking",
    "Unlimited accounts",
    "Custom budget categories",
    "Advanced analytics",
    "Email reports",
    "CSV exports",
  ],
  enterprise: [
    "Everything in Premium",
    "Multi-user access",
    "API access",
    "Dedicated support",
    "Custom integrations",
    "White-labeling options",
  ],
};

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'enterprise'>('free');
  const [currentPlan, setCurrentPlan] = useState<'free' | 'premium' | 'enterprise'>('free');
  
  const handleSelectPlan = (plan: 'free' | 'premium' | 'enterprise') => {
    setSelectedPlan(plan);
  };
  
  const handleSubscribe = () => {
    if (selectedPlan === currentPlan) {
      toast.info("You are already subscribed to this plan");
      return;
    }
    
    // In a real application, this would redirect to a payment page or open a payment modal
    toast.success(`Successfully subscribed to the ${selectedPlan} plan!`);
    setCurrentPlan(selectedPlan);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Choose Your Plan</h1>
            <p className="text-muted-foreground mx-auto max-w-2xl mt-2">
              Select the plan that fits your needs. Upgrade anytime to access more features and take control of your finances.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className={`border-2 ${selectedPlan === 'free' ? 'border-purple' : 'border-border'}`}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Free</span>
                  {currentPlan === 'free' && (
                    <span className="bg-purple text-white text-xs px-2 py-1 rounded-full">Current Plan</span>
                  )}
                </CardTitle>
                <CardDescription>For personal use</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {planFeatures.free.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckSquare className="h-5 w-5 text-green mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <RoundButton
                  variant={currentPlan === 'free' ? 'outline' : 'primary'}
                  className="w-full"
                  onClick={() => handleSelectPlan('free')}
                  disabled={currentPlan === 'free'}
                >
                  {currentPlan === 'free' ? 'Current Plan' : 'Select Free'}
                </RoundButton>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card className={`border-2 ${selectedPlan === 'premium' ? 'border-purple' : 'border-border'}`}>
              <CardHeader>
                <div className="bg-purple text-white text-xs rounded-full px-3 py-1 w-fit">Popular</div>
                <CardTitle className="flex justify-between items-center mt-2">
                  <span>Premium</span>
                  {currentPlan === 'premium' && (
                    <span className="bg-purple text-white text-xs px-2 py-1 rounded-full">Current Plan</span>
                  )}
                </CardTitle>
                <CardDescription>For serious finance management</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {planFeatures.premium.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckSquare className="h-5 w-5 text-green mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <RoundButton
                  variant={currentPlan === 'premium' ? 'outline' : 'primary'}
                  className="w-full"
                  onClick={() => handleSelectPlan('premium')}
                  disabled={currentPlan === 'premium'}
                >
                  {currentPlan === 'premium' ? 'Current Plan' : 'Select Premium'}
                </RoundButton>
              </CardFooter>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className={`border-2 ${selectedPlan === 'enterprise' ? 'border-purple' : 'border-border'}`}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>Enterprise</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px]">Custom solutions for businesses with advanced requirements</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {currentPlan === 'enterprise' && (
                    <span className="bg-purple text-white text-xs px-2 py-1 rounded-full">Current Plan</span>
                  )}
                </CardTitle>
                <CardDescription>For businesses & teams</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$29.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {planFeatures.enterprise.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckSquare className="h-5 w-5 text-green mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <RoundButton
                  variant={currentPlan === 'enterprise' ? 'outline' : 'primary'}
                  className="w-full"
                  onClick={() => handleSelectPlan('enterprise')}
                  disabled={currentPlan === 'enterprise'}
                >
                  {currentPlan === 'enterprise' ? 'Current Plan' : 'Select Enterprise'}
                </RoundButton>
              </CardFooter>
            </Card>
          </div>
          
          {selectedPlan !== currentPlan && (
            <div className="mt-8 text-center">
              <RoundButton onClick={handleSubscribe} className="px-8">
                Subscribe to {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
              </RoundButton>
              <p className="text-sm text-muted-foreground mt-2">
                You can cancel or change plans at any time from your account settings.
              </p>
            </div>
          )}
          
          <div className="mt-16 border-t pt-8">
            <h2 className="text-xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I change plans later?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be applied immediately.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do refunds work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you're not satisfied, you can request a refund within 14 days of your initial purchase or subscription renewal.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is my data secure?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All your financial data is encrypted and securely stored. We never share your information with third parties.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer custom plans?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, for larger organizations with specific needs, please contact our sales team for a customized solution.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Plans;
