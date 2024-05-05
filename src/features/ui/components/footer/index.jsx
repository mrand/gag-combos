import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { ScrollTopButton } from "./components";


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrapper ${styles.footerWrap}`}>
        <h2>Gag Combos Info</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/calculator">Calculator</Link>
          <Link to="/recommendations">Recommendations</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/changelog">Changelog</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </nav>
        <ScrollTopButton />
      </div>
    </footer>
  );
}
