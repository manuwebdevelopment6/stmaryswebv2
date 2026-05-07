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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          applicant_dob: string | null
          applicant_first_name: string | null
          applicant_gender: string | null
          applicant_last_name: string | null
          applicant_nationality: string | null
          boarding_preference: string | null
          created_at: string
          current_step: number
          document_paths: Json | null
          guardian_address: string | null
          guardian_email: string | null
          guardian_full_name: string | null
          guardian_id_number: string | null
          guardian_phone: string | null
          guardian_relationship: string | null
          id: string
          intended_form: string | null
          kcpe_index_no: string | null
          kcpe_marks: number | null
          kcpe_year: number | null
          notes: string | null
          previous_school: string | null
          status: Database["public"]["Enums"]["application_status"]
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          applicant_dob?: string | null
          applicant_first_name?: string | null
          applicant_gender?: string | null
          applicant_last_name?: string | null
          applicant_nationality?: string | null
          boarding_preference?: string | null
          created_at?: string
          current_step?: number
          document_paths?: Json | null
          guardian_address?: string | null
          guardian_email?: string | null
          guardian_full_name?: string | null
          guardian_id_number?: string | null
          guardian_phone?: string | null
          guardian_relationship?: string | null
          id?: string
          intended_form?: string | null
          kcpe_index_no?: string | null
          kcpe_marks?: number | null
          kcpe_year?: number | null
          notes?: string | null
          previous_school?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          applicant_dob?: string | null
          applicant_first_name?: string | null
          applicant_gender?: string | null
          applicant_last_name?: string | null
          applicant_nationality?: string | null
          boarding_preference?: string | null
          created_at?: string
          current_step?: number
          document_paths?: Json | null
          guardian_address?: string | null
          guardian_email?: string | null
          guardian_full_name?: string | null
          guardian_id_number?: string | null
          guardian_phone?: string | null
          guardian_relationship?: string | null
          id?: string
          intended_form?: string | null
          kcpe_index_no?: string | null
          kcpe_marks?: number | null
          kcpe_year?: number | null
          notes?: string | null
          previous_school?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      assignment_submissions: {
        Row: {
          assignment_id: string
          feedback: string | null
          file_path: string | null
          grade: number | null
          graded_at: string | null
          graded_by: string | null
          id: string
          notes: string | null
          submitted_at: string
          user_id: string
        }
        Insert: {
          assignment_id: string
          feedback?: string | null
          file_path?: string | null
          grade?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          notes?: string | null
          submitted_at?: string
          user_id: string
        }
        Update: {
          assignment_id?: string
          feedback?: string | null
          file_path?: string | null
          grade?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          notes?: string | null
          submitted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          attachment_path: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          grade_level: string | null
          id: string
          is_published: boolean
          max_points: number
          subject_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          attachment_path?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          grade_level?: string | null
          id?: string
          is_published?: boolean
          max_points?: number
          subject_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          attachment_path?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          grade_level?: string | null
          id?: string
          is_published?: boolean
          max_points?: number
          subject_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          criteria: Json
          description: string | null
          icon: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          criteria?: Json
          description?: string | null
          icon?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          criteria?: Json
          description?: string | null
          icon?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      learning_resources: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          external_url: string | null
          file_path: string | null
          grade_level: string | null
          id: string
          kind: Database["public"]["Enums"]["resource_kind"]
          subject_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          external_url?: string | null
          file_path?: string | null
          grade_level?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["resource_kind"]
          subject_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          external_url?: string | null
          file_path?: string | null
          grade_level?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["resource_kind"]
          subject_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_resources_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      page_blocks: {
        Row: {
          block_type: string
          created_at: string
          draft_data: Json
          id: string
          is_visible: boolean
          page_id: string
          position: number
          published_data: Json | null
          updated_at: string
        }
        Insert: {
          block_type: string
          created_at?: string
          draft_data?: Json
          id?: string
          is_visible?: boolean
          page_id: string
          position?: number
          published_data?: Json | null
          updated_at?: string
        }
        Update: {
          block_type?: string
          created_at?: string
          draft_data?: Json
          id?: string
          is_visible?: boolean
          page_id?: string
          position?: number
          published_data?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_blocks_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string
          description: string | null
          id: string
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["page_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["page_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["page_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          answers: Json
          id: string
          max_score: number
          percentage: number
          quiz_id: string
          score: number
          started_at: string
          submitted_at: string | null
          user_id: string
          xp_earned: number
        }
        Insert: {
          answers?: Json
          id?: string
          max_score?: number
          percentage?: number
          quiz_id: string
          score?: number
          started_at?: string
          submitted_at?: string | null
          user_id: string
          xp_earned?: number
        }
        Update: {
          answers?: Json
          id?: string
          max_score?: number
          percentage?: number
          quiz_id?: string
          score?: number
          started_at?: string
          submitted_at?: string | null
          user_id?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_option_ids: string[]
          created_at: string
          explanation: string | null
          id: string
          kind: Database["public"]["Enums"]["question_kind"]
          options: Json
          points: number
          position: number
          prompt: string
          quiz_id: string
        }
        Insert: {
          correct_option_ids?: string[]
          created_at?: string
          explanation?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["question_kind"]
          options?: Json
          points?: number
          position?: number
          prompt: string
          quiz_id: string
        }
        Update: {
          correct_option_ids?: string[]
          created_at?: string
          explanation?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["question_kind"]
          options?: Json
          points?: number
          position?: number
          prompt?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          grade_level: string | null
          id: string
          is_published: boolean
          kind: Database["public"]["Enums"]["quiz_kind"]
          subject_id: string | null
          time_limit_seconds: number | null
          title: string
          updated_at: string
          xp_reward: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          is_published?: boolean
          kind?: Database["public"]["Enums"]["quiz_kind"]
          subject_id?: string | null
          time_limit_seconds?: number | null
          title: string
          updated_at?: string
          xp_reward?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          is_published?: boolean
          kind?: Database["public"]["Enums"]["quiz_kind"]
          subject_id?: string | null
          time_limit_seconds?: number | null
          title?: string
          updated_at?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      student_xp: {
        Row: {
          current_streak: number
          last_active_date: string | null
          level: number
          longest_streak: number
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          current_streak?: number
          last_active_date?: string | null
          level?: number
          longest_streak?: number
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          current_streak?: number
          last_active_date?: string | null
          level?: number
          longest_streak?: number
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      subjects: {
        Row: {
          created_at: string
          description: string | null
          grade_level: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          grade_level?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          grade_level?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string
          badge_id: string
          user_id: string
        }
        Insert: {
          awarded_at?: string
          badge_id: string
          user_id: string
        }
        Update: {
          awarded_at?: string
          badge_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "parent" | "student" | "alumnus"
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "accepted"
        | "declined"
        | "waitlisted"
      page_status: "draft" | "published"
      question_kind: "mcq" | "true_false" | "multi_select"
      quiz_kind: "quiz" | "exam" | "trivia"
      resource_kind: "note" | "past_paper" | "video" | "link" | "book"
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
      app_role: ["admin", "staff", "parent", "student", "alumnus"],
      application_status: [
        "draft",
        "submitted",
        "under_review",
        "accepted",
        "declined",
        "waitlisted",
      ],
      page_status: ["draft", "published"],
      question_kind: ["mcq", "true_false", "multi_select"],
      quiz_kind: ["quiz", "exam", "trivia"],
      resource_kind: ["note", "past_paper", "video", "link", "book"],
    },
  },
} as const
