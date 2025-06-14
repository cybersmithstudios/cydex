export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          target_id: string | null
          target_type: string
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          target_id?: string | null
          target_type: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          target_id?: string | null
          target_type?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_activity: {
        Row: {
          activity_description: string
          activity_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          activity_description: string
          activity_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          activity_description?: string
          activity_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_preferences: {
        Row: {
          created_at: string | null
          delivery_preferences: Json | null
          id: string
          notification_preferences: Json | null
          privacy_settings: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          delivery_preferences?: Json | null
          id?: string
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          delivery_preferences?: Json | null
          id?: string
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      deliveries: {
        Row: {
          accepted_at: string | null
          actual_distance: number | null
          cancelled_at: string | null
          carbon_saved: number | null
          created_at: string | null
          delivered_at: string | null
          delivery_fee: number | null
          delivery_location: Json | null
          eco_bonus: number | null
          estimated_delivery_time: string | null
          estimated_pickup_time: string | null
          id: string
          order_id: string | null
          picked_up_at: string | null
          pickup_location: Json | null
          rider_id: string | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["delivery_status"] | null
          tip_amount: number | null
          updated_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          actual_distance?: number | null
          cancelled_at?: string | null
          carbon_saved?: number | null
          created_at?: string | null
          delivered_at?: string | null
          delivery_fee?: number | null
          delivery_location?: Json | null
          eco_bonus?: number | null
          estimated_delivery_time?: string | null
          estimated_pickup_time?: string | null
          id?: string
          order_id?: string | null
          picked_up_at?: string | null
          pickup_location?: Json | null
          rider_id?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["delivery_status"] | null
          tip_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          actual_distance?: number | null
          cancelled_at?: string | null
          carbon_saved?: number | null
          created_at?: string | null
          delivered_at?: string | null
          delivery_fee?: number | null
          delivery_location?: Json | null
          eco_bonus?: number | null
          estimated_delivery_time?: string | null
          estimated_pickup_time?: string | null
          id?: string
          order_id?: string | null
          picked_up_at?: string | null
          pickup_location?: Json | null
          rider_id?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["delivery_status"] | null
          tip_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          priority: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          priority?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          priority?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          carbon_impact: number | null
          created_at: string
          id: string
          is_eco_friendly: boolean | null
          order_id: string
          product_category: string | null
          product_description: string | null
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          carbon_impact?: number | null
          created_at?: string
          id?: string
          is_eco_friendly?: boolean | null
          order_id: string
          product_category?: string | null
          product_description?: string | null
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          carbon_impact?: number | null
          created_at?: string
          id?: string
          is_eco_friendly?: boolean | null
          order_id?: string
          product_category?: string | null
          product_description?: string | null
          product_name?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cancel_reason: string | null
          cancelled_at: string | null
          carbon_credits_earned: number | null
          created_at: string
          customer_id: string
          delivered_at: string | null
          delivery_address: Json
          delivery_fee: number | null
          delivery_type: string
          estimated_delivery_time: string | null
          id: string
          order_number: string
          payment_method: string | null
          payment_status: string
          rider_id: string | null
          special_instructions: string | null
          status: string
          subtotal: number
          time_slot: string | null
          total_amount: number
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          cancel_reason?: string | null
          cancelled_at?: string | null
          carbon_credits_earned?: number | null
          created_at?: string
          customer_id: string
          delivered_at?: string | null
          delivery_address: Json
          delivery_fee?: number | null
          delivery_type?: string
          estimated_delivery_time?: string | null
          id?: string
          order_number: string
          payment_method?: string | null
          payment_status?: string
          rider_id?: string | null
          special_instructions?: string | null
          status?: string
          subtotal: number
          time_slot?: string | null
          total_amount: number
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          cancel_reason?: string | null
          cancelled_at?: string | null
          carbon_credits_earned?: number | null
          created_at?: string
          customer_id?: string
          delivered_at?: string | null
          delivery_address?: Json
          delivery_fee?: number | null
          delivery_type?: string
          estimated_delivery_time?: string | null
          id?: string
          order_number?: string
          payment_method?: string | null
          payment_status?: string
          rider_id?: string | null
          special_instructions?: string | null
          status?: string
          subtotal?: number
          time_slot?: string | null
          total_amount?: number
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          carbon_impact: number | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_eco_friendly: boolean | null
          name: string
          price: number
          status: string | null
          stock_quantity: number | null
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          carbon_impact?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_eco_friendly?: boolean | null
          name: string
          price: number
          status?: string | null
          stock_quantity?: number | null
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          carbon_impact?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_eco_friendly?: boolean | null
          name?: string
          price?: number
          status?: string | null
          stock_quantity?: number | null
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: Json | null
          avatar: string | null
          carbon_credits: number | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          email_verified_at: string | null
          gender: string | null
          id: string
          last_active: string | null
          last_login_at: string | null
          login_count: number | null
          mfa_enabled: boolean | null
          name: string
          phone: string | null
          role: string
          status: string | null
          verified: boolean | null
        }
        Insert: {
          address?: Json | null
          avatar?: string | null
          carbon_credits?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          email_verified_at?: string | null
          gender?: string | null
          id: string
          last_active?: string | null
          last_login_at?: string | null
          login_count?: number | null
          mfa_enabled?: boolean | null
          name: string
          phone?: string | null
          role: string
          status?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: Json | null
          avatar?: string | null
          carbon_credits?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          email_verified_at?: string | null
          gender?: string | null
          id?: string
          last_active?: string | null
          last_login_at?: string | null
          login_count?: number | null
          mfa_enabled?: boolean | null
          name?: string
          phone?: string | null
          role?: string
          status?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      rider_achievements: {
        Row: {
          achievement_type: string
          created_at: string | null
          description: string | null
          earned_date: string | null
          icon: string | null
          id: string
          progress: number | null
          rider_id: string | null
          target: number | null
          title: string
        }
        Insert: {
          achievement_type: string
          created_at?: string | null
          description?: string | null
          earned_date?: string | null
          icon?: string | null
          id?: string
          progress?: number | null
          rider_id?: string | null
          target?: number | null
          title: string
        }
        Update: {
          achievement_type?: string
          created_at?: string | null
          description?: string | null
          earned_date?: string | null
          icon?: string | null
          id?: string
          progress?: number | null
          rider_id?: string | null
          target?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "rider_achievements_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rider_bank_details: {
        Row: {
          account_name: string
          account_number: string
          bank_name: string
          bvn: string | null
          created_at: string | null
          id: string
          is_default: boolean | null
          is_verified: boolean | null
          rider_id: string | null
          updated_at: string | null
        }
        Insert: {
          account_name: string
          account_number: string
          bank_name: string
          bvn?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          is_verified?: boolean | null
          rider_id?: string | null
          updated_at?: string | null
        }
        Update: {
          account_name?: string
          account_number?: string
          bank_name?: string
          bvn?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          is_verified?: boolean | null
          rider_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rider_bank_details_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rider_earnings: {
        Row: {
          carbon_credits_earned: number | null
          created_at: string | null
          delivery_fee: number | null
          delivery_id: string | null
          earnings_date: string | null
          eco_bonus: number | null
          id: string
          rider_id: string | null
          tip_amount: number | null
          total_earnings: number | null
        }
        Insert: {
          carbon_credits_earned?: number | null
          created_at?: string | null
          delivery_fee?: number | null
          delivery_id?: string | null
          earnings_date?: string | null
          eco_bonus?: number | null
          id?: string
          rider_id?: string | null
          tip_amount?: number | null
          total_earnings?: number | null
        }
        Update: {
          carbon_credits_earned?: number | null
          created_at?: string | null
          delivery_fee?: number | null
          delivery_id?: string | null
          earnings_date?: string | null
          eco_bonus?: number | null
          id?: string
          rider_id?: string | null
          tip_amount?: number | null
          total_earnings?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rider_earnings_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_earnings_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rider_profiles: {
        Row: {
          bank_details: Json | null
          created_at: string | null
          current_location: Json | null
          delivery_preferences: Json | null
          id: string
          is_verified: boolean | null
          license_number: string | null
          notification_preferences: Json | null
          rating: number | null
          rider_status: Database["public"]["Enums"]["rider_status"] | null
          total_deliveries: number | null
          updated_at: string | null
          vehicle_registration: string | null
          vehicle_type: string | null
          verification_documents: Json | null
          verification_status: string | null
        }
        Insert: {
          bank_details?: Json | null
          created_at?: string | null
          current_location?: Json | null
          delivery_preferences?: Json | null
          id: string
          is_verified?: boolean | null
          license_number?: string | null
          notification_preferences?: Json | null
          rating?: number | null
          rider_status?: Database["public"]["Enums"]["rider_status"] | null
          total_deliveries?: number | null
          updated_at?: string | null
          vehicle_registration?: string | null
          vehicle_type?: string | null
          verification_documents?: Json | null
          verification_status?: string | null
        }
        Update: {
          bank_details?: Json | null
          created_at?: string | null
          current_location?: Json | null
          delivery_preferences?: Json | null
          id?: string
          is_verified?: boolean | null
          license_number?: string | null
          notification_preferences?: Json | null
          rating?: number | null
          rider_status?: Database["public"]["Enums"]["rider_status"] | null
          total_deliveries?: number | null
          updated_at?: string | null
          vehicle_registration?: string | null
          vehicle_type?: string | null
          verification_documents?: Json | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rider_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rider_reviews: {
        Row: {
          comment: string | null
          communication_rating: number | null
          created_at: string | null
          customer_id: string | null
          delivery_rating: number | null
          id: string
          order_id: string | null
          rating: number
          rider_id: string | null
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          communication_rating?: number | null
          created_at?: string | null
          customer_id?: string | null
          delivery_rating?: number | null
          id?: string
          order_id?: string | null
          rating: number
          rider_id?: string | null
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          communication_rating?: number | null
          created_at?: string | null
          customer_id?: string | null
          delivery_rating?: number | null
          id?: string
          order_id?: string | null
          rating?: number
          rider_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rider_reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_reviews_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rider_schedules: {
        Row: {
          created_at: string | null
          end_time: string
          id: string
          is_available: boolean | null
          rider_id: string | null
          schedule_date: string
          start_time: string
          total_deliveries: number | null
          total_earnings: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_time: string
          id?: string
          is_available?: boolean | null
          rider_id?: string | null
          schedule_date: string
          start_time: string
          total_deliveries?: number | null
          total_earnings?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string
          id?: string
          is_available?: boolean | null
          rider_id?: string | null
          schedule_date?: string
          start_time?: string
          total_deliveries?: number | null
          total_earnings?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rider_schedules_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_ratings: {
        Row: {
          created_at: string | null
          customer_id: string
          delivery_rating: number | null
          feedback: string | null
          id: string
          order_id: string
          product_quality_rating: number | null
          rating: number
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          delivery_rating?: number | null
          feedback?: string | null
          id?: string
          order_id: string
          product_quality_rating?: number | null
          rating: number
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          delivery_rating?: number | null
          feedback?: string | null
          id?: string
          order_id?: string
          product_quality_rating?: number | null
          rating?: number
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_ratings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_ratings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_ratings_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_stats: {
        Row: {
          id: string
          rating: number | null
          recycling_rate: number | null
          total_carbon_saved: number | null
          total_orders: number | null
          total_revenue: number | null
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          id?: string
          rating?: number | null
          recycling_rate?: number | null
          total_carbon_saved?: number | null
          total_orders?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          id?: string
          rating?: number | null
          recycling_rate?: number | null
          total_carbon_saved?: number | null
          total_orders?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_stats_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_rider_rating: {
        Args: { rider_uuid: string }
        Returns: {
          average_rating: number
          total_reviews: number
        }[]
      }
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_vendor_average_rating: {
        Args: { vendor_uuid: string }
        Returns: {
          average_rating: number
          total_ratings: number
          average_delivery_rating: number
          average_product_quality_rating: number
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      delivery_status:
        | "available"
        | "accepted"
        | "picking_up"
        | "picked_up"
        | "delivering"
        | "delivered"
        | "cancelled"
      rider_status: "offline" | "available" | "busy" | "break"
      vehicle_type_enum: "walking" | "bicycle" | "motorcycle" | "car" | "van"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      delivery_status: [
        "available",
        "accepted",
        "picking_up",
        "picked_up",
        "delivering",
        "delivered",
        "cancelled",
      ],
      rider_status: ["offline", "available", "busy", "break"],
      vehicle_type_enum: ["walking", "bicycle", "motorcycle", "car", "van"],
    },
  },
} as const
