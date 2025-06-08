export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      game: {
        Row: {
          created_at: string;
          duration: number;
          finishAt: string | null;
          id: number;
          items: number | null;
          red_flag: boolean | null;
          score: number | null;
          startAt: string | null;
          token: string | null;
          updated_at: string | null;
          user: string;
          useragent: string | null;
          username_ig: string | null;
        };
        Insert: {
          created_at?: string;
          duration: number;
          finishAt?: string | null;
          id?: number;
          items?: number | null;
          red_flag?: boolean | null;
          score?: number | null;
          startAt?: string | null;
          token?: string | null;
          updated_at?: string | null;
          user: string;
          useragent?: string | null;
          username_ig?: string | null;
        };
        Update: {
          created_at?: string;
          duration?: number;
          finishAt?: string | null;
          id?: number;
          items?: number | null;
          red_flag?: boolean | null;
          score?: number | null;
          startAt?: string | null;
          token?: string | null;
          updated_at?: string | null;
          user?: string;
          useragent?: string | null;
          username_ig?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "game_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      game_log: {
        Row: {
          action: string;
          changed_at: string | null;
          game_id: number;
          id: number;
          new_data: Json | null;
          old_data: Json | null;
        };
        Insert: {
          action: string;
          changed_at?: string | null;
          game_id: number;
          id?: never;
          new_data?: Json | null;
          old_data?: Json | null;
        };
        Update: {
          action?: string;
          changed_at?: string | null;
          game_id?: number;
          id?: never;
          new_data?: Json | null;
          old_data?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "game_log_game_id_fkey";
            columns: ["game_id"];
            isOneToOne: false;
            referencedRelation: "game";
            referencedColumns: ["id"];
          }
        ];
      };
      user: {
        Row: {
          blocked_at: string | null;
          created_at: string;
          id: string;
          replay_at: string | null;
          token: string | null;
          updated_at: string | null;
          username_ig: string | null;
        };
        Insert: {
          blocked_at?: string | null;
          created_at?: string;
          id?: string;
          replay_at?: string | null;
          token?: string | null;
          updated_at?: string | null;
          username_ig?: string | null;
        };
        Update: {
          blocked_at?: string | null;
          created_at?: string;
          id?: string;
          replay_at?: string | null;
          token?: string | null;
          updated_at?: string | null;
          username_ig?: string | null;
        };
        Relationships: [];
      };
      user_changes_log: {
        Row: {
          action: string;
          changed_at: string | null;
          id: number;
          new_value: Json | null;
          old_value: Json | null;
          user_id: number;
        };
        Insert: {
          action: string;
          changed_at?: string | null;
          id?: never;
          new_value?: Json | null;
          old_value?: Json | null;
          user_id: number;
        };
        Update: {
          action?: string;
          changed_at?: string | null;
          id?: never;
          new_value?: Json | null;
          old_value?: Json | null;
          user_id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_unique_leaderboard: {
        Args: { start_date: string; end_date: string; limit_count: number };
        Returns: {
          username_ig: string;
          duration: number;
          score: number;
          finishAt: string;
          startAt: string;
        }[];
      };
      get_unique_leaderboard_dashboard: {
        Args: { start_date: string; end_date: string; limit_count: number };
        Returns: {
          id: number;
          username_ig: string;
          duration: number;
          created_at: string;
          items: number;
          score: number;
          finishAt: string;
          startAt: string;
        }[];
      };
      get_unique_leaderboard_fixed: {
        Args: { start_date: string; end_date: string; limit_count: number };
        Returns: {
          id: number;
          username_ig: string;
          duration: number;
          created_at: string;
          items: number;
          score: number;
          finishAt: string;
          startAt: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
