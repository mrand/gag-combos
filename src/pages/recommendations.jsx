import React from "react";
import { Page } from "~/features/ui";
import { Header } from "~/features/ui";
import { RecommendationsDashboard } from "~/features/recommendations";


export default function Recommendations() {

  return (
    <Page
      content={
        <>
          <Header />
          {/* 
          Unlike other pages, <main> and <footer> are declared 
          in this page's content component (<RecommendationsDashboard>).
          This is because the recommendations page hides the footer
          on mobile to give it an "app-like" feel.
          */}
          <RecommendationsDashboard />
        </>
      } 
    />
  );
}
