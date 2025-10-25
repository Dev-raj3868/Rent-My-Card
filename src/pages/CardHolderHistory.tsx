import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CardHolderSidebar } from "@/components/CardHolderSidebar";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, Download } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

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
      .select("*")
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

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Image downloaded successfully");
    } catch (error) {
      toast.error("Failed to download image");
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
                <h1 className="text-2xl font-bold">Request History</h1>
              </div>
              <div className="flex items-center gap-4">
                <NotificationDropdown />
                <ProfileDropdown />
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="mb-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-2">All Requests</h2>
              <p className="text-muted-foreground">Complete history of all purchase requests for your cards</p>
            </div>

            {requests.length === 0 ? (
              <Card className="hover-lift">
                <CardContent className="py-8 text-center text-muted-foreground">
                  No requests found
                </CardContent>
              </Card>
            ) : (
              <Card className="hover-lift animate-fade-in">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Card</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Images</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requests.map((req, index) => (
                          <TableRow key={req.id} className="table-row-hover">
                            <TableCell className="font-medium">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm hover-scale">
                                {index + 1}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">{req.product_name}</span>
                                {req.product_url && (
                                  <a 
                                    href={req.product_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-xs text-primary hover:underline flex items-center gap-1 hover-scale"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    View Product <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {req.card_name_snapshot || 'N/A'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-medium">{req.customer_name || 'N/A'}</span>
                                {req.customer_phone && (
                                  <span className="text-xs text-muted-foreground">{req.customer_phone}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">₹{req.product_price.toLocaleString('en-IN')}</span>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                className="hover-scale"
                                variant={
                                  req.status === "approved" ? "default" : 
                                  req.status === "rejected" ? "destructive" : 
                                  "secondary"
                                }
                              >
                                {req.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-0.5 text-sm">
                                <span>{formatDate(req.created_at)}</span>
                                <span className="text-xs text-muted-foreground">{formatTime(req.created_at)}</span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              {req.message && (
                                <p className="text-sm text-muted-foreground truncate italic" title={req.message}>
                                  {req.message}
                                </p>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-2">
                                {req.payment_proof_url && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadImage(req.payment_proof_url, `payment-${req.id}.png`)}
                                    className="hover-scale text-xs"
                                  >
                                    <Download className="h-3 w-3 mr-1" />
                                    Payment
                                  </Button>
                                )}
                                {req.order_receipt_url && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadImage(req.order_receipt_url, `receipt-${req.id}.png`)}
                                    className="hover-scale text-xs"
                                  >
                                    <Download className="h-3 w-3 mr-1" />
                                    Receipt
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex flex-col gap-1 items-end">
                                {req.status === "approved" && (
                                  <>
                                    {req.approved_at && (
                                      <span className="text-xs text-green-600">
                                        ✓ {formatDate(req.approved_at)}
                                      </span>
                                    )}
                                    {req.order_receipt_url && (
                                      <a 
                                        href={req.order_receipt_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs text-primary hover:underline flex items-center gap-1 hover-scale"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Receipt <ExternalLink className="h-3 w-3" />
                                      </a>
                                    )}
                                    {req.order_details && (
                                      <span className="text-xs text-muted-foreground" title={req.order_details}>
                                        Order Details
                                      </span>
                                    )}
                                  </>
                                )}
                                {req.status === "rejected" && (
                                  <>
                                    {req.rejected_at && (
                                      <span className="text-xs text-destructive">
                                        ✗ {formatDate(req.rejected_at)}
                                      </span>
                                    )}
                                    {req.rejection_reason && (
                                      <p className="text-xs text-destructive max-w-xs" title={req.rejection_reason}>
                                        Reason: {req.rejection_reason}
                                      </p>
                                    )}
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CardHolderHistory;
