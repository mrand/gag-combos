import React, { useReducer } from 'react';
import Cog from './core/Cog';
import Toon from './core/Toon';
import Page from './components/Page/Page';
import { RecommendCombos } from './core/RecommendCombos';


function reducer(state, action) {
  switch (action.type) {

    case 'cog':
      switch (action.change) {
        // Update Level
        case 'level':
          return {
            ...state, 
            cogState: {
              ...state.cogState,
              cog: new Cog(action.value)
            } 
          }; 
        // Toggle Lured
        case 'lured':
          return {
            ...state, 
            cogState: {
              ...state.cogState,
              isLured: action.value
            } 
          }; 
        default:
          throw new Error();
      }

    case 'toon': 
      switch (action.value) {
        // Add Toon
        case 'add':
          return {
            ...state,
            toonState: state.toonState.map((toon, i) => {
              if (i===action.i) { 
                return new Toon('None'); 
              } else { return toon; }
            })
          };
        // Remove Toon
        case 'remove':
          return {
            ...state,
            toonState: state.toonState.map((toon, i) => {
              if (i===action.i) { 
                return ''; 
              } else { return toon; }
            })
          };
        // Update Organic Track
        default:
          return {
            ...state,
            toonState: state.toonState.map((toon, i) => {
              if (i===action.i) { 
                toon.updateOrganic(action.value);
                return toon;
              } else { return toon; }
            })
          };
      }

    case 'combo':
      switch (action.change) {
        // Update Combo Type
        case 'comboType':
          return {
            ...state,
            comboState: {
              ...state.comboState,
              comboType: action.value
            }
          }
        // Update Track
        default:
          return {
            ...state,
            comboState: {
              ...state.comboState,
              gagFilters: {
                ...state.comboState.gagFilters,
                [action.value]: !state.comboState.gagFilters[action.value]
              }
            }
          }
      }
      
    default:
      throw new Error();
  }
}


function getRecommendations(state) {
  let cog =      state.cogState.cog;
  let isLured =  state.cogState.isLured;
  let numToons = state.toonState.filter(toon => toon !== '').length;
  let toonOrgs = state.toonState.map((toon) => toon !== '' ? toon.organic : '');
  let comboType = state.comboState.comboType;
  let gagFilters = state.comboState.gagFilters;

  return new RecommendCombos(
    cog, isLured,          // cog params
    numToons, toonOrgs,    // toons params 
    comboType, gagFilters  // combo params
  )
}


/**
 * Get Saved Toons if they exist, else build new toons array.
 * @returns array of toon objects
 */
function buildInitToonsObject() {
  let toons = [];
  let localToonOrg;
  // fill saved toons
  for (let i=0; i<4; i++) {
    localToonOrg = localStorage.getItem('ToonOrg'+i);
    toons.push(localToonOrg ? new Toon(localToonOrg) : '');
  }
  // 1st toon always set
  // if (toons.filter(toon => toon !== '').length === 0) {
  //   toons[0] = new Toon();
  // }
  return toons;
}


function App() {
  const [state, dispatch] = useReducer(
    reducer, 
    {
      cogState: {
        cog: null,
        isLured: false
      },
      toonState: buildInitToonsObject(),
      comboState: {
        comboType: 'All',
        gagFilters: {
          'Toon-Up': true,
          'Trap':    true,
          'Lure':    true,
          'Sound':   true,
          'Throw':   true,
          'Squirt':  true,
          'Drop':    true
        }
      }
    }
  );
  
  let recommendations = getRecommendations(state);
  return (
    <Page
      state={state}
      dispatch={dispatch}
      recommendations={recommendations}
    />
  );
}

export default App;