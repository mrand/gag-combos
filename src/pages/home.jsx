import React, { useContext } from "react";
import Page from "../features/ui/page";
import { PageSizeContext } from "~/App";
import Header from "~/features/ui/header";
import { About, Help, Intro, SplashScreen } from "~/features/homepage";
import Footer from "~/features/ui/footer";

export default function Homepage() {
  const pageSize = useContext(PageSizeContext);

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
