import { createSlice } from '@reduxjs/toolkit';


export const initialRecommendationsState = {
  cog: {
    hasUpdates: false,
    level: null,
    isV2: false,
    suit: null,
    name: null,
    lured: false,
  },
  combos: {
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
  },
  gag: {
    modal: { show: false, data: null }
  },
  toons: {
    hasUpdates: false,
    toonList: [
      { active: false, organic: 'None' },  // Toon 1
      { active: false, organic: 'None' },  // Toon 2
      { active: false, organic: 'None' },  // Toon 3
      { active: false, organic: 'None' },  // Toon 4
    ]
  }
}


export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: initialRecommendationsState,
  reducers: {
    // Cog
    resetCog: (state) => {
      return {
        ...state,
        cog: initialRecommendationsState.cog
      }
    },
    setCog: (state, action) => {
      state.cog.hasUpdates = true;
      state.cog.level = action.payload.level;
      state.cog.suit = action.payload.suit;
      state.cog.name = action.payload.name;
    },
    toggleCogV2: (state) => {
      state.cog.hasUpdates = true;
      state.cog.isV2 = !state.cog.isV2;
    },
    toggleCogLured: (state) => {
      state.cog.hasUpdates = true;
      state.cog.lured = !state.cog.lured;
    },
    // Combos
    resetCombos: (state) => {
      return {
        ...state,
        combos: initialRecommendationsState.combos
      }
    },
    setComboType: (state, action) => {
      state.combos.hasUpdates = true;
      state.combos.type = action.payload;
    },
    toggleGagTrack: (state, action) => {
      state.combos.hasUpdates = true;
      state.combos.filters[action.payload] = !state.combos.filters[action.payload];
    },
    toggleCombosExpanded: (state) => {
      state.combos.hasUpdates = true;
      state.combos.expanded = !state.combos.expanded;
    },
    // Gag
    resetGagModal: (state) => {
      return {
        ...state,
        gag: {
          ...state.gag,
          modal: initialRecommendationsState.gag.modal
        }
      }
    },
    setGagModal: (state, data) => {
      state.gag.modal.show = true;
      state.gag.modal.data = data.payload;
    },
    // Toons
    resetToons: (state) => {
      return {
        ...state,
        toons: initialRecommendationsState.toons
      }
    },
    toggleToonActive: (state, action) => {
      state.toons.hasUpdates = true;
      state.toons.toonList[action.payload].active = !state.toons.toonList[action.payload].active;
    },
    updateToonOrganic: (state, action) => {
      state.toons.hasUpdates = true;
      state.toons.toonList.map((toon, i) => {
        if (i===action.payload.i) {
          toon.organic = action.payload.track;
        }
        return toon;
      });
    }
  }
});


export const {
  resetCog, setCog, toggleCogV2, toggleCogLured,
  resetCombos, setComboType, toggleGagTrack, toggleCombosExpanded,
  resetGagModal, setGagModal,
  resetToons, toggleToonActive, updateToonOrganic
} = recommendationsSlice.actions;


export default recommendationsSlice.reducer;
