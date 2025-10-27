import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import HeroSlider from "@/components/home/HeroSlider";
import AdvertisementBar from "@/components/home/AdvertisementBar";
import { Skeleton } from "@/components/ui/skeleton";

const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const BenefitsSection = lazy(() => import("@/components/home/BenefitsSection"));
const StatsSection = lazy(() => import("@/components/home/StatsSection"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const PricingSection = lazy(() => import("@/components/home/PricingSection"));
const TrustSection = lazy(() => import("@/components/home/TrustSection"));
const WhyChooseUs = lazy(() => import("@/components/home/WhyChooseUs"));

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSlider />
      <AdvertisementBar />
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <HowItWorksSection />
        <BenefitsSection />
        <TrustSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <StatsSection />
        <PricingSection />
        <CTASection />
      </Suspense>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;