import { useEffect, useState } from "react";
import { Loader2, CreditCard } from "lucide-react";
import loadingHero from "@/assets/loading-hero.jpg";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background with image */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-background to-accent animate-gradient-shift">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center animate-[pulse_4s_ease-in-out_infinite]"
          style={{ backgroundImage: `url(${loadingHero})` }}
        />
        {/* Animated overlay patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.3),transparent_40%)] animate-pulse" />
      </div>

      <div className="relative text-center space-y-8 animate-fade-in px-4 z-10">
        {/* Main loader with enhanced 3D effect */}
        <div className="relative">
          {/* Outer glow rings */}
          <div className="absolute inset-0 h-32 w-32 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-ping opacity-20 mx-auto" />
          <div className="absolute inset-0 h-32 w-32 rounded-full bg-gradient-to-r from-accent via-primary to-accent blur-2xl opacity-50 mx-auto animate-pulse" />
          
          {/* Middle rotating ring */}
          <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-2 mx-auto animate-spin shadow-2xl shadow-primary/50">
            <div className="h-full w-full rounded-full bg-gradient-to-br from-background via-card to-background flex items-center justify-center backdrop-blur-xl border-2 border-primary/20">
              <div className="relative">
                <CreditCard className="h-16 w-16 text-primary animate-pulse" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Orbiting particles */}
          <div className="absolute inset-0 h-32 w-32 mx-auto">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-accent rounded-full animate-[ping_2s_ease-in-out_infinite] -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-primary rounded-full animate-[ping_2s_ease-in-out_infinite_0.5s] -translate-x-1/2" />
            <div className="absolute left-0 top-1/2 w-3 h-3 bg-secondary rounded-full animate-[ping_2s_ease-in-out_infinite_1s] -translate-y-1/2" />
            <div className="absolute right-0 top-1/2 w-3 h-3 bg-accent rounded-full animate-[ping_2s_ease-in-out_infinite_1.5s] -translate-y-1/2" />
          </div>
        </div>

        {/* Text content with enhanced animations */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in bg-[length:200%_100%] animate-[shimmer_3s_infinite]">
            CardRental Marketplace
          </h2>
          <p className="text-muted-foreground text-xl animate-fade-in flex items-center justify-center gap-2" style={{ animationDelay: '0.2s' }}>
            <Loader2 className="h-5 w-5 animate-spin" />
            Preparing your premium experience...
          </p>
        </div>

        {/* Enhanced progress bar */}
        <div className="w-80 max-w-full mx-auto space-y-3">
          <div className="relative h-4 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm border border-primary/30 shadow-inner">
            {/* Animated background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-[shimmer_2s_infinite]" />
            
            {/* Progress fill */}
            <div 
              className="relative h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_2s_infinite] transition-all duration-500 ease-out rounded-full shadow-lg shadow-primary/50"
              style={{ width: `${progress}%` }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30 rounded-full" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-semibold flex items-center justify-between px-2">
            <span>Loading Assets</span>
            <span className="text-primary font-bold">{progress}%</span>
          </p>
        </div>

        {/* Floating badges */}
        <div className="flex gap-3 justify-center items-center flex-wrap animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm text-sm font-medium text-primary animate-pulse">
            Secure Payments
          </div>
          <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 backdrop-blur-sm text-sm font-medium text-accent animate-pulse" style={{ animationDelay: '0.2s' }}>
            Verified Cards
          </div>
          <div className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 backdrop-blur-sm text-sm font-medium text-secondary animate-pulse" style={{ animationDelay: '0.4s' }}>
            Best Discounts
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
