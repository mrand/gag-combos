import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasUpdates: false,
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
}

export const comboSlice = createSlice({
  name: 'combos',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setType: (state, action) => {
      state.hasUpdates = true;
      state.type = action.payload;
    },
    toggleTrack: (state, action) => {
      state.hasUpdates = true;
      state.filters[action.payload] = !state.filters[action.payload];
    },
    toggleExpanded: (state) => {
      state.hasUpdates = true;
      state.expanded = !state.expanded;
    },
  },
})

// Action creators are generated for each case reducer function
export const { reset, setType, toggleTrack, toggleExpanded } = comboSlice.actions;

export default comboSlice.reducer;