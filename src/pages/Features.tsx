import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CreditCard, TrendingDown, Lock, Zap, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "All transactions are encrypted and protected with industry-standard security measures."
    },
    {
      icon: CreditCard,
      title: "Multiple Card Options",
      description: "Choose from a wide variety of credit cards from verified holders."
    },
    {
      icon: TrendingDown,
      title: "Discount Guarantee",
      description: "Save on all your purchases through our rental marketplace."
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Your personal information is always kept private and secure."
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Quick approval and processing of purchase requests."
    },
    {
      icon: Users,
      title: "Verified Users",
      description: "All card holders and customers are verified for your safety."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Platform Features</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover why thousands of users trust our credit card rental marketplace
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Features;
