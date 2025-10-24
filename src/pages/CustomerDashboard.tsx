import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { toast } from "sonner";
import { CreditCard, Send, CheckCircle, Upload } from "lucide-react";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import paymentQR from "@/assets/payment-qr.png";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [requestFormData, setRequestFormData] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    fetchCards();
    fetchProfile();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");
  };

  const fetchCards = async () => {
    const { data } = await supabase.from("credit_cards").select("*").eq("available", true);
    setCards(data || []);
  };

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();
      if (data?.full_name) {
        setCustomerName(data.full_name);
      }
    }
  };

  const handlePaymentStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setRequestFormData({
      product_name: formData.get("product_name") as string,
      product_price: parseFloat(formData.get("product_price") as string),
      mobile_number: formData.get("mobile_number") as string,
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

      // Create purchase request with payment proof
      const { error } = await supabase.from("purchase_requests").insert({
        customer_id: user?.id as string,
        card_id: selectedCard.id,
        card_holder_id: selectedCard.card_holder_id,
        product_name: requestFormData.product_name,
        product_price: requestFormData.product_price,
        product_url: requestFormData.product_url,
        message: requestFormData.message,
        payment_proof_url: publicUrl
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CustomerSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold">Customer Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    {customerName ? `Welcome back, ${customerName}!` : "Welcome back!"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <NotificationDropdown />
                <ProfileDropdown />
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-auto bg-muted/30">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-muted-foreground">Browse available cards and send purchase requests</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <CreditCard className="h-5 w-5" />
                    <CardTitle className="text-lg">Available Cards</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-1">{cards.length}</div>
                  <p className="text-sm text-muted-foreground">Cards ready for rent</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg">
                    Browse All Cards
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Featured Cards</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.slice(0, 6).map((card) => (
                  <Card key={card.id}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <CardTitle>{card.card_name}</CardTitle>
                      </div>
                      <CardDescription>{card.card_type}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm"><span className="font-medium">Type:</span> {card.card_type}</p>
                        <p className="text-sm"><span className="font-medium">Bank:</span> {card.bank_name || 'N/A'}</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" onClick={() => {
                            setSelectedCard(card);
                            setShowPayment(false);
                            setPaymentFile(null);
                          }}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Request
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
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
                                  <Label htmlFor="mobile_number">Mobile Number *</Label>
                                  <Input id="mobile_number" name="mobile_number" type="tel" required placeholder="+91 XXXXX XXXXX" />
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
                                <DialogDescription>Scan QR code or use UPI ID to pay</DialogDescription>
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
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CustomerDashboard;
