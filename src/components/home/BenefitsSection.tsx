import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePercent, Users, Lock, Zap, TrendingUp, Award } from "lucide-react";

const benefits = [
  {
    icon: BadgePercent,
    title: "Exclusive Discounts",
    description: "Access premium credit card offers and save up to 50% on your purchases"
  },
  {
    icon: Users,
    title: "Verified Community",
    description: "All card holders and customers are thoroughly verified for your safety"
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description: "Bank-level security ensures all your transactions are protected"
  },
  {
    icon: Zap,
    title: "Instant Approval",
    description: "Get your requests approved quickly and start saving immediately"
  },
  {
    icon: TrendingUp,
    title: "Earn Extra Income",
    description: "Card holders can earn by offering their cards for rent safely"
  },
  {
    icon: Award,
    title: "Premium Support",
    description: "24/7 customer support to help you with any questions or issues"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of smart shopping with exclusive benefits
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="hover-lift hover-glow transition-all animate-fade-in border-2 hover:border-primary/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 hover-scale">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;