
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: string
          title: string
          content: string
          summary: string | null
          created_at: string
          updated_at: string
          user_id: string
          color: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          summary?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
          color?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          summary?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
          color?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
        }
      }
    }
  }
}
