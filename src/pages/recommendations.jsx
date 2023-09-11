import React, { useContext } from "react";
import { PageSizeContext } from "~/App";
import Page from "../features/ui/page";
import Header from "~/features/ui/header";
import { Dashboard } from "~/features/recommendations";
import Footer from "~/features/ui/footer";


export default function Recommendations() {
  const pageSize = useContext(PageSizeContext);

  return (
    <Page
      content={
        <>
          <Header />
          <Dashboard pageSize={pageSize} />
          {pageSize==="mobile" ? null : <Footer />}
        </>
      } 
    />
  );
}
