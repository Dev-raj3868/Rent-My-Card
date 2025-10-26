import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Percent, Clock, Star, TrendingUp } from "lucide-react";

const FeaturedDeals = () => {
  const deals = [
    {
      title: "Premium Cashback Cards",
      discount: "60%",
      category: "Shopping",
      rating: 4.9,
      users: "2.5K+",
      icon: Percent,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Travel Rewards Elite",
      discount: "55%",
      category: "Travel",
      rating: 4.8,
      users: "1.8K+",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Dining & Entertainment",
      discount: "50%",
      category: "Lifestyle",
      rating: 4.7,
      users: "3.2K+",
      icon: Star,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Limited Time Flash",
      discount: "70%",
      category: "Special",
      rating: 5.0,
      users: "890+",
      icon: Clock,
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="mb-4 hover-scale">🔥 Hot Deals</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 hover-glow">Featured Card Discounts</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Grab these exclusive offers before they're gone!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <Card 
              key={index}
              className="hover-lift group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 3D Card Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${deal.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${deal.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <deal.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-lg hover-scale">
                    {deal.discount} OFF
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{deal.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{deal.rating}</span>
                  <span className="text-xs">({deal.users} users)</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Badge variant="outline" className="mb-4">{deal.category}</Badge>
                <Button className="w-full hover-glow group-hover:shadow-xl transition-all">
                  View Offers
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
