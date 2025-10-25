import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
      <div className="container mx-auto text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 hover-scale">Ready to Save Money?</h2>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
          Join our marketplace today and start enjoying exclusive discounts on every purchase
        </p>
        <Button size="lg" onClick={() => navigate("/auth")} className="hover-lift hover-glow text-base md:text-lg px-8 md:px-10 py-4 md:py-6">
          Sign Up Now
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
