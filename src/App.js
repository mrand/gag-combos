import React, { useState, useEffect, useReducer } from 'react';
import Cog from './core/Cog';
import Toon from './core/Toon';
// import Gag from './core/Gag';
import CogCard from './components/CogCard/CogCard';
import ToonsCard from './components/ToonsCard/ToonsCard';


function reducer(state, action) {
  switch (action.type) {
    case 'cog':
      return {
        ...state, 
        cogLevel: action.value, 
        cog: new Cog(action.value)
      };
    case 'toon1':
      return {
        ...state, 
        toonOrg1: action.value,
        toon1: (action.value === '') ? '' : new Toon(action.value)
      };
    case 'toon2':
      return {
        ...state, 
        toonOrg2: action.value,
        toon2: (action.value === '') ? '' : new Toon(action.value)
      };
    case 'toon3':
      return {
        ...state, 
        toonOrg3: action.value,
        toon3: (action.value === '') ? '' : new Toon(action.value)
      };
    case 'toon4':
      return {
        ...state, 
        toonOrg4: action.value,
        toon4: (action.value === '') ? '' : new Toon(action.value)
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