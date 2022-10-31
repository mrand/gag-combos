import { createSlice } from '@reduxjs/toolkit';

const initialToonState = {
  hasUpdates: false,
  toonlist: [
    { active: false, organic: 'None' },  // Toon 1
    { active: false, organic: 'None' },  // Toon 2
    { active: false, organic: 'None' },  // Toon 3
    { active: false, organic: 'None' },  // Toon 4
  ]
};

export const toonSlice = createSlice({
  name: 'toons',
  initialState: initialToonState,
  reducers: {
    resetToons: () => initialToonState,
    toggleToonActive: (state, action) => {
      state.hasUpdates = true;
      state.toonlist[action.payload].active = !state.toonlist[action.payload].active;
    },
    updateToonOrg: (state, action) => {
      state.hasUpdates = true;
      state.toonlist.map((toon, i) => {
        if (i===action.payload.i) {
          toon.organic = action.payload.track;
        }
        return toon;
      });
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetToons, toggleToonActive, updateToonOrg } = toonSlice.actions;

export default toonSlice.reducer;