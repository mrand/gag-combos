import React, { useContext } from "react";
import { PageSizeContext } from "~/App";
import styles from "./index.module.css";


export default function Page({ content=null }) {
  const pageSize = useContext(PageSizeContext);

  return (
    <div className={`custom-scrollbar with-grid-bg ${styles.page} ${pageSize==="desktop" ? "" : styles.mobile}`}>
      {content}
    </div>
  );
}