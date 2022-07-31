import React, { useReducer } from 'react';
import Cog from './core/Cog';
import Toon from './core/Toon';
// import Gag from './core/Gag';
import CogCard from './components/CogCard/CogCard';
import ToonsCard from './components/ToonsCard/ToonsCard';


function reducer(state, action) {
  let newVal;

  switch (action.type) {
    case 'cog':
      return {
        ...state, 
        cogLevel: action.value, 
        cog: new Cog(action.value)
      };
    case 'lured':
      return {
        ...state,
        isLured: action.value
      }
    case 'toon1':
      if (action.value === '') {
        newVal = '';
      } else {
        if (state.toon1 === '') {
          newVal = new Toon(action.value)
        } else {
          newVal = state.toon1;
          newVal.updateOrganic(action.value);
        }
      }
      return {
        ...state, 
        toonOrg1: action.value,
        toon1: newVal
      };
    case 'toon2':
      if (action.value === '') {
        newVal = '';
      } else {
        if (state.toon2 === '') {
          newVal = new Toon(action.value)
        } else {
          newVal = state.toon2;
          newVal.updateOrganic(action.value);
        }
      }
      return {
        ...state, 
        toonOrg2: action.value,
        toon2: newVal
      };
    case 'toon3':
      if (action.value === '') {
        newVal = '';
      } else {
        if (state.toon3 === '') {
          newVal = new Toon(action.value)
        } else {
          newVal = state.toon3;
          newVal.updateOrganic(action.value);
        }
      }
      return {
        ...state, 
        toonOrg3: action.value,
        toon3: newVal
      };
    case 'toon4':
      if (action.value === '') {
        newVal = '';
      } else {
        if (state.toon4 === '') {
          newVal = new Toon(action.value)
        } else {
          newVal = state.toon4;
          newVal.updateOrganic(action.value);
        }
      }
      return {
        ...state, 
        toonOrg41: action.value,
        toon4: newVal
      };
    default:
      throw new Error();
  }
}


function App() {

  const [state, dispatch] = useReducer(
    reducer, 
    {
      cogLevel: 1,
      cog: new Cog(1),
      isLured: false,
      toonOrg1: 'None',
      toon1: new Toon('None'),
      toonOrg2: '',
      toon2: '',
      toonOrg3: '',
      toon3: '',
      toonOrg4: '',
      toon4: ''
    }
  );
  console.log(state);


  return (
    <div className='wrapper'>
      <h1>Gag Combos</h1>
      <div className='container'>
        <CogCard 
          cog={state.cog}
          state={state}
          dispatch={dispatch}
        />
        <ToonsCard
          toons={
            [
              state.toon1, 
              state.toon2, 
              state.toon3, 
              state.toon4
            ]
          }
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}

export default App;