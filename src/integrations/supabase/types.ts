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
      customer_bills: {
        Row: {
          amount_bdt: number
          billing_month: string
          consumption_kwh: number
          created_at: string | null
          customer_id: string
          due_date: string
          id: string
          paid: boolean | null
          paid_at: string | null
        }
        Insert: {
          amount_bdt: number
          billing_month: string
          consumption_kwh: number
          created_at?: string | null
          customer_id: string
          due_date: string
          id?: string
          paid?: boolean | null
          paid_at?: string | null
        }
        Update: {
          amount_bdt?: number
          billing_month?: string
          consumption_kwh?: number
          created_at?: string | null
          customer_id?: string
          due_date?: string
          id?: string
          paid?: boolean | null
          paid_at?: string | null
        }
        Relationships: []
      }
      distribution_data: {
        Row: {
          created_at: string | null
          customers_affected: number | null
          feeder_name: string
          id: string
          load_mw: number
          outage_duration_minutes: number | null
          recorded_by: string | null
          region: string | null
          status: string | null
          timestamp: string | null
          voltage_kv: number | null
        }
        Insert: {
          created_at?: string | null
          customers_affected?: number | null
          feeder_name: string
          id?: string
          load_mw: number
          outage_duration_minutes?: number | null
          recorded_by?: string | null
          region?: string | null
          status?: string | null
          timestamp?: string | null
          voltage_kv?: number | null
        }
        Update: {
          created_at?: string | null
          customers_affected?: number | null
          feeder_name?: string
          id?: string
          load_mw?: number
          outage_duration_minutes?: number | null
          recorded_by?: string | null
          region?: string | null
          status?: string | null
          timestamp?: string | null
          voltage_kv?: number | null
        }
        Relationships: []
      }
      generation_data: {
        Row: {
          created_at: string | null
          efficiency_percent: number | null
          fuel_consumption: number | null
          id: string
          output_mw: number
          plant_id: string | null
          recorded_by: string | null
          status: string | null
          timestamp: string | null
        }
        Insert: {
          created_at?: string | null
          efficiency_percent?: number | null
          fuel_consumption?: number | null
          id?: string
          output_mw: number
          plant_id?: string | null
          recorded_by?: string | null
          status?: string | null
          timestamp?: string | null
        }
        Update: {
          created_at?: string | null
          efficiency_percent?: number | null
          fuel_consumption?: number | null
          id?: string
          output_mw?: number
          plant_id?: string | null
          recorded_by?: string | null
          status?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generation_data_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "power_plants"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string
          id: string
          incident_type: string
          location: string | null
          reported_by: string
          resolved_at: string | null
          severity: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description: string
          id?: string
          incident_type: string
          location?: string | null
          reported_by: string
          resolved_at?: string | null
          severity: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string
          id?: string
          incident_type?: string
          location?: string | null
          reported_by?: string
          resolved_at?: string | null
          severity?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      power_plants: {
        Row: {
          capacity_mw: number
          created_at: string | null
          fuel_type: string | null
          id: string
          is_active: boolean | null
          location: string | null
          name: string
        }
        Insert: {
          capacity_mw: number
          created_at?: string | null
          fuel_type?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name: string
        }
        Update: {
          capacity_mw?: number
          created_at?: string | null
          fuel_type?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: Database["public"]["Enums"]["department"]
          email: string
          employee_id: string | null
          facility_id: string | null
          facility_type: string | null
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
          facility_id?: string | null
          facility_type?: string | null
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
          facility_id?: string | null
          facility_type?: string | null
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
      service_requests: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          customer_id: string
          description: string | null
          id: string
          priority: string | null
          request_type: string
          resolved_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          customer_id: string
          description?: string | null
          id?: string
          priority?: string | null
          request_type: string
          resolved_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          customer_id?: string
          description?: string | null
          id?: string
          priority?: string | null
          request_type?: string
          resolved_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      substations: {
        Row: {
          capacity_mva: number
          created_at: string | null
          id: string
          is_active: boolean | null
          location: string | null
          name: string
          voltage_level: string | null
        }
        Insert: {
          capacity_mva: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name: string
          voltage_level?: string | null
        }
        Update: {
          capacity_mva?: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name?: string
          voltage_level?: string | null
        }
        Relationships: []
      }
      transmission_data: {
        Row: {
          created_at: string | null
          frequency_hz: number | null
          id: string
          load_mw: number
          losses_percent: number | null
          recorded_by: string | null
          status: string | null
          substation_id: string | null
          timestamp: string | null
          voltage_kv: number | null
        }
        Insert: {
          created_at?: string | null
          frequency_hz?: number | null
          id?: string
          load_mw: number
          losses_percent?: number | null
          recorded_by?: string | null
          status?: string | null
          substation_id?: string | null
          timestamp?: string | null
          voltage_kv?: number | null
        }
        Update: {
          created_at?: string | null
          frequency_hz?: number | null
          id?: string
          load_mw?: number
          losses_percent?: number | null
          recorded_by?: string | null
          status?: string | null
          substation_id?: string | null
          timestamp?: string | null
          voltage_kv?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transmission_data_substation_id_fkey"
            columns: ["substation_id"]
            isOneToOne: false
            referencedRelation: "substations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
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
        | "Customer"
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
      app_role: [
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
        "Customer",
      ],
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
