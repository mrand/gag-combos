import React from "react";
import { PageWrap } from "~/features/ui";
import { Header } from "~/features/ui";
import { About, Help, Intro, SplashScreen } from "~/features/homepage";
import { Footer } from "~/features/ui";

export default function Homepage() {

  return (
    <PageWrap
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
