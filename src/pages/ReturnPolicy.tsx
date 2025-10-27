import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Return Policy</h1>
        
        <Card>
          <CardContent className="prose prose-sm max-w-none pt-6">
            <p className="mb-4">We offer refund / exchange within first 5 days from the date of your purchase. If 5 days have passed since your purchase, you will not be offered a return, exchange or refund of any kind.</p>
            
            <p className="mb-4">In order to become eligible for a return or an exchange:</p>
            <ul className="mb-4">
              <li>The purchased item should be unused and in the same condition as you received it</li>
              <li>The item must have original packaging</li>
              <li>If the item that you purchased on a sale, then the item may not be eligible for a return / exchange</li>
            </ul>
            
            <p className="mb-4">Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged.</p>
            
            <p className="mb-4">You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase.</p>
            
            <p>For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further, if the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
