import { configureStore } from '@reduxjs/toolkit';
import { cogReducer } from 'features/cog';
import { toonsReducer } from 'features/toons';
import { combosReducer } from 'features/combos';

// localStorage.clear();
const persistentState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {}

const store = configureStore({
  reducer: {
    cog: cogReducer,
    toons: toonsReducer,
    combos: combosReducer,
  },
  preloadedState: persistentState
});

store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
});

export default store;
