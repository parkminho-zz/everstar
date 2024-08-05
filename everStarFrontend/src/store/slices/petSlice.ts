// src/store/slices/petSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet } from 'api/petApi';

export interface PetInfo {
  id: number;
  userId: number;
  name: string;
  age: number;
  memorialDate: string; // 변경된 부분
  species: string;
  gender: string;
  relationship: string;
  profileImage: string;
  personalities: string[];
}

interface PetState {
  pets: Pet[];
  petDetails: PetInfo | null;
}

const initialState: PetState = {
  pets: [],
  petDetails: null,
};

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    addPet: (state, action: PayloadAction<Pet>) => {
      state.pets.push(action.payload);
    },
    setPets: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload;
    },
    updatePet: (state, action: PayloadAction<Pet>) => {
      const index = state.pets.findIndex((pet) => pet.id === action.payload.id);
      if (index !== -1) {
        state.pets[index] = action.payload;
      }
    },
    removePet: (state, action: PayloadAction<number>) => {
      state.pets = state.pets.filter((pet) => pet.id !== action.payload);
    },
    setPetDetails: (state, action: PayloadAction<PetInfo>) => {
      state.petDetails = action.payload;
    },
  },
});

export const { addPet, setPets, updatePet, removePet, setPetDetails } =
  petSlice.actions;
export default petSlice.reducer;
