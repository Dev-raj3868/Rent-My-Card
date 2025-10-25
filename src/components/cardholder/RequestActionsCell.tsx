import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Upload, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import ReceiptUploadDialog from "./ReceiptUploadDialog";
import RejectDialog from "./RejectDialog";

interface RequestActionsCellProps {
  request: any;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onUploadComplete: () => void;
}

const RequestActionsCell = ({ request, onApprove, onReject, onUploadComplete }: RequestActionsCellProps) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  if (request.status === "pending") {
    return (
      <>
        <div className="flex gap-2 justify-end">
          <Button
            size="sm"
            onClick={() => setUploadDialogOpen(true)}
            className="hover-scale"
          >
            <Upload className="mr-1 h-3 w-3" />
            Approve & Upload
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setRejectDialogOpen(true)}
            className="hover-scale"
          >
            <X className="mr-1 h-3 w-3" />
            Reject
          </Button>
        </div>
        <ReceiptUploadDialog
          open={uploadDialogOpen}
          onOpenChange={setUploadDialogOpen}
          requestId={request.id}
          onUploadComplete={onUploadComplete}
        />
        <RejectDialog
          open={rejectDialogOpen}
          onOpenChange={setRejectDialogOpen}
          requestId={request.id}
          onReject={onReject}
        />
      </>
    );
  }

  if (request.status === "approved") {
    return (
      <div className="flex flex-col gap-1 items-end">
        <Badge variant="default" className="hover-scale">
          <Check className="mr-1 h-3 w-3" />
          Approved
        </Badge>
        {request.approved_at && (
          <span className="text-xs text-green-600">
            {format(new Date(request.approved_at), "MMM dd, yyyy")}
          </span>
        )}
        {request.order_receipt_url && (
          <a
            href={request.order_receipt_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1 hover-scale"
          >
            View Receipt <ExternalLink className="h-3 w-3" />
          </a>
        )}
        {request.order_details && (
          <span className="text-xs text-muted-foreground" title={request.order_details}>
            Order Details
          </span>
        )}
      </div>
    );
  }

  if (request.status === "rejected") {
    return (
      <div className="flex flex-col gap-1 items-end">
        <Badge variant="destructive" className="hover-scale">
          <X className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
        {request.rejected_at && (
          <span className="text-xs text-destructive">
            {format(new Date(request.rejected_at), "MMM dd, yyyy")}
          </span>
        )}
        {request.rejection_reason && (
          <p className="text-xs text-destructive max-w-xs text-right" title={request.rejection_reason}>
            Reason: {request.rejection_reason}
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default RequestActionsCell;