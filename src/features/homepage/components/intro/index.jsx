import React from "react";
import { Link } from "react-router-dom";
import { CombosVisual, FlexContainer, HomepageWrapper } from "~/features/homepage";
import styles from "./index.module.css";


export default function Intro() {
  return (
    <section className={`with-grid-bg ${styles.intro}`}>
      <HomepageWrapper
        content={
          <FlexContainer
            content={
              <>
                <div className={`content-container ${styles.left}`}>
                  <h2>Welcome!</h2>
                  <p>
                    Welcome to Gag Combos Info, your new go-to resource
                    for finding the perfect combinations of gags to defeat the cogs!
                  </p>
                  <p>
                    Get recommended combos for any situation on the "Recommendations" page or 
                    build your own combos on the "Calculator" page!
                  </p>
                  <Link className={`btn ${styles.introLink}`} to="/recommendations">Combos Recommendations</Link>
                  <Link className={`btn ${styles.introLink}`} to="/calculator">Gag Calculator</Link>
                </div>
                <div className={styles.right}>
                  <CombosVisual />
                </div>
              </>
            }
          />
        }
      />
    </section>
  );
}
