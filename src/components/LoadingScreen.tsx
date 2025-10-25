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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto" />
          <div className="absolute inset-0 h-16 w-16 rounded-full bg-primary/20 animate-ping mx-auto" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we prepare your experience</p>
        </div>
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
