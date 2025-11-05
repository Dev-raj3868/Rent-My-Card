import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RequestTableRow } from "./RequestTableRow";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";

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
  const { 
    paginatedItems, 
    currentPage, 
    totalPages, 
    goToPage, 
    nextPage, 
    previousPage,
    hasNextPage,
    hasPreviousPage
  } = usePagination(requests, 10);

  return (
    <div className="space-y-4">
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
            {paginatedItems.map((req, index) => (
              <RequestTableRow
                key={req.id}
                request={req}
                index={(currentPage - 1) * 10 + index}
                onViewImage={onViewImage}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={previousPage}
                className={!hasPreviousPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => goToPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={nextPage}
                className={!hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
