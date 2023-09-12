import React, { useContext } from "react";
import { DeviceContext } from "~/App";
import { Page } from "~/features/ui";
import { Header } from "~/features/ui";
import { About, Help, Intro, SplashScreen } from "~/features/homepage";
import { Footer } from "~/features/ui";

export default function Homepage() {
  const pageSize = useContext(DeviceContext);

  return (
    <Page
      content={
        <>
          <Header />
          <SplashScreen /> 
          <Intro pageSize={pageSize} />
          <About pageSize={pageSize} />
          <Help pageSize={pageSize} />
          <Footer />
        </>
      } 
    />
  );
}
