import { createSlice } from '@reduxjs/toolkit';

export const toonSlice = createSlice({
  name: 'toons',
  initialState: [
    { active: false, organic: 'None' },  // Toon 1
    { active: false, organic: 'None' },  // Toon 2
    { active: false, organic: 'None' },  // Toon 3
    { active: false, organic: 'None' },  // Toon 4
  ],
  reducers: {
    toggleToonActive: (state, action) => {
      state[action.payload].active = !state[action.payload].active;
    },
    updateToonOrg: (state, action) => {
      state.map((toon, i) => {
        if (i===action.payload.i) {
          toon.organic = action.payload.track;
        }
        return toon;
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleToonActive, updateToonOrg } = toonSlice.actions;

export default toonSlice.reducer;