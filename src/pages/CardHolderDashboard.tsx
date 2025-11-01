import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CardHolderSidebar } from "@/components/CardHolderSidebar";
import { CreditCard, Plus } from "lucide-react";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ProfileDropdown } from "@/components/ProfileDropdown";

const CardHolderDashboard = () => {
  const navigate = useNavigate();
  const [myCards, setMyCards] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");
  };

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: cards } = await supabase.from("credit_cards").select("*").eq("card_holder_id", user?.id);
    const { data: reqs } = await supabase.from("purchase_requests").select("*, credit_cards(card_name)").eq("card_holder_id", user?.id);
    setMyCards(cards || []);
    setRequests(reqs || []);
  };

  const pendingRequests = requests.filter(r => r.status === "pending").length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CardHolderSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold">Card Holder Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Manage your cards and requests</p>
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
              <p className="text-muted-foreground">Manage your cards and view purchase requests</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <CreditCard className="h-5 w-5" />
                    <CardTitle className="text-lg">Total Cards</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-1">{myCards.length}</div>
                  <p className="text-sm text-muted-foreground">Active listings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => navigate("/cardholder-my-cards")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Card
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-1">{pendingRequests}</div>
                  <p className="text-sm text-muted-foreground">Awaiting response</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Recent Cards</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCards.slice(0, 3).map((card) => (
                  <Card key={card.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        {card.card_name} - {card.card_type}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Type:</span> {card.card_type}</p>
                      <p className="text-sm"><span className="font-medium">Discount:</span> {card.discount_percentage}%</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Recent Requests</h3>
              <div className="space-y-4">
                {requests.slice(0, 5).map((req) => (
                  <Card key={req.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{req.product_name}</p>
                          <p className="text-sm text-muted-foreground">Card: {req.credit_cards?.card_name}</p>
                          <p className="text-sm mt-1">₹{req.product_price.toLocaleString('en-IN')}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          req.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                          req.status === "approved" ? "bg-green-100 text-green-800" : 
                          "bg-red-100 text-red-800"
                        }`}>
                          {req.status}
                        </span>
                      </div>
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

export default CardHolderDashboard;
