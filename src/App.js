import React, { useReducer } from 'react';
import Cog from './core/Cog';
import Toon from './core/Toon';
import CogCard from './components/CogCard/CogCard';
import ToonsCard from './components/ToonsCard/ToonsCard';

import Combos from './components/Combos/Combos';

function reducer(state, action) {
  let newToon;
  let newNumToons;

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
        newToon = '';
        newNumToons = state.numToons-1;
      } else {
        if (state.toon1 === '') {
          newNumToons = state.numToons+1;
          newToon = new Toon(action.value);
        } else {
          newToon = state.toon1;
          newToon.updateOrganic(action.value);
          newNumToons = state.numToons;
        }
      }
      return {
        ...state, 
        numToons: newNumToons,
        toonOrg1: action.value,
        toon1: newToon
      };
    case 'toon2':
      if (action.value === '') {
        newToon = '';
        newNumToons = state.numToons-1;
      } else {
        if (state.toon2 === '') {
          newToon = new Toon(action.value);
          newNumToons = state.numToons+1;
        } else {
          newToon = state.toon2;
          newToon.updateOrganic(action.value);
          newNumToons = state.numToons;
        }
      }
      return {
        ...state, 
        numToons: newNumToons,
        toonOrg2: action.value,
        toon2: newToon
      };
    case 'toon3':
      if (action.value === '') {
        newToon = '';
        newNumToons = state.numToons-1;
      } else {
        if (state.toon3 === '') {
          newToon = new Toon(action.value);
          newNumToons = state.numToons+1;
        } else {
          newToon = state.toon3;
          newToon.updateOrganic(action.value);
          newNumToons = state.numToons;
        }
      }
      return {
        ...state, 
        numToons: newNumToons,
        toonOrg3: action.value,
        toon3: newToon
      };
    case 'toon4':
      if (action.value === '') {
        newToon = '';
        newNumToons = state.numToons-1;
      } else {
        if (state.toon4 === '') {
          newToon = new Toon(action.value);
          newNumToons = state.numToons+1;
        } else {
          newToon = state.toon4;
          newToon.updateOrganic(action.value);
          newNumToons = state.numToons;
        }
      }
      return {
        ...state, 
        numToons: newNumToons,
        toonOrg4: action.value,
        toon4: newToon
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
      numToons: 1,
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
  // console.log(state);


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
      <Combos 
        cog={state.cog}
        isLured={state.isLured}
        numToons={state.numToons}
        toonsOrg={
          [
            state.toonOrg1,
            state.toonOrg2,
            state.toonOrg3,
            state.toonOrg4
          ]
        }
      />
    </div>
  );
}

export default App;