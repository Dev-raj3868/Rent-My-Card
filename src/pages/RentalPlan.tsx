import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RentalPlan = () => {
  const features = [
    "Access to verified credit cards",
    "Secure payment system",
    "Real-time request tracking",
    "24/7 customer support",
    "Easy approval process",
    "Multiple payment options"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Rental Card Plans</h1>
            <p className="text-lg text-muted-foreground">
              Simple, transparent pricing for card rental services
            </p>
          </div>

          <Card className="border-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Pay Per Use</CardTitle>
              <CardDescription className="text-lg">Only pay when you use a card</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-2">Rental fee based on card type</p>
                <p className="text-sm text-muted-foreground">
                  Fee determined by card holder and card features
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold mb-4">What's included:</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold mb-3">How it works:</h3>
                <ol className="space-y-2 text-muted-foreground">
                  <li>1. Browse available cards</li>
                  <li>2. Select a card and submit your purchase request</li>
                  <li>3. Make payment via UPI</li>
                  <li>4. Card holder processes your request</li>
                  <li>5. Receive your order confirmation</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RentalPlan;
