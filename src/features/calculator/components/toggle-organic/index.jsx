import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleOrg } from "~/features/calculator";
import { Toggle } from "~/features/ui";


export default function ToggleOrganic() {
  const org = useSelector((state) => state.calculator.gag.organic);
  const dispatch = useDispatch();

  return (
    <Toggle 
      icon={<img src="/img/gags/icon-organic-mini.png" alt="Organic Symbol" />}
      active={org}
      clickHandler={() => dispatch(toggleOrg())}
      infoText="Toggle Organic Gags"
      accentColor="var(--green-400)"
    />
  );
}
