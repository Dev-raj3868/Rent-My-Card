import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CardHolderSidebar } from "@/components/CardHolderSidebar";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

const CardHolderHistory = () => {
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
      .order("created_at", { ascending: false });
    setRequests(data || []);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "hh:mm a");
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
                <h1 className="text-2xl font-bold">Request History</h1>
              </div>
              <div className="flex items-center gap-4">
                <NotificationDropdown />
                <ProfileDropdown />
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">All Requests</h2>
              <p className="text-muted-foreground">Complete history of all purchase requests for your cards</p>
            </div>

            {requests.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No requests found
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {requests.map((req, index) => (
                  <Card key={req.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <CardTitle>{req.product_name}</CardTitle>
                            <CardDescription>
                              {req.credit_cards?.card_name ? `Card: ${req.credit_cards.card_name}` : 'Card: Deleted'}
                            </CardDescription>
                          </div>
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
                            <p className="font-medium mb-1">Customer Message:</p>
                            <p className="text-sm text-muted-foreground italic bg-muted/50 p-2 rounded">{req.message}</p>
                          </div>
                        )}

                        {req.payment_proof_url && (
                          <div>
                            <p className="font-medium mb-1">Payment Proof:</p>
                            <a 
                              href={req.payment_proof_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                            >
                              View Payment Proof <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}

                        {req.status === "approved" && (
                          <div className="pt-2 border-t">
                            <p className="text-sm font-medium text-green-600 mb-2">✓ Request Approved</p>
                            {req.approved_at && (
                              <p className="text-sm text-muted-foreground mb-2">
                                Approved on {formatDate(req.approved_at)} at {formatTime(req.approved_at)}
                              </p>
                            )}
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
                            {req.rejected_at && (
                              <p className="text-sm text-muted-foreground mb-2">
                                Rejected on {formatDate(req.rejected_at)} at {formatTime(req.rejected_at)}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground bg-destructive/10 p-2 rounded">{req.rejection_reason}</p>
                          </div>
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

export default CardHolderHistory;
