import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

export interface OrderNotification {
  id: string;
  order_id: string;
  recipient_id: string;
  recipient_type: 'customer' | 'vendor' | 'rider';
  notification_type: string;
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
}

export const useOrderNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<OrderNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('order_notifications')
        .select('*')
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setNotifications((data || []) as OrderNotification[]);
      setUnreadCount(data?.filter(n => !n.read_at).length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('order_notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', notificationId)
        .eq('recipient_id', user?.id);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId 
            ? { ...n, read_at: new Date().toISOString() }
            : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('order_notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('recipient_id', user?.id)
        .is('read_at', null);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => ({ ...n, read_at: n.read_at || new Date().toISOString() }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('order_notifications_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'order_notifications',
          filter: `recipient_id=eq.${user.id}`
        },
        (payload) => {
          const newNotification = payload.new as OrderNotification;
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          // Show toast notification
          toast.success(newNotification.title, {
            description: newNotification.message,
            duration: 5000,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications
  };
};