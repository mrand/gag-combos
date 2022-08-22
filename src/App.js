import React, { useReducer } from 'react';
import Cog from './core/Cog';
import Toon from './core/Toon';
import Page from './components/Page/';


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


function App() {
  const [state, dispatch] = useReducer(
    reducer, 
    {
      cogState: {
        cog: new Cog(1),
        isLured: false
      },
      toonState: [
        new Toon(),  // Toon 1
        '',          // Toon 2
        '',          // Toon 3
        ''           // Toon 4
      ],
      comboState: {
        comboType: 'Basic',
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
  
  return (
    <Page
      state={state}
      dispatch={dispatch}
    />
  );
}

export default App;