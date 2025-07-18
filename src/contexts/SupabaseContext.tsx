import React, { createContext, useContext } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabase as defaultSupabase } from '@/integrations/supabase/client';

interface SupabaseContextType {
  supabase: SupabaseClient;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

interface SupabaseProviderProps {
  children: React.ReactNode;
  supabaseUrl: string;
  supabaseKey: string;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ 
  children,
  supabaseUrl,
  supabaseKey
}) => {
  let supabase: SupabaseClient;
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  } else {
    // Fallback to the pre-configured client used across the codebase
    supabase = defaultSupabase;
  }

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}; 