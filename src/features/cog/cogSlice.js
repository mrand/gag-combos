import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasUpdates: false,
  level: null,
  lured: false,
}

export const cogSlice = createSlice({
  name: 'cog',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setLevel: (state, action) => {
      state.hasUpdates = true;
      state.level = action.payload;
    },
    toggleLured: (state) => {
      state.hasUpdates = true;
      state.lured = !state.lured;
    },
  },
})

// Action creators are generated for each case reducer function
export const { reset, setLevel, toggleLured } = cogSlice.actions;

export default cogSlice.reducer;