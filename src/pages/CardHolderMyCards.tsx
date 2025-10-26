import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CardHolderSidebar } from "@/components/CardHolderSidebar";
import { toast } from "sonner";
import { CreditCard, Plus, Trash2 } from "lucide-react";

const CardHolderMyCards = () => {
  const navigate = useNavigate();
  const [myCards, setMyCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchCards();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");
  };

  const fetchCards = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from("credit_cards").select("*").eq("card_holder_id", user?.id);
    setMyCards(data || []);
  };

  const handleAddCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    try {
      const { error } = await supabase.from("credit_cards").insert({
        card_holder_id: user?.id as string,
        card_name: formData.get("card_name") as string,
        card_type: formData.get("card_type") as string,
        bank_name: formData.get("bank_name") as string,
        terms: formData.get("terms") as string
      });

      if (error) throw error;
      toast.success("Card added successfully!");
      fetchCards();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("credit_cards")
        .delete()
        .eq("id", cardId);

      if (error) throw error;
      toast.success("Card deleted successfully!");
      fetchCards();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CardHolderSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-card/50 backdrop-blur transition-all duration-300">
            <div className="px-4 py-4 flex items-center gap-4">
              <SidebarTrigger className="hover-scale" />
              <h1 className="text-2xl font-bold hover-scale inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                My Cards
              </h1>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 overflow-auto bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold hover-scale inline-block">My Credit Cards</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="hover-scale w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Card
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleAddCard}>
                    <DialogHeader>
                      <DialogTitle>Add New Card</DialogTitle>
                      <DialogDescription>List your card for rental</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="card_name">Card Name *</Label>
                        <Input id="card_name" name="card_name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card_type">Card Type *</Label>
                        <Input id="card_type" name="card_type" placeholder="Visa, Mastercard, etc." required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank_name">Bank Name</Label>
                        <Input id="bank_name" name="bank_name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="terms">Terms & Conditions</Label>
                        <Textarea id="terms" name="terms" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Card"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCards.map((card, index) => (
                <Card key={card.id} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 hover-scale inline-flex">
                          <CreditCard className="h-5 w-5 text-primary" />
                          {card.card_name}
                        </CardTitle>
                        <CardDescription className="mt-1">{card.card_type}</CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteCard(card.id)}
                        disabled={loading}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 hover-scale"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {card.bank_name && (
                      <p className="text-sm mb-2">
                        <span className="font-medium">Bank:</span> {card.bank_name}
                      </p>
                    )}
                    <Badge 
                      variant={card.available ? "default" : "secondary"}
                      className="hover-scale"
                    >
                      {card.available ? "Available" : "Unavailable"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CardHolderMyCards;