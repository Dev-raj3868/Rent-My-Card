import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/useNotifications";

export function NotificationDropdown() {
  const { notifications } = useNotifications();
  const hasUnread = notifications.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-background z-50 max-h-[400px] overflow-y-auto">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem className="flex flex-col items-center py-8">
            <p className="text-sm text-muted-foreground">No notifications</p>
          </DropdownMenuItem>
        ) : (
          notifications.map((notif, index) => (
            <div key={notif.id}>
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <p className="font-medium">{notif.title}</p>
                <p className="text-sm text-muted-foreground break-words">{notif.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
              </DropdownMenuItem>
              {index < notifications.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
