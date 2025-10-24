import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CardHolderSidebar } from "@/components/CardHolderSidebar";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { toast } from "sonner";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

const CardHolderRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [dialogType, setDialogType] = useState<"approve" | "reject" | null>(null);
  const [loading, setLoading] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

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

  const handleApprove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let receiptUrl = null;
      
      // Upload receipt if provided
      if (receiptFile) {
        const fileExt = receiptFile.name.split('.').pop();
        const fileName = `${selectedRequest.id}/${Date.now()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('order-receipts')
          .upload(fileName, receiptFile);
        
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('order-receipts')
          .getPublicUrl(fileName);
        
        receiptUrl = publicUrl;
      }

      const { error } = await supabase
        .from("purchase_requests")
        .update({
          status: "approved",
          order_details: formData.get("order_details") as string,
          order_receipt_url: receiptUrl,
          approved_at: new Date().toISOString()
        })
        .eq("id", selectedRequest.id);

      if (error) throw error;
      
      toast.success("Request approved successfully!");
      setDialogType(null);
      setSelectedRequest(null);
      setReceiptFile(null);
      fetchRequests();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from("purchase_requests")
        .update({
          status: "rejected",
          rejected_at: new Date().toISOString(),
          rejection_reason: formData.get("rejection_reason") as string
        })
        .eq("id", selectedRequest.id);

      if (error) throw error;
      
      toast.success("Request rejected");
      setDialogType(null);
      setSelectedRequest(null);
      fetchRequests();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (request: any, type: "approve" | "reject") => {
    setSelectedRequest(request);
    setDialogType(type);
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

          <main className="flex-1 p-8 overflow-auto bg-muted/30">
            <div className="grid gap-4">
              {requests.map((req, index) => {
                return (
                  <Card key={req.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{req.product_name}</CardTitle>
                            <CardDescription className="mt-1">Card: {req.credit_cards?.card_name}</CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant={
                            req.status === "approved" ? "default" : 
                            req.status === "rejected" ? "destructive" : 
                            "secondary"
                          }
                          className={
                            req.status === "approved" ? "bg-blue-500 hover:bg-blue-600" : 
                            req.status === "rejected" ? "bg-red-500 hover:bg-red-600" : 
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
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
                          <a 
                            href={req.product_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary hover:underline flex items-center gap-1 text-sm"
                          >
                            View Product <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        
                        {req.message && (
                          <div className="text-sm italic text-muted-foreground bg-muted/50 p-2 rounded">
                            "{req.message}"
                          </div>
                        )}

                        {req.status === "pending" && (
                          <div className="flex gap-2 pt-2">
                            <Button 
                              onClick={() => openDialog(req, "approve")}
                              className="flex-1"
                            >
                              Approve
                            </Button>
                            <Button 
                              onClick={() => openDialog(req, "reject")}
                              variant="outline"
                              className="flex-1"
                            >
                              Reject
                            </Button>
                          </div>
                        )}

                        {req.status === "approved" && req.order_details && (
                          <div className="pt-2 border-t">
                            <p className="text-sm font-medium mb-1">Order Details:</p>
                            <p className="text-sm text-muted-foreground">{req.order_details}</p>
                            {req.order_receipt_url && (
                              <a 
                                href={req.order_receipt_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-sm mt-1 inline-block"
                              >
                                View Receipt
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Approve Dialog */}
            <Dialog open={dialogType === "approve"} onOpenChange={() => setDialogType(null)}>
              <DialogContent className="bg-background">
                <form onSubmit={handleApprove}>
                  <DialogHeader>
                    <DialogTitle>Approve Purchase Request</DialogTitle>
                    <DialogDescription>
                      Approve the request for {selectedRequest?.product_name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="order_details">Order Details *</Label>
                      <Textarea 
                        id="order_details" 
                        name="order_details" 
                        required 
                        placeholder="Enter order confirmation details, tracking info, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="receipt">Order Receipt</Label>
                      <Input 
                        id="receipt" 
                        type="file" 
                        accept="image/*,.pdf"
                        onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                      />
                      <p className="text-xs text-muted-foreground">Upload order receipt or invoice (optional)</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setDialogType(null)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Approving..." : "Approve & Submit"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={dialogType === "reject"} onOpenChange={() => setDialogType(null)}>
              <DialogContent className="bg-background">
                <form onSubmit={handleReject}>
                  <DialogHeader>
                    <DialogTitle>Reject Purchase Request</DialogTitle>
                    <DialogDescription>
                      Please provide a reason for rejecting {selectedRequest?.product_name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="rejection_reason">Rejection Reason *</Label>
                      <Textarea 
                        id="rejection_reason" 
                        name="rejection_reason" 
                        required 
                        placeholder="Enter reason for rejection..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setDialogType(null)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="destructive" disabled={loading}>
                      {loading ? "Rejecting..." : "Reject"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CardHolderRequests;
