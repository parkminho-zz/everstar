//알림 추가해야됨ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  accessToken: string;
  userInfo: UserInfo;
}

const initialState: authState = {
  accessToken: '',
  userInfo: {
    id: 0,
    email: '',
    userName: '',
    phoneNumber: '',
    birthDate: new Date(0),
    gender: '',
  },
};

export interface UserInfo {
  id: number;
  email: string;
  userName: string;
  phoneNumber: string;
  birthDate: Date;
  gender: string;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 유저 토큰 저장 액션 (로그인 : SetToken)
    SetToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    //유저 정보 저장 액션 (유저정보 저장 : SetUser)
    SetUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },

    //유저 토큰 삭제 액션(로그아웃 : DeleteToken)
    DeleteToken: (state) => {
      state.accessToken = '';
    },

    //유저 정보 삭제 액션 (로그아웃 후 유저정보 초기화 : DeleteUser)
    DeleteUser: (state) => {
      state.userInfo = initialState.userInfo;
    },
  },
});

export const { SetToken, DeleteToken, SetUser, DeleteUser } = authSlice.actions;

export default authSlice.reducer;
