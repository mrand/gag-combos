import recommendationsReducer, {
  resetCog, setCog, toggleCogV2, toggleCogLured,
  resetCombos, setComboType, setComboSort, toggleGagTrack, toggleCombosExpanded,
  resetGagModal, setGagModal,
  resetToons, toggleToonActive, updateToonOrganic
} from './recommendations.slice';

import Dashboard from './components/dashboard';

export { 
  recommendationsReducer,
  resetCog, setCog, toggleCogV2, toggleCogLured,
  resetCombos, setComboType, setComboSort, toggleGagTrack, toggleCombosExpanded,
  resetGagModal, setGagModal,
  resetToons, toggleToonActive, updateToonOrganic,
  Dashboard
};
