import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'src/interfaces/user';

const initialState: IUser = {
  id: '',
  agentName: '',
  userName: '',
  role: '',
  manager: '',
  lastLoginTime: '',
  lastLogonAddress: '',
  logonAddress: '',
  loginTimes: 0,
  balance: 0.0,
  status: true,
  history: [],
};

export const userSliceKey = 'gameUser';

export const userSlice = createSlice({
  name: userSliceKey,
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUser>) => {
      const { payload } = action;
      // const newState = { ...state, wallet: payload };
      return payload;
    },
    resetUser: () => {
      return initialState;
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
