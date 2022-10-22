import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cogReducer from '../features/cog/cogSlice';
import toonReducer from '../features/toons/toonSlice';
import comboReducer from '../features/combos/comboSlice';

// localStorage.clear();

const persistentState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {}

const store = configureStore({
  reducer: {
    cog: cogReducer,
    toons: toonReducer,
    combos: comboReducer,
  },
  preloadedState: persistentState
});
export default store;

store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
});
