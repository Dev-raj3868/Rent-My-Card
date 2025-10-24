import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="relative py-20 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90" />
      <div className="relative container mx-auto text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Credit Card Rental Marketplace</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Get discounts on your purchases by renting credit cards from verified holders
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="secondary" onClick={() => navigate("/auth")}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20" onClick={() => navigate("/auth")}>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
