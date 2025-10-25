import { useEffect, useState } from "react";

const stats = [
  { label: "Active Users", value: 10000, suffix: "+" },
  { label: "Cards Available", value: 500, suffix: "+" },
  { label: "Total Savings", value: 50, prefix: "₹", suffix: "L+" },
  { label: "Success Rate", value: 98, suffix: "%" }
];

const StatsSection = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setHasAnimated(true);
            stats.forEach((stat, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = stat.value / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.value) {
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = stat.value;
                    return newCounts;
                  });
                  clearInterval(timer);
                } else {
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = Math.floor(current);
                    return newCounts;
                  });
                }
              }, duration / steps);
            });
          }
        },
        { threshold: 0.5 }
      );

      const element = document.getElementById("stats-section");
      if (element) observer.observe(element);

      return () => observer.disconnect();
    }
  }, [hasAnimated]);

  return (
    <section id="stats-section" className="py-20 px-4 bg-gradient-to-br from-primary to-accent text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stat.prefix}{counts[index].toLocaleString('en-IN')}{stat.suffix}
              </div>
              <div className="text-lg md:text-xl text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;