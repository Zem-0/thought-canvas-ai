
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Not using actual values since we'll need to connect to Supabase
// These would normally come from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

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
