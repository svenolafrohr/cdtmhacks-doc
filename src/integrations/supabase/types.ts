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
      chat_interactions: {
        Row: {
          created_at: string
          id: number
          interaction_message: string | null
          interaction_role: string | null
          interaction_type: string | null
          patient_record: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          interaction_message?: string | null
          interaction_role?: string | null
          interaction_type?: string | null
          patient_record?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          interaction_message?: string | null
          interaction_role?: string | null
          interaction_type?: string | null
          patient_record?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_interactions_patient_record_fkey"
            columns: ["patient_record"]
            isOneToOne: false
            referencedRelation: "patient_record"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          id: string
          patient_record: string
          summary: string | null
          type: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          patient_record: string
          summary?: string | null
          type?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          patient_record?: string
          summary?: string | null
          type?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_patient_record_fkey"
            columns: ["patient_record"]
            isOneToOne: false
            referencedRelation: "patient_record"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_record: {
        Row: {
          address: Json | null
          allergies: Json | null
          assessment: Json | null
          created_at: string
          diagnoses: Json | null
          dob: string | null
          encounter: Json | null
          family_history: Json | null
          first_name: string | null
          id: string
          immunizations: Json | null
          insurance: Json | null
          labs: Json | null
          last_name: string | null
          medications: Json | null
          observations: Json | null
          open_questions: Json | null
          other_insurance_card_data: Json | null
          patient_id: number
          plan: Json | null
          practitioners: Json | null
          prior_med_history: Json | null
          program_eligibility: Json | null
          review_of_systems: Json | null
          screenings: Json | null
          social_history: Json | null
          vital_signs: Json | null
          wearable_observations: Json | null
        }
        Insert: {
          address?: Json | null
          allergies?: Json | null
          assessment?: Json | null
          created_at?: string
          diagnoses?: Json | null
          dob?: string | null
          encounter?: Json | null
          family_history?: Json | null
          first_name?: string | null
          id?: string
          immunizations?: Json | null
          insurance?: Json | null
          labs?: Json | null
          last_name?: string | null
          medications?: Json | null
          observations?: Json | null
          open_questions?: Json | null
          other_insurance_card_data?: Json | null
          patient_id: number
          plan?: Json | null
          practitioners?: Json | null
          prior_med_history?: Json | null
          program_eligibility?: Json | null
          review_of_systems?: Json | null
          screenings?: Json | null
          social_history?: Json | null
          vital_signs?: Json | null
          wearable_observations?: Json | null
        }
        Update: {
          address?: Json | null
          allergies?: Json | null
          assessment?: Json | null
          created_at?: string
          diagnoses?: Json | null
          dob?: string | null
          encounter?: Json | null
          family_history?: Json | null
          first_name?: string | null
          id?: string
          immunizations?: Json | null
          insurance?: Json | null
          labs?: Json | null
          last_name?: string | null
          medications?: Json | null
          observations?: Json | null
          open_questions?: Json | null
          other_insurance_card_data?: Json | null
          patient_id?: number
          plan?: Json | null
          practitioners?: Json | null
          prior_med_history?: Json | null
          program_eligibility?: Json | null
          review_of_systems?: Json | null
          screenings?: Json | null
          social_history?: Json | null
          vital_signs?: Json | null
          wearable_observations?: Json | null
        }
        Relationships: []
      }
      test_table_fk: {
        Row: {
          created_at: string
          file_content: Json | null
          file_name: string | null
          file_type: string | null
          id: number
          text_field_custom: string | null
        }
        Insert: {
          created_at?: string
          file_content?: Json | null
          file_name?: string | null
          file_type?: string | null
          id?: number
          text_field_custom?: string | null
        }
        Update: {
          created_at?: string
          file_content?: Json | null
          file_name?: string | null
          file_type?: string | null
          id?: number
          text_field_custom?: string | null
        }
        Relationships: []
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
    Enums: {},
  },
} as const
