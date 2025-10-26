import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import HeroSlider from "@/components/home/HeroSlider";
import AdvertisementBar from "@/components/home/AdvertisementBar";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/CTASection";
import PricingSection from "@/components/home/PricingSection";
import TrustSection from "@/components/home/TrustSection";
import FeaturedDeals from "@/components/home/FeaturedDeals";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSlider />
      <AdvertisementBar />
      <HowItWorksSection />
      <BenefitsSection />
      <FeaturedDeals />
      <TrustSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;