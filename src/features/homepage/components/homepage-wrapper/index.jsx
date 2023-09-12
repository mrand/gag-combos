import React from "react";
import styles from "./index.module.css";


/**
 * 
 * @param {Object} content JSX content to be wrapped.
 * @param {String} device Whether the current page size is categorized as desktop or mobile. 
 * @returns Wrapper component that adds extra padding to top and bottom of content on desktop,
 *          or else just the content on mobile.
 */
export default function HomepageWrapper({ content=null, device="mobile" }) {
  return (
    <div className={device==="desktop" ? styles.desktopWrapper : styles.mobileWrapper}>
      {content}
    </div>
  );
}