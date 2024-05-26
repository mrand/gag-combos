import React from "react";
import { PageWrap, V4UpdateWarningBanner } from "~/features/ui";
import { Header } from "~/features/ui";
import { CalculatorDashboard } from "~/features/calculator";


export default function Calculator() {

  return (
    <PageWrap
      content={
        <>
          {/* 
          Unlike other pages, <main> and <footer> are declared 
          in this page's content component (<CalculatorDashboard>).
          This is because the calculator page hides the footer
          on mobile to give it an "app-like" feel.
          */}
          <V4UpdateWarningBanner />
          <Header />
          <CalculatorDashboard />
        </>
      } 
    />
  );
}
