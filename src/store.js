import { configureStore } from '@reduxjs/toolkit';
import { calculatorReducer } from 'features/calculator';
import { recommendationsReducer } from 'features/recommendations';


// localStorage.clear();
const persistentState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {};

const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    recommendations: recommendationsReducer,
  },
  preloadedState: persistentState
});

store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
});

export default store;
