import React, { useContext } from "react";
import { DeviceContext } from "~/App";
import { Page } from "~/features/ui";
import { Header } from "~/features/ui";
import { Dashboard } from "~/features/recommendations";
import { Footer } from "~/features/ui";


export default function Recommendations() {
  const pageSize = useContext(DeviceContext);

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
