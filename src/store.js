import { configureStore } from '@reduxjs/toolkit';
import { calculatorReducer } from 'features/calculator';
import { recommendationsReducer } from 'features/recommendations';


// Handle any Major Redux Store Changes During Development
const lastRefactoredStore = "202211091345";
const localRefactorDate = localStorage.getItem('lrs');
// if local updated doesn't match last updated, clear local storage
if (lastRefactoredStore !== localRefactorDate) {
  localStorage.clear();
  localStorage.setItem('lrs', lastRefactoredStore);
}


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
