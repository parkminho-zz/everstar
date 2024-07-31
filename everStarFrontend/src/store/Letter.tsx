import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface letterState {
  letterInfo: LetterInfo;
}

const initialState: letterState = {
  letterInfo: {
    id: 0,
    petId: 0,
    parentLetterId: 0,
    isRead: 0,
    isUserSend: 0,
    content: "",
    imageUrl: "",
  },
};

export interface LetterInfo {
  id: number;
  petId: number;
  parentLetterId: number;
  isRead: number;
  isUserSend: number;
  content: string;
  imageUrl: string;
}

export const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    //  편지정보 저장 액션 (편지 읽기 : SetLetter)
    SetLetter: (state, action: PayloadAction<LetterInfo>) => {
      state.letterInfo = action.payload;
    },

    //편지정보 삭제 액션 (로그아웃 후 유저정보 초기화 : DeleteLetter)
    DeleteLetter: (state) => {
      state.letterInfo = initialState.letterInfo;
    },
  },
});

export const { SetLetter, DeleteLetter } = letterSlice.actions;

export default letterSlice.reducer;
