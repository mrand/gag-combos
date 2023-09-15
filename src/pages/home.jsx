import React, { useContext } from "react";
import { DeviceContext } from "~/App";
import { Page } from "~/features/ui";
import { Header } from "~/features/ui";
import { About, Help, Intro, SplashScreen } from "~/features/homepage";
import { Footer } from "~/features/ui";

export default function Homepage() {
  const device = useContext(DeviceContext);

  return (
    <Page
      content={
        <>
          <Header />
          <main>
            <SplashScreen /> 
            <Intro device={device} />
            <About device={device} />
            <Help device={device} />
          </main>
          <Footer />
        </>
      } 
    />
  );
}
