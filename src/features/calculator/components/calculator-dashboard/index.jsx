import React, { useState } from "react";
import { CogsList } from "~/features/calculator";
import { GagsPicker } from "~/features/calculator";
import { MobileTabNavigation, Footer } from "~/features/ui";
import styles from "./index.module.css";


export default function CalculatorDashboard() {
  const tabs = ["gags", "cogs"];
  const [currentTab, setCurrentTab] = useState("gags");
  return (
    <>

      <div className={styles.mobileTabNavWrap}>
        <MobileTabNavigation 
          tabs={tabs}
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
        />
      </div>

      <main>
        <div className={`wrapper ${styles.dashboard}`}>
          <div className={`${styles.tab} ${currentTab==="gags" ? styles.displayed : ""} ${styles.gagsTab}`}>
            <GagsPicker />
          </div>
          <div className={`${styles.tab} ${currentTab==="cogs" ? styles.displayed : ""} ${styles.cogsListTab}`}>
            <CogsList />
          </div>
        </div>
      </main>

      <div className={styles.footerWrap}>
        <Footer />
      </div>
      
    </>
  );
}