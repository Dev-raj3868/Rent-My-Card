import { Shield, Zap, Users, Award, Lock, HeadphonesIcon } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your transactions are protected with military-grade encryption",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Instant Approval",
      description: "Get approved within minutes and start saving immediately",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Verified Cardholders",
      description: "All cardholders are thoroughly verified for your safety",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Best Discounts",
      description: "Access exclusive discounts up to 70% on premium cards",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your personal information is never shared or compromised",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Our dedicated team is always here to help you",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 hover-glow">Why Choose CardRental?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the most trusted and secure credit card rental marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-card border-2 border-border hover:border-primary/50 hover-lift hover:shadow-2xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 3D Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <div className="relative">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
