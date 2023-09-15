import React from "react";
import { Page } from "~/features/ui";
import { Header } from "~/features/ui";
import { CalculatorDashboard } from "~/features/calculator";
import { Footer } from "~/features/ui";


export default function Calculator() {

  return (
    <Page
      content={
        <>
          <Header />
          <main>
            <CalculatorDashboard />
          </main>
          <Footer />
        </>
      } 
    />
  );
}
