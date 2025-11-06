import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CardHolderSidebar } from "@/components/CardHolderSidebar";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { RequestsTable } from "@/components/customer/RequestsTable";
import { ImageViewDialog } from "@/components/customer/ImageViewDialog";
import { getSignedUrl } from "@/utils/storageHelpers";

const CardHolderHistory = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

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

  const viewImage = async (url: string, title: string) => {
    const signedUrl = await getSignedUrl(url);
    setSelectedImage({ 
      url: signedUrl || url, 
      title 
    });
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

          <main className="flex-1 p-8 overflow-auto bg-background">
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
                  <RequestsTable requests={requests} onViewImage={viewImage} />
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>

      <ImageViewDialog 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </SidebarProvider>
  );
};

export default CardHolderHistory;
