import React, { useContext } from "react";
import { DeviceContext } from "~/App";
import styles from "./index.module.css";


export default function Page({ content=null, style=null }) {
  const pageSize = useContext(DeviceContext);

  return (
    <div
      className={`custom-scrollbar with-grid-bg ${styles.page} ${pageSize==="desktop" ? "" : styles.mobile}`}
      style={style}
    >
      {content}
    </div>
  );
}