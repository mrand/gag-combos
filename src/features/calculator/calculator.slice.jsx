import { createSlice } from "@reduxjs/toolkit";


export const initialCalculatorState = {
  cog: { isV2: false },
  gag: {
    gagsList: [],
    hoveredGag: null,
    organic: false
  }
}


export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: initialCalculatorState,
  reducers: {
    resetGags: (state) => {
      return {
        ...state,
        gag: {
          ...state.gag,
          gagsList: initialCalculatorState.gag.gagsList
        }
      }
    },
    addGag: (state, action) => {
      // Pre-defined Order
      let ordering = {
        "Toon-Up": 1,
        "Trap":    2,
        "Lure":    3,
        "Sound":   4,
        "Throw":   5,
        "Squirt":  6,
        "Drop":    7
      }
      return (state.gag.gagsList.length < 16) ? (
        {
          ...state,
          gag: {
            ...state.gag,
            gagsList: [...state.gag.gagsList, action.payload].slice().sort(function(a,b) {
              return (ordering[a.track] - ordering[b.track] || a.track.localeCompare(b.track));
            })
          }
        }
      ) : {...state}
    },
    deleteGag: (state, action) => {
      return {
        ...state,
        gag: {
          ...state.gag,
          gagsList:[
            ...state.gag.gagsList.slice(0, action.payload.index),
            ...state.gag.gagsList.slice(action.payload.index + 1),
          ]
        }
      }
    },
    setHoveredGag: (state, action) => {
      state.gag.hoveredGag = action.payload
    },
    toggleOrg: (state) => {
      state.gag.organic = !state.gag.organic;
    },
    toggleV2: (state) => {
      state.cog.isV2 = !state.cog.isV2;
    },
  },
})


export const { resetGags, addGag, deleteGag, setHoveredGag, toggleOrg, toggleV2  } = calculatorSlice.actions;


export default calculatorSlice.reducer;
