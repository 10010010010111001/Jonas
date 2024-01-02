export type Pix = {
  id: number;
  created_at: string;
  buyer_name: string;
  buyer_email: string;
  buyer_doc: string;
  buyer_phone: string;
  amount: number;
};

export type Ticket = {
  id: number;
  title: string;
  type: "Inteira" | "Meia";
  price: number;
};

export interface Database {
  public: {
    Tables: {
      pix: {
        Row: {
          amount: number;
          buyer_doc: string;
          buyer_email: string;
          buyer_name: string;
          buyer_phone: string;
          created_at: string;
          id: number;
        };
        Insert: {
          amount: number;
          buyer_doc: string;
          buyer_email: string;
          buyer_name: string;
          buyer_phone: string;
          created_at?: string;
          id?: number;
        };
        Update: {
          amount?: number;
          buyer_doc?: string;
          buyer_email?: string;
          buyer_name?: string;
          buyer_phone?: string;
          created_at?: string;
          id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
