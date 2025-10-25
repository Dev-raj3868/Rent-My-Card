import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, TrendingUp, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-muted-foreground">
              Connecting card holders with customers for mutual benefit
            </p>
          </div>
          
          <div className="space-y-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-primary" />
                  <CardTitle>Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  At CardRental, our mission is to create a secure and transparent marketplace where 
                  credit card holders can monetize their unused credit benefits while helping customers 
                  save money on their purchases. We believe in creating win-win situations for all parties 
                  involved.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <CardTitle>How It Started</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2024, CardRental was born from the idea that credit card rewards and 
                  benefits shouldn't go to waste. Our platform connects verified card holders with 
                  customers looking to make purchases at discounted rates, creating value for both sides 
                  of the transaction.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle>Our Values</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-fit">Security First:</span>
                    <span>We prioritize the safety and privacy of all our users.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-fit">Transparency:</span>
                    <span>Clear terms and conditions for all transactions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-fit">Trust:</span>
                    <span>Building a community of verified and trusted users.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground min-w-fit">Innovation:</span>
                    <span>Constantly improving our platform to serve you better.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Team Stats */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardContent className="pt-6">
                  <Users className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardContent className="pt-6">
                  <Shield className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Secure</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <CardContent className="pt-6">
                  <TrendingUp className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <CardContent className="pt-6">
                  <Target className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">4.9/5</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
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

export default About;
