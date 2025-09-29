export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: Database["public"]["Enums"]["department"]
          email: string
          employee_id: string | null
          full_name: string
          hierarchy_level: number
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department: Database["public"]["Enums"]["department"]
          email: string
          employee_id?: string | null
          full_name: string
          hierarchy_level: number
          id: string
          is_active?: boolean | null
          phone?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: Database["public"]["Enums"]["department"]
          email?: string
          employee_id?: string | null
          full_name?: string
          hierarchy_level?: number
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
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
      department:
        | "GENERATION"
        | "TRANSMISSION"
        | "DISTRIBUTION"
        | "FINANCE & ACCOUNTS"
        | "HUMAN RESOURCES"
        | "PLANNING & DEVELOPMENT"
        | "MAINTENANCE & ENGINEERING"
        | "OPERATIONS & CONTROL"
        | "INFORMATION TECHNOLOGY"
        | "AUDIT & INSPECTION"
        | "PROCUREMENT & LOGISTICS"
        | "SAFETY & ENVIRONMENT"
        | "LEGAL & REGULATORY"
        | "CORPORATE AFFAIRS"
        | "TRAINING & DEVELOPMENT"
        | "QUALITY ASSURANCE"
        | "PROJECT MANAGEMENT"
        | "RESEARCH & DEVELOPMENT"
        | "CUSTOMER SERVICES"
        | "SECURITY SERVICES"
        | "TRANSPORT & VEHICLE"
        | "STORE & INVENTORY"
        | "CONSTRUCTION & CIVIL"
        | "ELECTRICAL MAINTENANCE"
        | "MECHANICAL MAINTENANCE"
        | "INSTRUMENTATION & CONTROL"
        | "COMMUNICATION & TELECOM"
        | "COAL HANDLING"
        | "WATER TREATMENT"
        | "LABORATORY SERVICES"
        | "GENERAL ADMINISTRATION"
      user_role:
        | "Chairman"
        | "Managing Director"
        | "Director (Generation)"
        | "Director (Transmission)"
        | "Director (Distribution)"
        | "Director (Finance)"
        | "Director (HR)"
        | "Director (Planning)"
        | "GM Generation"
        | "GM Transmission"
        | "GM Distribution"
        | "GM Finance"
        | "GM HR"
        | "GM Planning"
        | "GM Operations"
        | "GM Maintenance"
        | "GM IT"
        | "GM Audit"
        | "DGM Generation"
        | "DGM Transmission"
        | "DGM Distribution"
        | "DGM Finance"
        | "DGM HR"
        | "DGM Planning"
        | "DGM Operations"
        | "DGM Maintenance"
        | "DGM IT"
        | "AGM Generation"
        | "AGM Transmission"
        | "AGM Distribution"
        | "AGM Finance"
        | "Chief Engineer"
        | "Senior Engineer (Electrical)"
        | "Senior Engineer (Mechanical)"
        | "Senior Engineer (Civil)"
        | "Senior Engineer (Control & Instrumentation)"
        | "Engineer (Electrical)"
        | "Engineer (Mechanical)"
        | "Engineer (Civil)"
        | "Engineer (Control & Instrumentation)"
        | "Engineer (Electronics)"
        | "Assistant Engineer (Electrical)"
        | "Assistant Engineer (Mechanical)"
        | "Plant Operator"
        | "Senior Plant Operator"
        | "Control Room Operator"
        | "Substation Operator"
        | "Senior Technician"
        | "Technician (Electrical)"
        | "Technician (Mechanical)"
        | "System Analyst"
        | "Financial Officer"
        | "HR Officer"
        | "Planning Officer"
        | "Operations Officer"
        | "Maintenance Officer"
        | "Safety Officer"
        | "Security Officer"
        | "Administrative Assistant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      department: [
        "GENERATION",
        "TRANSMISSION",
        "DISTRIBUTION",
        "FINANCE & ACCOUNTS",
        "HUMAN RESOURCES",
        "PLANNING & DEVELOPMENT",
        "MAINTENANCE & ENGINEERING",
        "OPERATIONS & CONTROL",
        "INFORMATION TECHNOLOGY",
        "AUDIT & INSPECTION",
        "PROCUREMENT & LOGISTICS",
        "SAFETY & ENVIRONMENT",
        "LEGAL & REGULATORY",
        "CORPORATE AFFAIRS",
        "TRAINING & DEVELOPMENT",
        "QUALITY ASSURANCE",
        "PROJECT MANAGEMENT",
        "RESEARCH & DEVELOPMENT",
        "CUSTOMER SERVICES",
        "SECURITY SERVICES",
        "TRANSPORT & VEHICLE",
        "STORE & INVENTORY",
        "CONSTRUCTION & CIVIL",
        "ELECTRICAL MAINTENANCE",
        "MECHANICAL MAINTENANCE",
        "INSTRUMENTATION & CONTROL",
        "COMMUNICATION & TELECOM",
        "COAL HANDLING",
        "WATER TREATMENT",
        "LABORATORY SERVICES",
        "GENERAL ADMINISTRATION",
      ],
      user_role: [
        "Chairman",
        "Managing Director",
        "Director (Generation)",
        "Director (Transmission)",
        "Director (Distribution)",
        "Director (Finance)",
        "Director (HR)",
        "Director (Planning)",
        "GM Generation",
        "GM Transmission",
        "GM Distribution",
        "GM Finance",
        "GM HR",
        "GM Planning",
        "GM Operations",
        "GM Maintenance",
        "GM IT",
        "GM Audit",
        "DGM Generation",
        "DGM Transmission",
        "DGM Distribution",
        "DGM Finance",
        "DGM HR",
        "DGM Planning",
        "DGM Operations",
        "DGM Maintenance",
        "DGM IT",
        "AGM Generation",
        "AGM Transmission",
        "AGM Distribution",
        "AGM Finance",
        "Chief Engineer",
        "Senior Engineer (Electrical)",
        "Senior Engineer (Mechanical)",
        "Senior Engineer (Civil)",
        "Senior Engineer (Control & Instrumentation)",
        "Engineer (Electrical)",
        "Engineer (Mechanical)",
        "Engineer (Civil)",
        "Engineer (Control & Instrumentation)",
        "Engineer (Electronics)",
        "Assistant Engineer (Electrical)",
        "Assistant Engineer (Mechanical)",
        "Plant Operator",
        "Senior Plant Operator",
        "Control Room Operator",
        "Substation Operator",
        "Senior Technician",
        "Technician (Electrical)",
        "Technician (Mechanical)",
        "System Analyst",
        "Financial Officer",
        "HR Officer",
        "Planning Officer",
        "Operations Officer",
        "Maintenance Officer",
        "Safety Officer",
        "Security Officer",
        "Administrative Assistant",
      ],
    },
  },
} as const
