import styles from "./index.module.css";


/**
 * 
 * @param {Object} content JSX content to be wrapped.
 * @param {String} pageSize Whether the current page size is categorized as desktop or mobile. 
 * @returns Wrapper component that adds extra padding to top and bottom of content on desktop,
 *          or else just the content on mobile.
 */
export default function HomepageWrapper({ content=null, pageSize="mobile" }) {
  return (
    <div className={pageSize==="desktop" ? styles.desktopWrapper : styles.mobileWrapper}>
      {content}
    </div>
  );
}