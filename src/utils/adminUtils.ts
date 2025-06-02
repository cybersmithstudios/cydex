
import { supabase } from '@/integrations/supabase/client';

export const checkAdminAccess = async (userId: string): Promise<boolean> => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error checking admin access:', error);
      return false;
    }
    
    return profile?.role?.toUpperCase() === 'ADMIN';
  } catch (error) {
    console.error('Error in checkAdminAccess:', error);
    return false;
  }
};

export const promoteUserToAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'ADMIN' })
      .eq('id', userId);
    
    if (error) {
      console.error('Error promoting user to admin:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in promoteUserToAdmin:', error);
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
    
    return profiles || [];
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    return [];
  }
};

export const updateUserRole = async (userId: string, role: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: role.toUpperCase() })
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user role:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateUserRole:', error);
    return false;
  }
};
