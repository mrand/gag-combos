import React from "react";
import styles from "./index.module.css";

export default function FlexContainer({ content=null, pageSize="mobile" }) {
  return content && (
    <div className={`wrapper ${styles.flex} ${pageSize==="desktop" ? styles.desktop : styles.mobile}`}>
      {content}
    </div>
  );
}
