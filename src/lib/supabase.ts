
import { createClient } from '@supabase/supabase-js';
import { type Database } from '@/types/supabase';

// Initialize the Supabase client
const supabaseUrl = 'https://szdfivpxenexorutudwj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZGZpdnB4ZW5leG9ydXR1ZHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzODg1NDMsImV4cCI6MjA1Njk2NDU0M30.mb021u9hZ7lZBI81CycLFWK2WrvpaRjDwK23uKYFBVU';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
