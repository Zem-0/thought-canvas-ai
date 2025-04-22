
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// In Vite, we use import.meta.env instead of process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the required environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Use demo values for development if environment variables are not set
// This prevents the app from crashing during development
const finalSupabaseUrl = supabaseUrl || 'https://xyzcompany.supabase.co';  
const finalSupabaseKey = supabaseAnonKey || 'some-placeholder-anon-key';

export const supabase = createClient<Database>(finalSupabaseUrl, finalSupabaseKey);

export type Note = {
  id: string;
  title: string;
  content: string;
  summary?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  color?: string;
};

export type { Database };
