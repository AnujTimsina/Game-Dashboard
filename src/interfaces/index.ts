import { IUser } from './user';

export interface GetInfinitePagesInterface<T> {
  results: T;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface IMobileUserData {
  id: { header: 'ID'; value: any };
  status: { header: 'Status'; value: any };
  username: { header: 'Username'; value: string };
  agentName: { header: 'Agent Name'; value: string };
  balance: { header: 'Balance'; value: number };
  role: { header: 'Role'; value: string };
  login_times: { header: 'Login Times'; value: number };
  last_login_times: { header: 'Last Login Time'; value: string };
  last_login_ip: { header: 'Last Login IP'; value: string };
  operation: { header: 'Operation'; value: any };
}

export interface BackendQueryResponse<T> {
  results: T;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
