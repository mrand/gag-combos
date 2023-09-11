import React, { useContext } from "react";
import { PageSizeContext } from "~/App";
import "~/features/homepage/index.css";
import Header from "~/features/ui/header";
import { About, Help, Intro, SplashScreen } from "~/features/homepage";
import Footer from "~/features/ui/footer";


export default function Homepage() {
  const pageSize = useContext(PageSizeContext);

  return (
    <div id="page" className="home custom-scrollbar">
      <Header />
      <SplashScreen /> 
      <Intro pageSize={pageSize} />
      <About pageSize={pageSize} />
      <Help pageSize={pageSize} />
      <Footer />
    </div>
  );
}
