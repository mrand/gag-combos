import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Home from "~/pages/home";
import Recommendations from "~/pages/recommendations";
import Calculator from "~/pages/calculator";
import Changelog from "~/pages/changelog";
import PrivacyPolicy from "~/pages/privacy";
import FAQ from "~/pages/faq";
import PageNotFound from "~/pages/page-not-found";


export default function App() {
  return (
    <div className={styles.pageWrap}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}
