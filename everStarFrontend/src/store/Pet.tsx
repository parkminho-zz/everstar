//반려동물 성격 아직 안넣음ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface petState {
  petInfo: PetInfo;
}

const initialState: petState = {
  petInfo: {
    id: 0,
    userId: 0,
    name: '',
    age: 0,
    memorialDate: new Date(0),
    species: '',
    gender: '',
    relationship: '',
    profileImage: null,
    introduction: '',
    questIndex: 0,
    lastAccessTime: new Date(0),
  },
};

export interface PetInfo {
  id: number;
  userId: number;
  name: string;
  age: number;
  memorialDate: Date;
  species: string;
  gender: string;
  relationship: string;
  profileImage: File | null;
  introduction: string;
  questIndex: number;
  lastAccessTime: Date;
}

export const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    //  펫 정보 저장 액션 ( SetPet)
    SetPet: (state, action: PayloadAction<PetInfo>) => {
      state.petInfo = action.payload;
    },

    //펫 정보 삭제 액션 (로그아웃 후 유저정보 초기화 : DeletePet)
    DeletePet: (state) => {
      state.petInfo = initialState.petInfo;
    },
  },
});

export const { SetPet, DeletePet } = petSlice.actions;

export default petSlice.reducer;
