export interface User {
  id: number;
  name: string;
  email: string;
  points_balance: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at: string | null;
}

export interface Reward {
  id: number;
  title: string;
  description: string;
  cost: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at: string | null;
}

export interface Redemption {
  id: number;
  user_id: number;
  reward_id: number;
  created_at: string;
  updated_at: string;
  redemption_cost: number;
  reward?: {
    title: string;
  };
}

export interface LoginFormData {
  email: string;
}

export interface RegisterFormData {
  email: string;
  name: string;
}