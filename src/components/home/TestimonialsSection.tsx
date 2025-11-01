import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ReviewDialog } from "@/components/ReviewDialog";

interface Review {
  id: string;
  user_name: string;
  user_role: string;
  rating: number;
  comment: string;
}

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);
    
    if (data) {
      setReviews(data);
    }
  };
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of satisfied customers and card holders
          </p>
          <ReviewDialog />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{review.comment}"</p>
                <div>
                  <p className="font-semibold">{review.user_name}</p>
                  <p className="text-sm text-muted-foreground">{review.user_role}</p>
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