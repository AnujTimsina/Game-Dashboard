export interface IUser {
  id: string;
  agentName: string;
  userName: string;
  role: string;
  manager: string;
  lastLoginTime: string;
  lastLogonAddress: string;
  logonAddress: string;
  loginTimes: number;
  balance: number;
  status: boolean;
  history: Array<any>;
}

export interface IUserFormatted extends Omit<IUser, 'history' | 'manager'> {
  operation: string;
}

export interface HistoryItem {
  // Define the structure of items in the "history" array if there is one.
}

export interface PageData {
  results: IUser[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
