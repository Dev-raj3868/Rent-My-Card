import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { toast } from "sonner";
import { CreditCard, Send, Upload, CheckCircle } from "lucide-react";
import paymentQR from "@/assets/payment-qr.png";

const FeaturedCards = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [requestFormData, setRequestFormData] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    fetchCards();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");
  };

  const fetchCards = async () => {
    const { data } = await supabase.from("credit_cards").select("*").eq("available", true);
    setCards(data || []);
  };

  const handlePaymentStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setRequestFormData({
      product_name: formData.get("product_name") as string,
      product_price: parseFloat(formData.get("product_price") as string),
      product_url: formData.get("product_url") as string,
      message: formData.get("message") as string
    });
    setShowPayment(true);
  };

  const handleConfirmPayment = async () => {
    if (!paymentFile) {
      toast.error("Please upload payment proof before proceeding");
      return;
    }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    try {
      // Fetch customer profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", user?.id)
        .maybeSingle();

      // Upload payment proof image
      const fileExt = paymentFile.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('order-receipts')
        .upload(fileName, paymentFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('order-receipts')
        .getPublicUrl(fileName);

      // Create purchase request with payment proof and customer info
      const { error } = await supabase.from("purchase_requests").insert({
        customer_id: user?.id as string,
        card_id: selectedCard.id,
        card_holder_id: selectedCard.card_holder_id,
        product_name: requestFormData.product_name,
        product_price: requestFormData.product_price,
        product_url: requestFormData.product_url,
        message: requestFormData.message,
        payment_proof_url: publicUrl,
        customer_name: profile?.full_name || null,
        customer_phone: profile?.phone || null,
        card_name_snapshot: selectedCard.card_name
      });

      if (error) throw error;
      toast.success("Payment confirmed! Request sent to card holder.");
      setSelectedCard(null);
      setShowPayment(false);
      setPaymentFile(null);
      setRequestFormData(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatINR = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CustomerSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Featured Cards</h1>
              </div>
              <div className="flex items-center gap-4">
                <NotificationDropdown />
                <ProfileDropdown />
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-auto bg-muted/30">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Browse All Cards</h2>
              <p className="text-muted-foreground">Find the perfect card for your purchase needs</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <Card key={card.id} className="overflow-hidden">
                  <div className="bg-gradient-to-br from-primary via-primary/90 to-accent p-6 text-white min-h-[180px] flex flex-col justify-between relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-12 h-8 bg-yellow-400 rounded flex items-center justify-center">
                          <div className="w-8 h-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold tracking-wider">{card.card_name}</p>
                        <p className="text-sm opacity-90">{card.card_type}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-75 uppercase">Bank</p>
                        <p className="font-semibold">{card.bank_name || "N/A"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-75 uppercase">Discount</p>
                        <p className="text-2xl font-bold">{card.discount_percentage}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="space-y-3 pt-4">
                    {card.terms && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">{card.terms}</p>
                      </div>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" onClick={() => setSelectedCard(card)}>
                          <Send className="mr-2 h-4 w-4" />
                          Send Request
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-background">
                        {!showPayment ? (
                          <form onSubmit={handlePaymentStep}>
                            <DialogHeader>
                              <DialogTitle>Request to Use Card</DialogTitle>
                              <DialogDescription>Card: {card.card_name}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="product_name">Product Name *</Label>
                                <Input id="product_name" name="product_name" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="product_price">Product Price (₹) *</Label>
                                <Input id="product_price" name="product_price" type="number" step="0.01" required placeholder="Enter amount in INR" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="product_url">Product URL</Label>
                                <Input id="product_url" name="product_url" type="url" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" name="message" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">
                                Proceed to Payment
                              </Button>
                            </DialogFooter>
                          </form>
                        ) : (
                          <div>
                            <DialogHeader>
                              <DialogTitle>Complete Payment</DialogTitle>
                              <DialogDescription>Scan QR code and upload payment proof</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-6">
                              <div className="flex flex-col items-center space-y-4">
                                <img 
                                  src={paymentQR} 
                                  alt="Payment QR Code" 
                                  className="w-64 h-64 border rounded-lg"
                                />
                                <div className="text-center space-y-2">
                                  <p className="font-semibold text-lg">UPI ID: imperialnext980@okaxis</p>
                                  <p className="text-sm text-muted-foreground">Scan to pay with any UPI app</p>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <Label htmlFor="payment-proof">Upload Payment Proof *</Label>
                                <div className="mt-2">
                                  <Input
                                    id="payment-proof"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
                                    className="cursor-pointer"
                                  />
                                  {paymentFile && (
                                    <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      {paymentFile.name}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="gap-2">
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setShowPayment(false);
                                  setPaymentFile(null);
                                }}
                              >
                                Back
                              </Button>
                              <Button 
                                onClick={handleConfirmPayment}
                                disabled={!paymentFile || loading}
                              >
                                {loading ? "Sending..." : (
                                  <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Confirm & Send Request
                                  </>
                                )}
                              </Button>
                            </DialogFooter>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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

export default FeaturedCards;
