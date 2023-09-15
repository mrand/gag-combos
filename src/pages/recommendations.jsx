import React, { useContext } from "react";
import { DeviceContext } from "~/App";
import { Page } from "~/features/ui";
import { Header } from "~/features/ui";
import { RecommendationsDashboard } from "~/features/recommendations";
import { Footer } from "~/features/ui";


export default function Recommendations() {
  const device = useContext(DeviceContext);

  return (
    <Page
      content={
        <>
          <Header />
          <main>
            <RecommendationsDashboard device={device} />
          </main>
          {device==="mobile" ? null : <Footer />}
        </>
      } 
    />
  );
}
