import { Link } from "react-router-dom";
import { FlexContainer } from "~/features/homepage";
import styles from "./index.module.css";


export default function Help({ pageSize="mobile" }) {
  return (
    <section className={`with-grid-bg ${styles.help} ${pageSize==="desktop" ? styles.desktop : styles.mobile}`}>
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
        pageSize={pageSize}
        reverse={false}
      />
    </section>
  );
}
