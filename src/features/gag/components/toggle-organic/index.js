import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOrg } from 'features/calculator/calculator.slice';
import Toggle from 'features/ui/toggle';
import './index.css';


export default function ToggleOrganic() {
  const org = useSelector((state) => state.calculator.orgToggle);
  const dispatch = useDispatch();

  return (
    <div className="toggle-organic">
      <Toggle 
        icon={<img src="/img/gags/icon-organic-mini.png" alt="Organic Symbol" />}
        active={org}
        clickHandler={() => dispatch(toggleOrg())}
        infoText="Toggle Organic Gags"
      />
    </div>
  );
}
