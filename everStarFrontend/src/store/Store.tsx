import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; // localStorage를 사용할 경우

import authReducer from './Auth';
import letterReducer from './Letter';
import memorialBookReducer from './MemorialBook';
import petReducer from './Pet';
import cheeringReducer from './Cheering';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

export const reducers = combineReducers({
  reducer: {
    //여기에 리듀서들 추가
    auth: authReducer,
    letter: letterReducer,
    memorialBook: memorialBookReducer,
    pet: petReducer,
    cheering: cheeringReducer,
  },
});

//새로고침 시 state 초기화되지않게 persistReducer 사용
const persistedReducer = persistReducer(persistConfig, reducers);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // 직렬화 비활성화 (타입)
});

export type RootState = ReturnType<typeof Store.getState>;
