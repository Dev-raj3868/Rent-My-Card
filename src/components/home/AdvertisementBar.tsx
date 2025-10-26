import { Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const AdvertisementBar = () => {
  return (
    <section className="py-4 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-shift overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 animate-marquee">
          <div className="flex items-center gap-2 text-white whitespace-nowrap hover-scale">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">Limited Time: 50% Extra Discount on Premium Cards</span>
          </div>
          <div className="flex items-center gap-2 text-white whitespace-nowrap hover-scale">
            <TrendingUp className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">Join 10,000+ Happy Customers Saving Money Daily</span>
          </div>
          <div className="flex items-center gap-2 text-white whitespace-nowrap hover-scale">
            <Shield className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">100% Secure & Verified Transactions</span>
          </div>
          <div className="flex items-center gap-2 text-white whitespace-nowrap hover-scale">
            <Zap className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">Instant Approval in 5 Minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementBar;
