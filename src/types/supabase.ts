
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
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          role: 'customer' | 'rider' | 'vendor' | 'admin'
          avatar: string | null
          verified: boolean
          mfa_enabled: boolean | null
          last_active: string | null
          carbon_credits: number | null
          created_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role: 'customer' | 'rider' | 'vendor' | 'admin'
          avatar?: string | null
          verified?: boolean
          mfa_enabled?: boolean | null
          last_active?: string | null
          carbon_credits?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'customer' | 'rider' | 'vendor' | 'admin'
          avatar?: string | null
          verified?: boolean
          mfa_enabled?: boolean | null
          last_active?: string | null
          carbon_credits?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
