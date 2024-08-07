import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the UserInfo interface
interface UserInfo {
  email: string;
  userName: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  questReceptionTime: string;
}

// Define the AuthState interface
interface AuthState {
  accessToken: string;
  userInfo: UserInfo;
  notifications: string[];
}

// Define the initial state
const initialState: AuthState = {
  accessToken: '',
  userInfo: {
    email: '',
    userName: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    questReceptionTime: '',
  },
  notifications: [],
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    deleteToken: (state) => {
      state.accessToken = '';
    },
    deleteUser: (state) => {
      state.userInfo = initialState.userInfo;
    },
    addNotification: (state, action: PayloadAction<string>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1);
    },
  },
});

// Export the actions
export const {
  setToken,
  setUser,
  deleteToken,
  deleteUser,
  addNotification,
  removeNotification,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
