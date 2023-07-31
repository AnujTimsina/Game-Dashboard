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
