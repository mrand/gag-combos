import React from "react";
import styles from "./index.module.css";

export default function FlexContainer({ 
  content=null, 
  pageSize="mobile",
  reverse=false
}) {
  return content && (
    <div className={`wrapper ${styles.flex} ${pageSize==="desktop" ? styles.desktop : styles.mobile} ${reverse && styles.reverse}`}>
      {content}
    </div>
  );
}
