import React from "react";
import { PageWrap } from "~/features/ui";
import { Header, V4UpdateWarningBanner } from "~/features/ui";
import { RecommendationsDashboard } from "~/features/recommendations";


export default function Recommendations() {

  return (
    <PageWrap
      content={
        <>
          {/* 
          Unlike other pages, <main> and <footer> are declared 
          in this page's content component (<RecommendationsDashboard>).
          This is because the recommendations page hides the footer
          on mobile to give it an "app-like" feel.
          */}
          <V4UpdateWarningBanner />
          <Header />
          <RecommendationsDashboard />
        </>
      } 
    />
  );
}
