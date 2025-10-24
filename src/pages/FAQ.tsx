import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the credit card rental marketplace work?",
      answer: "Card holders list their credit cards on our platform, and customers can browse available cards to request purchases. When you find a card that meets your needs, you send a purchase request with product details. The card holder then completes the purchase on your behalf, and you receive a discount on the original price."
    },
    {
      question: "Is it safe to use this service?",
      answer: "Yes! All transactions are encrypted and protected with industry-standard security measures. All card holders and customers are verified for safety. Your personal information is always kept private and secure, and we never share sensitive card details."
    },
    {
      question: "How much can I save?",
      answer: "You get a guaranteed discount on all purchases made through our rental marketplace, making it an excellent way to save money on your purchases."
    },
    {
      question: "How do I become a card holder?",
      answer: "Simply sign up for a Card Holder account, verify your identity, and list your credit cards on the platform. You can start earning money from each transaction immediately. Our dashboard provides analytics and easy request management."
    },
    {
      question: "What types of purchases are allowed?",
      answer: "Most legitimate purchases are allowed on our platform. However, we prohibit illegal activities, fraudulent purchases, or anything that violates our terms of service. If you're unsure, please contact our support team."
    },
    {
      question: "How long does it take to process a purchase request?",
      answer: "Purchase requests are typically processed quickly. Once a card holder accepts your request, they will complete the purchase and notify you. Processing times can vary depending on the card holder's availability and the complexity of the purchase."
    },
    {
      question: "What if there's a problem with my purchase?",
      answer: "We offer 24/7 customer support to help resolve any issues. If there's a problem with your purchase, contact our support team immediately, and we'll work with you and the card holder to find a solution."
    },
    {
      question: "Can I cancel a purchase request?",
      answer: "Yes, you can cancel a purchase request before the card holder accepts it. Once a card holder has accepted and processed your request, cancellations may be subject to our refund policy."
    },
    {
      question: "How do card holders earn money?",
      answer: "Card holders earn a commission from each successful transaction. The exact amount depends on the purchase value and any rewards or cashback the card holder receives from their card issuer."
    },
    {
      question: "Is there a limit to how many cards I can list as a card holder?",
      answer: "No, there's no limit! You can list unlimited cards on our platform and manage all your requests from a single dashboard."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our credit card rental marketplace
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      
      <Chatbot />
      <Footer />
    </div>
  );
};

export default FAQ;
