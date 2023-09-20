import React, { useState } from "react";
import { CogCard } from "~/features/recommendations";
import { ToonsCard } from "~/features/recommendations";
import { CombosComponent } from "~/features/recommendations";
import { MobileTabNavigation, Footer } from "~/features/ui";
import styles from "./index.module.css";


export default function RecommendationsDashboard() {
  const tabs = ["toons", "cog", "combos"];
  const [currentTab, setCurrentTab] = useState("combos");

  return (
    <>
      <main>
        <div className={`wrapper ${styles.recommendationsWrap}`}>
          <div className={`${styles.tab} ${currentTab==="toons" ? styles.displayed : ""} ${styles.toonsTab}`}>
            <ToonsCard />
          </div>
          <div className={`${styles.tab} ${currentTab==="combos" ? styles.displayed : ""}`}>
            <CombosComponent />
          </div>
          <div className={`${styles.tab} ${currentTab==="cog" ? styles.displayed : ""} ${styles.cogTab}`}>
            <CogCard />
          </div>
        </div>
        <MobileTabNavigation 
          tabs={tabs}
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
        />
      </main>
      <div className={styles.footerWrap}>
        <Footer />
      </div>
    </>
  );
}
