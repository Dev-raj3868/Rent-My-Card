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
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
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
