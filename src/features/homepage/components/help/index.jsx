import React from "react";
import { Link } from "react-router-dom";
import { FlexContainer, HomepageWrapper } from "~/features/homepage";
import styles from "./index.module.css";


export default function Help({ device="mobile" }) {
  return (
    <section className={`with-grid-bg ${styles.help} ${device==="desktop" ? styles.desktop : styles.mobile}`}>
      <HomepageWrapper
        content={
          <FlexContainer
            content={
              <>
                <div className={styles.left}>
                  <h2>Need Help?</h2>
                  <Link to="/faq">Frequently Asked Questions</Link>
                  <Link to="/changelog">Changelog</Link>
                  <i>Note: This utility is currently only for Toontown Rewritten!</i>
                </div>
                <div className={styles.right}>
                  <h2>New to Toontown?</h2>
                  <a href="https://toontownrewritten.com/" target="_blank" rel="noopener noreferrer">Toontown Rewritten Homepage</a>
                  <a href="https://toontownrewritten.fandom.com/wiki/Gags" target="_blank" rel="noopener noreferrer">TTR Gags Wiki</a>
                </div>
              </>
            }
            device={device}
            reverse={false}
          />
        } 
        device={device}
      />
    </section>
  );
}
