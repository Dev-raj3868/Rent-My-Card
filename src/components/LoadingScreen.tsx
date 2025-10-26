import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 backdrop-blur-sm">
      <div className="text-center space-y-8 animate-fade-in px-4">
        <div className="relative">
          <div className="absolute inset-0 h-24 w-24 rounded-full bg-gradient-to-r from-primary to-accent animate-ping opacity-20 mx-auto" />
          <div className="absolute inset-0 h-24 w-24 rounded-full bg-gradient-to-r from-primary to-accent blur-xl opacity-40 mx-auto animate-pulse" />
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-r from-primary to-accent p-1 mx-auto animate-spin">
            <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-primary" />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
            Loading Your Experience
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Preparing something amazing for you...
          </p>
        </div>
        <div className="w-72 max-w-full mx-auto space-y-2">
          <div className="h-3 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm border border-primary/20">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_2s_infinite] transition-all duration-500 ease-out rounded-full shadow-lg shadow-primary/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground font-medium">{progress}% Complete</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
