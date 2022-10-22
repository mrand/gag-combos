import { createSlice } from '@reduxjs/toolkit';

export const cogSlice = createSlice({
  name: 'cog',
  initialState: {
    level: null,
    lured: false,
  },
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    toggleLured: (state) => {
      state.lured = !state.lured;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLevel, toggleLured } = cogSlice.actions;

export default cogSlice.reducer;