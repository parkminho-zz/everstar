import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  email: string;
  userName: string;
  phoneNumber: string;
  birthDate: string; // 수정된 부분
  gender: string;
  questReceptionTime: string; // 수정된 부분
}

interface AuthState {
  accessToken: string;
  userInfo: UserInfo;
  notifications: string[];
}

const initialState: AuthState = {
  accessToken: '',
  userInfo: {
    email: '',
    userName: '',
    phoneNumber: '',
    birthDate: '', // 수정된 부분
    gender: '',
    questReceptionTime: '', // 수정된 부분
  },
  notifications: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    SetUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    DeleteToken: (state) => {
      state.accessToken = '';
    },
    DeleteUser: (state) => {
      state.userInfo = initialState.userInfo;
    },
    AddNotification: (state, action: PayloadAction<string>) => {
      state.notifications.push(action.payload);
    },
    RemoveNotification: (state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1);
    },
  },
});

export const { SetToken, DeleteToken, SetUser, DeleteUser, AddNotification, RemoveNotification } =
  authSlice.actions;

export default authSlice.reducer;
