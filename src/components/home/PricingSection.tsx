import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Customer",
      price: "Free",
      description: "For shoppers looking for discounts",
      features: [
        "Browse available credit cards",
        "Submit purchase requests",
        "Track request status",
        "Secure payment process",
        "24/7 customer support",
        "No hidden fees"
      ],
      cta: "Start Shopping",
      popular: false
    },
    {
      name: "Card Holder",
      price: "Free",
      description: "For credit card holders",
      features: [
        "List unlimited cards",
        "Manage rental requests",
        "Set your own terms",
        "Earn from discounts",
        "Analytics dashboard",
        "Priority support"
      ],
      cta: "List Your Cards",
      popular: true
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover-scale inline-block">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our marketplace completely free. No subscription fees, ever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`hover-lift animate-fade-in relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg hover-scale">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2 hover-scale inline-block">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                </div>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 hover-scale">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full hover-scale" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => navigate("/auth")}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;