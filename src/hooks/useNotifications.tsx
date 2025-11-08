import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  created_at: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('purchase_requests_notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'purchase_requests'
        },
        (payload) => {
          console.log('Notification received:', payload);
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Check user role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!roleData) return;

    let query;
    
    if (roleData.role === 'card_holder') {
      // Card holders see requests for their cards
      query = supabase
        .from('purchase_requests')
        .select(`
          id,
          status,
          product_name,
          created_at,
          customer_name,
          customer_phone,
          profiles!purchase_requests_customer_id_fkey(email, phone)
        `)
        .eq('card_holder_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
    } else {
      // Customers see their own requests
      query = supabase
        .from('purchase_requests')
        .select(`
          id,
          status,
          product_name,
          created_at,
          customer_name,
          customer_phone
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching notifications:', error);
      return;
    }

    const formattedNotifications: Notification[] = (data || []).map((req: any) => {
      const timeAgo = getTimeAgo(req.created_at);
      
      if (roleData.role === 'card_holder') {
        return {
          id: req.id,
          title: req.status === 'pending' ? 'New purchase request' : `Request ${req.status}`,
          description: `${req.customer_name || 'A customer'} requested ${req.product_name}${req.profiles?.phone ? ` • ${req.profiles.phone}` : ''}${req.profiles?.email ? ` • ${req.profiles.email}` : ''}`,
          time: timeAgo,
          created_at: req.created_at
        };
      } else {
        return {
          id: req.id,
          title: `Request ${req.status}`,
          description: `Your request for ${req.product_name}`,
          time: timeAgo,
          created_at: req.created_at
        };
      }
    });

    setNotifications(formattedNotifications);
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return { notifications };
};
