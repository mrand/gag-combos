import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Cog } from '~/features/cog';
import { RecommendCombos } from './modules';
import { CombosGrid } from './components';
import { TitleContainer } from './components';


export default function CombosComponent() {

  // build new recommend combos object
  const cogLevel = useSelector((state) => state.recommendations.cog.level);
  const cogV2 = useSelector((state) => state.recommendations.cog.isV2);
  const cog = cogLevel ? new Cog(cogLevel, cogV2) : null;
  const isLured = useSelector((state) => state.recommendations.cog.lured);
  const numToons = useSelector((state) => state.recommendations.toons.toonList.filter(toon => toon.active).length);
  const toonOrgs = useSelector((state) => state.recommendations.toons.toonList.map((toon) => toon.active ? toon.organic : ''));
  const comboType = useSelector((state) => state.recommendations.combos.type);
  const gagFilters = useSelector((state) => state.recommendations.combos.filters);

  const recommendations = new RecommendCombos(
    cog, isLured,          // cog params
    numToons, toonOrgs,    // toons params
    comboType, gagFilters  // combo params
  );

  const numCells = recommendations.recCombos.length;
  const expanded = useSelector((state) => state.recommendations.combos.expanded);

  const [cellStates, setCellStates] = useState(new Array(numCells).fill(expanded));
  useEffect(() => {
    setCellStates(new Array(numCells).fill(expanded))
  }, [numCells, expanded]);

  return (
    <div id='combos'>
      <TitleContainer
        cellStates={cellStates}
        setCellStates={setCellStates}
      />
      <CombosGrid
        recommendCombos={recommendations}
        cellStates={cellStates}
        setCellStates={setCellStates}
      />
    </div>
  );
}
