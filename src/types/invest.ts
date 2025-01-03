import { User } from "./user";
import { Fundraise } from "./fundraise";

export interface Invest {
  id: number;
  fundraise_id: number;
  investor_id: number;
  amount: number;
  anonymous: boolean;
  created_at: string;
  updated_at: string;
  fundraise: Fundraise;
  investor: Pick<User, 'id' | 'phone'>;
}
export interface InvestPaginated {
  data: Invest[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
export interface CreateInvestData {
  fundraise_id: number;
  amount: number;
  anonymous: boolean;
}