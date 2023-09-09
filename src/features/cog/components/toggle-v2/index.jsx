import React from "react";
import Toggle from "~/features/ui/toggle";


export default function ToggleV2({ active=false, clickHandler=null, hasText=true }) {
  return (
    <div className="toggle-v2">
      {
        hasText && (
          active ? (
            <h3 style={{color: "var(--red-600)"}}>Cog is v2.0</h3>
           ) : (
            <h3>Is Cog v2.0?</h3>
           )
        )
      }
      <Toggle 
        icon={<h3 className="font--cog">v2.0</h3>}
        active={active}
        clickHandler={clickHandler}
        infoText="Toggle v2.0 Cog"
        accentColor="var(--red-600)"
      />
    </div>
  )
}