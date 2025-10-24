import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Save Money?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Join our marketplace today and start enjoying exclusive discounts
        </p>
        <Button size="lg" onClick={() => navigate("/auth")}>
          Sign Up Now
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
