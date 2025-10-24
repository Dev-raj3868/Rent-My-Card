import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
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
            
            <Card>
              <CardHeader>
                <CardTitle>How It Started</CardTitle>
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
            
            <Card>
              <CardHeader>
                <CardTitle>Our Values</CardTitle>
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
          </div>
        </div>
      </main>
      
      <Chatbot />
      <Footer />
    </div>
  );
};

export default About;
