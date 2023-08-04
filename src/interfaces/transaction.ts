import { IUser } from './user';

export interface Transaction {
  amount: number;
  actionByBeforeBalance: number;
  actionToBeforeBalance: number;
  actionByAfterBalance: number;
  actionToAfterBalance: number;
  type: number;
  actionBy: IUser;
  actionTo: IUser;
  id: string;
}

export interface IMobileTransaction {
  id: { header: string; value: any };
  amount: { header: string; value: any };
  receiver_agent_name: { header: string; value: string };
  receiver_balance: { header: string; value: number };
  receiver_role: { header: string; value: string };
  // login_times: { header: 'Login Times'; value: number };
  // last_login_times: { header: 'Last Login Time'; value: string };
  // last_login_ip: { header: 'Last Login IP'; value: string };
  // operation: { header: 'Operation'; value: any };
}
