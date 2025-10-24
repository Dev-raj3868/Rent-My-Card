import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { toast } from "sonner";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

const CustomerRequestStatus = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
      .eq("customer_id", user?.id)
      .eq("status", "pending");
    setRequests(data || []);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "hh:mm a");
  };

  const handleCancelRequest = async (requestId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("purchase_requests")
        .delete()
        .eq("id", requestId);

      if (error) throw error;
      
      toast.success("Request cancelled successfully");
      fetchRequests();
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
          <header className="border-b bg-card/50 backdrop-blur">
            <div className="px-4 py-4 flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Request Status</h1>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Pending Requests</h2>
              <p className="text-muted-foreground">Requests waiting for approval</p>
            </div>

            {requests.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No pending requests
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {requests.map((req) => (
                <Card key={req.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{req.product_name}</CardTitle>
                        <CardDescription>Card: {req.credit_cards?.card_name}</CardDescription>
                      </div>
                      <Badge 
                        variant={
                          req.status === "approved" ? "default" : 
                          req.status === "rejected" ? "destructive" : 
                          "secondary"
                        }
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

                      <p><span className="font-medium">Price:</span> ₹{req.product_price.toLocaleString('en-IN')}</p>
                      
                      {req.product_url && (
                        <p className="flex items-center gap-1">
                          <span className="font-medium">URL:</span> 
                          <a href={req.product_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                            View Product <ExternalLink className="h-3 w-3" />
                          </a>
                        </p>
                      )}
                      
                      {req.message && (
                        <div>
                          <p className="font-medium mb-1">Your Message:</p>
                          <p className="text-sm text-muted-foreground italic bg-muted/50 p-2 rounded">{req.message}</p>
                        </div>
                      )}

                      {req.status === "approved" && (
                        <div className="pt-2 border-t">
                          <p className="text-sm font-medium text-green-600 mb-2">✓ Request Approved</p>
                          {req.order_details && (
                            <div className="mb-2">
                              <p className="text-sm font-medium">Order Details:</p>
                              <p className="text-sm text-muted-foreground">{req.order_details}</p>
                            </div>
                          )}
                          {req.order_receipt_url && (
                            <a 
                              href={req.order_receipt_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                            >
                              View Receipt <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      )}

                      {req.status === "rejected" && req.rejection_reason && (
                        <div className="pt-2 border-t">
                          <p className="text-sm font-medium text-destructive mb-1">Rejection Reason:</p>
                          <p className="text-sm text-muted-foreground bg-destructive/10 p-2 rounded">{req.rejection_reason}</p>
                        </div>
                      )}

                      {req.status === "pending" && (
                        <Button 
                          onClick={() => handleCancelRequest(req.id)}
                          variant="destructive"
                          size="sm"
                          disabled={loading}
                          className="mt-2"
                        >
                          {loading ? "Cancelling..." : "Cancel Request"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CustomerRequestStatus;
