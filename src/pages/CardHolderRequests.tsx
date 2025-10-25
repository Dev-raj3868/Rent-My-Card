import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CardHolderSidebar } from "@/components/CardHolderSidebar";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { toast } from "sonner";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import RequestActionsCell from "@/components/cardholder/RequestActionsCell";

const CardHolderRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    fetchRequests();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/auth");
  };

  const fetchRequests = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("purchase_requests")
      .select("*, credit_cards(card_name)")
      .eq("card_holder_id", user?.id)
      .order("created_at", { ascending: true });
    setRequests(data || []);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "hh:mm a");
  };

  const handleApprove = (id: string) => {
    fetchRequests();
  };

  const handleReject = async (id: string, reason: string) => {
    const { error } = await supabase
      .from("purchase_requests")
      .update({ 
        status: "rejected", 
        rejected_at: new Date().toISOString(),
        rejection_reason: reason
      })
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to reject request");
    } else {
      toast.success("Request rejected");
      fetchRequests();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CardHolderSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Purchase Requests</h1>
              </div>
              <div className="flex items-center gap-4">
                <NotificationDropdown />
                <ProfileDropdown />
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 overflow-auto bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="grid gap-4">
              {requests.map((req, index) => (
                <Card key={req.id} className="hover-lift animate-fade-in">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex items-start gap-3 w-full sm:w-auto">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm hover-scale">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg md:text-xl">{req.product_name}</CardTitle>
                          <CardDescription className="mt-1">
                            Card: {req.card_name_snapshot || req.credit_cards?.card_name || 'N/A'}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={
                          req.status === "approved" ? "default" : 
                          req.status === "rejected" ? "destructive" : 
                          "secondary"
                        }
                        className="hover-scale"
                      >
                        {req.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(req.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(req.created_at)}</span>
                        </div>
                      </div>

                      {req.customer_name && (
                        <p className="text-sm">
                          <span className="font-medium">Customer:</span> {req.customer_name}
                          {req.customer_phone && ` • ${req.customer_phone}`}
                        </p>
                      )}

                      <p><span className="font-medium">Price:</span> ₹{req.product_price.toLocaleString('en-IN')}</p>

                      {req.product_url && (
                        <a 
                          href={req.product_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline flex items-center gap-1 text-sm hover-scale"
                        >
                          View Product <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      
                      {req.message && (
                        <div className="text-sm italic text-muted-foreground bg-muted/50 p-3 rounded">
                          "{req.message}"
                        </div>
                      )}

                      {req.payment_proof_url && (
                        <a 
                          href={req.payment_proof_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm flex items-center gap-1 hover-scale"
                        >
                          View Payment Proof <ExternalLink className="h-3 w-3" />
                        </a>
                      )}

                      <div className="pt-2">
                        <RequestActionsCell
                          request={req}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          onUploadComplete={fetchRequests}
                        />
                      </div>
                    </div>
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

export default CardHolderRequests;
