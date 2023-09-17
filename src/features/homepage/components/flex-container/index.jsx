import React from "react";
import styles from "./index.module.css";

export default function FlexContainer({ 
  content=null, 
  reverse=false
}) {
  return content && (
    <div className={`wrapper ${styles.flex} ${reverse && styles.reverse}`}>
      {content}
    </div>
  );
}
