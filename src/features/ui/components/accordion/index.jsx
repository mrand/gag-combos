import React, { useState } from "react";
import styles from "./index.module.css";


export default function Accordion({ 
  title=null,
  ...props
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.accordion}>

      <button 
        className={`btn ${styles.accordionBtn}`}
        onClick={() => setActive(!active)}
        style={active ? {background: "var(--grey-300)"} : {}}
      >
        <span>{title}</span>
        {
          active ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->"}}></span>
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->"}}></span>
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
            </svg>
          )
        }
      </button>

      {
        active && (
          <div className="content-container">
            {props.children}
          </div>
        )
      }
      
    </div>
  );
}
