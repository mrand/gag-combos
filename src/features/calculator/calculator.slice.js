import { createSlice } from '@reduxjs/toolkit';

const initialCalculatorState = {
  gagslist: [],
  hoveredGag: null,
  orgToggle: false,
  isV2: false
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: initialCalculatorState,
  reducers: {
    resetGags: (state) => {
      return {
        ...state,
        gagslist: initialCalculatorState.gagslist
      }
    },
    addGag: (state, action) => {
      // Pre-defined Order
      let ordering = {
        'Toon-Up': 1,
        'Trap':    2,
        'Lure':    3,
        'Sound':   4,
        'Throw':   5,
        'Squirt':  6,
        'Drop':    7
      }

      return (state.gagslist.length < 16) ? (
        {
          ...state,
          gagslist: [...state.gagslist, action.payload].slice().sort(function(a,b) {
            return (ordering[a.track] - ordering[b.track] || a.track.localeCompare(b.track));
          })
        }
      ) : {...state}
    },
    deleteGag: (state, action) => {
      return {
        ...state,
        gagslist:[
          ...state.gagslist.slice(0, action.payload.index),
          ...state.gagslist.slice(action.payload.index + 1),
        ]
      }
    },
    setHoveredGag: (state, action) => {
      state.hoveredGag = action.payload
    },
    toggleOrg: (state) => {
      state.orgToggle = !state.orgToggle;
    },
    toggleV2: (state) => {
      state.isV2 = !state.isV2;
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetGags, addGag, deleteGag, setHoveredGag, toggleOrg, toggleV2  } = calculatorSlice.actions;

export default calculatorSlice.reducer;
