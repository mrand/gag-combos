import React from "react";
import styles from "./index.module.css";

export default function FlexContainer({ 
  content=null, 
  device="mobile",
  reverse=false
}) {
  return content && (
    <div className={`wrapper ${styles.flex} ${device==="desktop" ? styles.desktop : styles.mobile} ${reverse && styles.reverse}`}>
      {content}
    </div>
  );
}
