import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface UserInteractionInterface {
  id?: string;
  user_id?: string;
  interaction_data: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface UserInteractionGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  interaction_data?: string;
}
