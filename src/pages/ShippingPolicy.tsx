import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Shipping Policy</h1>
        
        <Card>
          <CardContent className="prose prose-sm max-w-none pt-6">
            <p className="mb-4">For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only.</p>
            
            <p className="mb-4">Orders are shipped within 2-5 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.</p>
            
            <p className="mb-4">CardRental is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 2-5 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.</p>
            
            <p className="mb-4">Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.</p>
            
            <p className="mb-4">For any issues in utilizing our services you may contact our helpdesk on support@cardrental.com or call us at +1 (555) 123-4567.</p>
            
            <p className="font-semibold">Important Note:</p>
            <p>Please ensure that the shipping address provided is accurate and complete. CardRental will not be responsible for orders delivered to incorrect addresses provided by the customer.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
