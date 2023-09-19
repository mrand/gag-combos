import recommendationsReducer, {
  resetCog, setCog, toggleCogV2, toggleCogLured,
  resetCombos, setComboType, setComboSort, toggleGagTrack, toggleCombosExpanded,
  resetGagModal, setGagModal,
  resetToons, toggleToonActive, updateToonOrganic
} from "./recommendations.slice";

import combosData from "./data/combos.data.json";

import { FindCombo, RecommendCombos } from "./modules";

import {
  RecommendationsDashboard,
  ToonsCard,
  CogCard, ToggleLured,
  CombosComponent, TitleContainer, CombosGrid, GagModal, ComboCell, ErrorCell, GagCell
} from "./components";

export { 
  recommendationsReducer,
  resetCog, setCog, toggleCogV2, toggleCogLured,
  resetCombos, setComboType, setComboSort, toggleGagTrack, toggleCombosExpanded,
  resetGagModal, setGagModal,
  resetToons, toggleToonActive, updateToonOrganic,
  combosData,
  FindCombo, RecommendCombos,
  RecommendationsDashboard,
  ToonsCard,
  CogCard, ToggleLured,
  CombosComponent, TitleContainer, CombosGrid, GagModal, ComboCell, ErrorCell, GagCell
};
