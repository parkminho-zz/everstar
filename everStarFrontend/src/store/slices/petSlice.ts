// src/store/slices/petSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet } from 'api/petApi';

interface PetState {
  pets: Pet[];
}

const initialState: PetState = {
  pets: [],
};

const petSlice = createSlice({
  name: 'pets', // Slice 이름을 복수형으로 변경
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
  },
});

export const { addPet, setPets, updatePet, removePet } = petSlice.actions;
export default petSlice.reducer;
