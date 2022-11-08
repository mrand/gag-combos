import { createSlice } from '@reduxjs/toolkit';

const initialCalculatorState = {
  gagslist: [],
  hoveredGag: null,
  orgToggle: false,
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: initialCalculatorState,
  reducers: {
    resetCalculator: (state) => {
      return {
        ...state,
        gagslist: initialCalculatorState.gagslist
      }
    },
    addGag: (state, action) => {
      return (state.gagslist.length < 16) ? (
        {
          ...state,
          gagslist: [...state.gagslist, action.payload]
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
  },
})

// Action creators are generated for each case reducer function
export const { resetCalculator, addGag, deleteGag, setHoveredGag, toggleOrg  } = calculatorSlice.actions;

export default calculatorSlice.reducer;
