import { Shield, Lock, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TrustSection = () => {
  const trustPoints = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-level encryption protects all your payment information and personal data."
    },
    {
      icon: Lock,
      title: "Verified Card Holders",
      description: "All card holders go through a strict verification process for your safety."
    },
    {
      icon: Award,
      title: "100% Satisfaction",
      description: "Join thousands of happy customers who saved money on their purchases."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our dedicated support team is always available to assist you."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 hover-scale inline-block">
            Why Trust Us?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your security and satisfaction are our top priorities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => (
            <Card 
              key={index} 
              className="hover-lift hover-glow animate-fade-in text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="mb-4 inline-block p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full hover-scale">
                  <point.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 hover-scale inline-block">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;