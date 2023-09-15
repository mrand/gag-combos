import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { CogCard } from "~/features/recommendations";
import { ToonsCard } from "~/features/recommendations";
import { CombosComponent } from "~/features/recommendations";
import styles from "./index.module.css";


function configMobileLink(page, link) {
  return "svg-btn " + link+"-btn" + ((page===link) ? " active" : "");
}


function getSVG(linkText) {
  const svgs = {
    "toons": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
        <path d="M226.5 92.85C240.8 135.7 226.2 179.1 193.9 189.7C161.6 200.2 123.8 174 109.5 131.1C95.19 88.26 109.8 44.92 142.1 34.34C174.4 23.77 212.2 49.96 226.5 92.85zM100.4 198.6C119.2 231 114.7 268.7 90.16 282.7C65.65 296.8 30.49 281.9 11.63 249.4C-7.237 216.1-2.664 179.3 21.84 165.3C46.35 151.2 81.51 166.1 100.4 198.6zM69.21 401.2C121.6 259.9 214.7 224 256 224C297.3 224 390.4 259.9 442.8 401.2C446.4 410.9 448 421.3 448 431.7V433.3C448 459.1 427.1 480 401.3 480C389.8 480 378.4 478.6 367.3 475.8L279.3 453.8C263.1 450 248 450 232.7 453.8L144.7 475.8C133.6 478.6 122.2 480 110.7 480C84.93 480 64 459.1 64 433.3V431.7C64 421.3 65.6 410.9 69.21 401.2H69.21zM421.8 282.7C397.3 268.7 392.8 231 411.6 198.6C430.5 166.1 465.7 151.2 490.2 165.3C514.7 179.3 519.2 216.1 500.4 249.4C481.5 281.9 446.3 296.8 421.8 282.7zM310.1 189.7C277.8 179.1 263.2 135.7 277.5 92.85C291.8 49.96 329.6 23.77 361.9 34.34C394.2 44.92 408.8 88.26 394.5 131.1C380.2 174 342.4 200.2 310.1 189.7z"/>
      </svg>
    ),
    "cog": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
        <path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/>
      </svg>
    ),
    "combos": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
        <path d="M352 111.1c22.09 0 40-17.88 40-39.97S352 0 352 0s-40 49.91-40 72S329.9 111.1 352 111.1zM224 111.1c22.09 0 40-17.88 40-39.97S224 0 224 0S184 49.91 184 72S201.9 111.1 224 111.1zM383.1 223.1L384 160c0-8.836-7.164-16-16-16h-32C327.2 144 320 151.2 320 160v64h-64V160c0-8.836-7.164-16-16-16h-32C199.2 144 192 151.2 192 160v64H128V160c0-8.836-7.164-16-16-16h-32C71.16 144 64 151.2 64 160v63.97c-35.35 0-64 28.65-64 63.1v68.7c9.814 6.102 21.39 11.33 32 11.33c20.64 0 45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C114.1 348.3 139.4 367.1 160 367.1s45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C242.1 348.3 267.4 367.1 288 367.1s45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C370.1 348.3 395.4 367.1 416 367.1c10.61 0 22.19-5.227 32-11.33V287.1C448 252.6 419.3 223.1 383.1 223.1zM352 373.3c-13.75 10.95-38.03 26.66-64 26.66s-50.25-15.7-64-26.66c-13.75 10.95-38.03 26.66-64 26.66s-50.25-15.7-64-26.66c-13.75 10.95-38.03 26.66-64 26.66c-11.27 0-22.09-3.121-32-7.377v87.38C0 497.7 14.33 512 32 512h384c17.67 0 32-14.33 32-32v-87.38c-9.91 4.256-20.73 7.377-32 7.377C390 399.1 365.8 384.3 352 373.3zM96 111.1c22.09 0 40-17.88 40-39.97S96 0 96 0S56 49.91 56 72S73.91 111.1 96 111.1z"/>
      </svg>
    )
  };
  return svgs[linkText];
}


function RecommendationsMobileNav({ tab, setTab }) {
  const tabs = ["toons", "cog", "combos"];
  return (
    <nav className={styles.recommendationsNav}>
      <div className={`wrapper ${styles.recommendationsNavWrapper}`}>
        {
          tabs.map((linkText, i) => {
            return (
              <button 
                key={i}
                className={`btn ${configMobileLink(tab, linkText)}`}
                onClick={() => setTab(linkText)}
              >
                {getSVG(linkText)}
                <span>
                  {linkText.charAt(0).toUpperCase() + linkText.slice(1)}
                </span>
              </button>
            )
          })
        }
      </div>
    </nav>
  );
}


function RecommendationsDashboardMobile({ tab }) {

  let displayedComponent;
  if (tab === "toons") {
    displayedComponent = <ToonsCard />;
  } else if (tab === "cog") {
    displayedComponent = <CogCard />;
  } else if (tab === "combos") {
    displayedComponent = <CombosComponent />;
  } else {
    displayedComponent = <Navigate replace to="/" />;
  }

  return (
    <div className={`wrapper ${styles.mobileRecommendations}`}>
      {displayedComponent}
    </div>
  );
}


function RecommendationsDashboardDesktop() {
  return (
    <div className={`wrapper ${styles.desktopRecommendations}`}>
      <div className={styles.toonsWrap}>
        <ToonsCard />
      </div>
      <div className={styles.combosWrap}>
        <CombosComponent />
      </div>
      <div className={styles.cogWrap}>
        <CogCard />
      </div>
    </div>
  );
}


export default function RecommendationsDashboard({ device="mobile" }) {
  const [tab, setTab] = useState("combos");

  return (
    device==="mobile" ? (
      <>
        <RecommendationsDashboardMobile tab={tab} />
        <RecommendationsMobileNav tab={tab} setTab={setTab} />
      </>
    ) : (
      <RecommendationsDashboardDesktop />
    )
  );
}
