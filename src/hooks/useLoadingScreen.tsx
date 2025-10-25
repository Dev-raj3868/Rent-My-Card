import { useState, useEffect } from "react";

export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("hasLoaded");
    
    if (hasLoadedBefore) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoaded", "true");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { isLoading };
};
