import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// In Vite, we use import.meta.env instead of process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ljxbyqjbdwlybibrodii.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeGJ5cWpiZHdseWJpYnJvZGlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTIzNDMxMiwiZXhwIjoyMDYwODEwMzEyfQ.67CweLZ9vEynE-ThZDOYOnZ6heMIdxysl6tQl01raes';

// Check if the required environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

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
