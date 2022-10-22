import { createSlice } from '@reduxjs/toolkit';

export const comboSlice = createSlice({
  name: 'combos',
  initialState: {
    type: 'All',
    filters: {
      'Toon-Up': true,
      'Trap':    true,
      'Lure':    true,
      'Sound':   true,
      'Throw':   true,
      'Squirt':  true,
      'Drop':    true
    },
    expanded: false,
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    toggleTrack: (state, action) => {
      state.filters[action.payload] = !state.filters[action.payload];
    },
    toggleExpanded: (state) => {
      state.expanded = !state.expanded;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setType, toggleTrack, toggleExpanded } = comboSlice.actions;

export default comboSlice.reducer;