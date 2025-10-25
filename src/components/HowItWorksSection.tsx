import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TrendingDown, Shield } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: CreditCard,
      title: "Card Holders List Cards",
      description: "Credit card holders upload their cards to our secure platform, offering them for rent"
    },
    {
      icon: TrendingDown,
      title: "Customers Browse & Request",
      description: "Customers find available cards and send purchase requests with product details"
    },
    {
      icon: Shield,
      title: "Discount Applied",
      description: "Card holders complete purchases and customers enjoy savings on their orders"
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple steps to start saving or earning
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="text-center hover-lift hover-glow animate-fade-in transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 hover-scale shadow-lg">
                  <step.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base md:text-lg">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
