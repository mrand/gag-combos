import React from "react";
import styles from "./index.module.css";


/**
 * 
 * @param {Object} content JSX content to be wrapped.
 * @returns Wrapper component that adds extra padding to top and bottom of content on large screens.
 */
export default function HomepageWrapper({ content=null }) {
  return (
    <div className={styles.homepageWrapper}>
      {content}
    </div>
  );
}