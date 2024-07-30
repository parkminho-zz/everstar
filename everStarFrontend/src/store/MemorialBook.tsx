//일기 아직 안넣음ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


import { createSlice, PayloadAction } from "@reduxjs/toolkit"
/*
import { UserType, MemorialBookType } from "../components/page/MemorialBook"
*/

interface memorialBookState {
/*
    userInfo: UserType
    memorialBookDetail : MemorialBookType
*/
}

const initialState: memorialBookState = {
/*
    userInfo: {
      id: 0,
      psychologicalTestResult: "",
      isOpen: false,
      isActive: false,
    },

    memorialBookDetail: {
      sentimentAnalysis: {
        id: 0,
        totalResult: 0,
        week1Result: 0,
        week2Result: 0,
        week3Result: 0,
        week4Result: 0,
        week5Result: 0,
        week6Result: 0,
        week7Result: 0
      },
      quests: {
        id: 0,
        content: "",
        type: ""
      },
      questAnswers: {
        petId: 0,
        questId: 0,
        content: "",
        imageUrl: "",
        type: ""
      },
      aiAnswers: {
        petId: 0,
        questId: 0,
        content: "",
        imageUrl: "",
        type: ""
      }
      diaries: {
        id: 0,
        memorialBookId: 0,
        title: "",
        content: "",
        imageUrl: "",
        createdTime: new Date(0)
        }
    }
*/
}

export const memorialBookSlice = createSlice({
  name: "memorialBook",
  initialState,
  reducers: {
    /*
    // 유저 메모리얼북 정보 저장 액션 ( SetMemorialBook )
    SetMemorialBook: (state, action: PayloadAction<memorialBookState>) => {
      state.memorialBookDetail = action.payload.memorialBookDetail
    },

    //유저 메모리얼북 상태 정보 저장 액션 (유저정보 저장 : SetUserInfo)
    SetUserInfo: (state, action: PayloadAction<UserType>) => {
      state.userInfo = action.payload
    },

    //유저 메모리얼북 삭제 액션( DeleteMemorialBook)
    DeleteMemorialBook: (state) => {
      state.memorialBookDetail = initialState.memorialBookDetail
    },

    //유저 메모리얼북 상태 정보 삭제 액션 (유저정보 저장 : DeleteUserInfo)
    DeleteUserInfo: (state) => {
      state.userInfo = initialState.userInfo
    },
    */
  },
})

export const { 
  /* 
  SetMemorialBook,
  SetUserInfo,
  DeleteMemorialBook,
  DeleteUserInfo
  */
  } = memorialBookSlice.actions

export default memorialBookSlice.reducer