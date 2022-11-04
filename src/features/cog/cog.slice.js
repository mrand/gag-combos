import { createSlice } from '@reduxjs/toolkit';

const initialCogState = {
  hasUpdates: false,
  level: null,
  suit: null,
  name: null,
  lured: false,
}

export const cogSlice = createSlice({
  name: 'cog',
  initialState: initialCogState,
  reducers: {
    resetCog: () => initialCogState,
    setCog: (state, action) => {
      state.hasUpdates = true;
      state.level = action.payload.level;
      state.suit = action.payload.suit;
      state.name = action.payload.name;
    },
    toggleLured: (state) => {
      state.hasUpdates = true;
      state.lured = !state.lured;
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetCog, setCog, toggleLured } = cogSlice.actions;

export default cogSlice.reducer;