import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface Request {
  id: string;
  product_name: string;
  product_url?: string;
  card_name_snapshot?: string;
  product_price: number;
  status: string;
  created_at: string;
  message?: string;
  payment_proof_url?: string;
  order_receipt_url?: string;
  approved_at?: string;
  order_details?: string;
  rejected_at?: string;
  rejection_reason?: string;
  customer_name?: string;
  customer_phone?: string;
}

interface RequestsTableProps {
  requests: Request[];
  onViewImage: (url: string, title: string) => void;
}

export const RequestsTable = ({ requests, onViewImage }: RequestsTableProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "hh:mm a");
  };

  return (
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
                      onClick={() => onViewImage(req.payment_proof_url!, 'Payment Proof')}
                      className="hover-scale text-xs"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Payment
                    </Button>
                  )}
                  {req.order_receipt_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewImage(req.order_receipt_url!, 'Order Receipt')}
                      className="hover-scale text-xs"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
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
  );
};
