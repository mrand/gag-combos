import React from "react";
import { Page } from "~/features/ui";
import { Header } from "~/features/ui";
import { About, Help, Intro, SplashScreen } from "~/features/homepage";
import { Footer } from "~/features/ui";

export default function Homepage() {

  return (
    <Page
      content={
        <>
          <Header />
          <main>
            <SplashScreen /> 
            <Intro />
            <About />
            <Help />
          </main>
          <Footer />
        </>
      } 
    />
  );
}
