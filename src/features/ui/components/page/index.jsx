import React from "react";
import styles from "./index.module.css";


export default function Page({ content=null, style=null }) {
  return (
    <div
      className={`custom-scrollbar with-grid-bg ${styles.page}`}
      style={style}
    >
      {content}
    </div>
  );
}