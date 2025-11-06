import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "916396038900"; // Indian number with country code
  const message = "Hi! I have a question about RentMyCard.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
