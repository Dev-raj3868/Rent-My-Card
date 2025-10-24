import { useEffect, useState } from "react";
import { CreditCard, User, Settings, LogOut, Home, History } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/cardholder-dashboard", icon: Home },
  { title: "My Cards", url: "/cardholder-my-cards", icon: CreditCard },
  { title: "Requests", url: "/cardholder-requests", icon: CreditCard },
  { title: "History", url: "/cardholder-history", icon: History },
  { title: "Profile", url: "/cardholder-profile", icon: User },
  { title: "Settings", url: "/cardholder-settings", icon: Settings },
];

export function CardHolderSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardHolderName, setCardHolderName] = useState<string>("");

  useEffect(() => {
    fetchCardHolderName();
  }, []);

  const fetchCardHolderName = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();
      setCardHolderName(data?.full_name || "Card Holder");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-start gap-1 text-lg font-bold px-4 py-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Card Holder
            </div>
            {cardHolderName && (
              <span className="text-xs font-normal text-muted-foreground">{cardHolderName}</span>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={isActive(item.url)}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="w-full text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
