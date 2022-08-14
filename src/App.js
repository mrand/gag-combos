import React, { useState, useEffect, useReducer } from 'react';
import Cog from './core/Cog';
import Toon from './core/Toon';
import PageDesktop from './components/Page/PageDesktop';
import PageMobile from './components/Page/PageMobile';


function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}


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
            toonState: {
              ...state.toonState,
              numToons: state.toonState.numToons + 1,
              toons: state.toonState.toons.map((toon, i) => {
                if (i===action.i) { 
                  return new Toon('None'); 
                } else { return toon; }
              }),
              toonOrgs: state.toonState.toonOrgs.map((orgGag, i) => {
                if (i===action.i) { 
                  return 'None'; 
                } else { return orgGag; }
              })
            }
          };
        // Remove Toon
        case 'remove':
          return {
            ...state,
            toonState: {
              ...state.toonState,
              numToons: state.toonState.numToons - 1,
              toons: state.toonState.toons.map((toon, i) => {
                if (i===action.i) { 
                  return ''; 
                } else { return toon; }
              }),
              toonOrgs: state.toonState.toonOrgs.map((orgGag, i) => {
                if (i===action.i) { 
                  return ''; 
                } else { return orgGag; }
              })
            }
          };
        // Update Organic Track
        default:
          return {
            ...state,
            toonState: {
              ...state.toonState,
              toons: state.toonState.toons.map((toon, i) => {
                if (i===action.i) { 
                  toon.updateOrganic(action.value);
                  return toon;
                } else { return toon; }
              }),
              toonOrgs: state.toonState.toonOrgs.map((orgTrack, i) => {
                if (i===action.i) {
                  return action.value;
                } else { return orgTrack; }
              })
            }
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
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  const [state, dispatch] = useReducer(
    reducer, 
    {
      cogState: {
        cog: new Cog(1),
        isLured: false
      },
      toonState: {
        numToons: 1,
        toons:    [new Toon('None'), '', '', ''],
        toonOrgs: ['None',           '', '', '']
      },
      comboState: {
        comboType: 'Basic',
        gagFilters: {
          'Toon-Up': true,
          'Trap': true,
          'Lure': true,
          'Sound': true,
          'Throw': true,
          'Squirt': true,
          'Drop': true
        }
      }
    }
  );
  // console.log(state.toonState.toonOrgs);
  
  let isMobile = (
    (Math.min(windowSize.innerWidth, window.innerHeight) <= 850) ||
    (windowSize.innerWidth <= 1150)
  );
  return (
    <>
      {isMobile ? (
        <PageMobile
          state={state}
          dispatch={dispatch}
        />
      ) : (
        <PageDesktop
          state={state}
          dispatch={dispatch}
        />
      )}
      
    </>
  );
}

export default App;