
import { supabase } from '@/integrations/supabase/client';

export const checkAdminAccess = async (userId: string): Promise<boolean> => {
  try {
    const { data: result, error } = await supabase.rpc('is_admin');
    
    if (error) {
      console.error('Error checking admin access:', error);
      return false;
    }
    
    return result === true;
  } catch (error) {
    console.error('Error in checkAdminAccess:', error);
    return false;
  }
};

export const getAllUsers = async () => {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    
    // Normalize the data to match the expected format
    const normalizedProfiles = profiles?.map(profile => ({
      ...profile,
      status: profile.status || 'active' // Ensure status has a default value
    })) || [];
    
    return normalizedProfiles;
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    return [];
  }
};

export const updateUserRole = async (userId: string, role: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: role.toLowerCase() })
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user role:', error);
      return false;
    }

    // Log the admin action
    await logAdminAction('update_user_role', 'user', userId, null, { role: role.toLowerCase() });
    
    return true;
  } catch (error) {
    console.error('Error in updateUserRole:', error);
    return false;
  }
};

export const updateUserStatus = async (userId: string, status: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ status: status.toLowerCase() })
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user status:', error);
      return false;
    }

    // Log the admin action
    await logAdminAction('update_user_status', 'user', userId, null, { status: status.toLowerCase() });
    
    return true;
  } catch (error) {
    console.error('Error in updateUserStatus:', error);
    return false;
  }
};

export const getAllOrders = async () => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:customer_id(name, email),
        rider:rider_id(name, email),
        vendor:vendor_id(name, email),
        order_items(*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    
    // Normalize the data to ensure it matches the expected format
    const normalizedOrders = orders?.map(order => ({
      ...order,
      // Ensure all required fields have default values
      payment_status: order.payment_status || 'pending',
      delivery_type: order.delivery_type || 'standard',
      status: order.status || 'pending'
    })) || [];
    
    return normalizedOrders;
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    return [];
  }
};

export const getOrdersByStatus = async (status: string) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:customer_id(name, email),
        rider:rider_id(name, email),
        vendor:vendor_id(name, email),
        order_items(*)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders by status:', error);
      return [];
    }
    
    return orders || [];
  } catch (error) {
    console.error('Error in getOrdersByStatus:', error);
    return [];
  }
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<boolean> => {
  try {
    const { data: oldOrder } = await supabase
      .from('orders')
      .select('status')
      .eq('id', orderId)
      .single();

    const updateData: any = { 
      status,
      updated_at: new Date().toISOString()
    };

    // Add timestamp fields based on status
    if (status === 'delivered') {
      updateData.delivered_at = new Date().toISOString();
    } else if (status === 'cancelled') {
      updateData.cancelled_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId);
    
    if (error) {
      console.error('Error updating order status:', error);
      return false;
    }

    // Log the admin action
    await logAdminAction('update_order_status', 'order', orderId, 
      { status: oldOrder?.status }, 
      { status }
    );
    
    return true;
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    return false;
  }
};

export const getSystemStats = async () => {
  try {
    // Get user counts by role
    const { data: userStats, error: userError } = await supabase
      .from('profiles')
      .select('role, status')
      .neq('role', null);

    if (userError) {
      console.error('Error fetching user stats:', userError);
    }

    // Get order counts by status
    const { data: orderStats, error: orderError } = await supabase
      .from('orders')
      .select('status, total_amount, created_at')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (orderError) {
      console.error('Error fetching order stats:', orderError);
    }

    // Process stats
    const users = userStats || [];
    const orders = orderStats || [];

    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      admins: users.filter(u => u.role === 'admin').length,
      vendors: users.filter(u => u.role === 'vendor').length,
      riders: users.filter(u => u.role === 'rider').length,
      customers: users.filter(u => u.role === 'customer').length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      deliveredOrders: orders.filter(o => o.status === 'delivered').length,
      totalRevenue: orders.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0),
      monthlyRevenue: orders
        .filter(o => new Date(o.created_at) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
        .reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0)
    };

    return stats;
  } catch (error) {
    console.error('Error in getSystemStats:', error);
    return {
      totalUsers: 0,
      activeUsers: 0,
      admins: 0,
      vendors: 0,
      riders: 0,
      customers: 0,
      totalOrders: 0,
      pendingOrders: 0,
      deliveredOrders: 0,
      totalRevenue: 0,
      monthlyRevenue: 0
    };
  }
};

export const logAdminAction = async (
  action: string,
  targetType: string,
  targetId?: string,
  oldValues?: any,
  newValues?: any
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    const { error } = await supabase
      .from('audit_logs')
      .insert({
        admin_id: user.id,
        action,
        target_type: targetType,
        target_id: targetId,
        old_values: oldValues,
        new_values: newValues
      });

    if (error) {
      console.error('Error logging admin action:', error);
    }
  } catch (error) {
    console.error('Error in logAdminAction:', error);
  }
};

export const getAuditLogs = async (limit: number = 50) => {
  try {
    const { data: logs, error } = await supabase
      .from('audit_logs')
      .select(`
        *,
        admin:admin_id(name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }
    
    return logs || [];
  } catch (error) {
    console.error('Error in getAuditLogs:', error);
    return [];
  }
};

export const createNotification = async (
  userId: string | null,
  type: string,
  title: string,
  message: string,
  priority: string = 'normal',
  metadata: any = {}
) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
        priority,
        metadata
      });

    if (error) {
      console.error('Error creating notification:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in createNotification:', error);
    return false;
  }
};
