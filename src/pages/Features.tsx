import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CreditCard, TrendingDown, Lock, Zap, Users, CheckCircle, Award, Clock, Globe } from "lucide-react";

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
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fade-in hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 hover-scale transition-all duration-300 hover:bg-primary/20">
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

          {/* Additional Benefits Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Verified Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">All users go through a thorough verification process to ensure safety and trust in every transaction.</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Best Discounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Get access to the best credit card offers and save money on every purchase you make.</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>24/7 Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our dedicated support team is available round the clock to assist you with any queries or issues.</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <Globe className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Global Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Access credit cards from various banks and institutions to meet all your shopping needs.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Features;
