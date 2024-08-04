import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
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

export const rootReducer = combineReducers({
  //현조: 리듀서 추가
  auth: authReducer,
  letter: letterReducer,
  memorialBook: memorialBookReducer,
  pet: petReducer,
  cheering: cheeringReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // 직렬화 비활성화 (타입)
});

export const persistor = persistStore(Store); // 현조

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch; //현조: AppDispatch 타입 추가
