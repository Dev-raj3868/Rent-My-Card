import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface ReceiptUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestId: string;
  onUploadComplete: () => void;
}

const ReceiptUploadDialog = ({ open, onOpenChange, requestId, onUploadComplete }: ReceiptUploadDialogProps) => {
  const [uploading, setUploading] = useState(false);
  const [orderDetails, setOrderDetails] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!receiptFile) {
      toast.error("Please select a receipt file");
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = receiptFile.name.split('.').pop();
      const fileName = `${user.id}/${requestId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('order-receipts')
        .upload(fileName, receiptFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('order-receipts')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('purchase_requests')
        .update({
          order_receipt_url: publicUrl,
          order_details: orderDetails || null,
          approved_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (updateError) throw updateError;

      toast.success("Receipt uploaded successfully!");
      onUploadComplete();
      onOpenChange(false);
      setReceiptFile(null);
      setOrderDetails("");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload receipt");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Order Receipt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="receipt">Receipt Image/PDF</Label>
            <div className="mt-2">
              <Input
                id="receipt"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            {receiptFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {receiptFile.name}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="details">Order Details (Optional)</Label>
            <Textarea
              id="details"
              placeholder="Order ID, tracking number, or any additional details..."
              value={orderDetails}
              onChange={(e) => setOrderDetails(e.target.value)}
              rows={3}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={uploading || !receiptFile}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? "Uploading..." : "Upload Receipt"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptUploadDialog;