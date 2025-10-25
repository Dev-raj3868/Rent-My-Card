import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import HeroSlider from "@/components/home/HeroSlider";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSlider />
      <StatsSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;