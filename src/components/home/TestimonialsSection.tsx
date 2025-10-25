import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Regular Customer",
    rating: 5,
    text: "I've saved over ₹10,000 in the last month alone! The platform is easy to use and the card holders are very responsive."
  },
  {
    name: "Rajesh Kumar",
    role: "Card Holder",
    rating: 5,
    text: "Great way to earn passive income from my credit cards. The platform handles everything professionally and securely."
  },
  {
    name: "Sneha Patel",
    role: "Customer",
    rating: 5,
    text: "Amazing experience! I got my favorite electronics with 40% discount. Highly recommended for smart shoppers."
  },
  {
    name: "Amit Singh",
    role: "Card Holder",
    rating: 5,
    text: "The verification process gives me confidence. I've helped many customers save money while earning extra income."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers and card holders
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;