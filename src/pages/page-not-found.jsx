import React from "react";
import Page from "../features/ui/page";
import Header from "~/features/ui/header";
import NotFound from "../features/ui/not-found";
import Footer from "~/features/ui/footer";

export default function PageNotFound() {
  return (
    <Page
      content={
        <>
          <Header />
          <NotFound />
          <Footer />
        </>
      }
      // replace toon colors with cog colors
      style={{"--blue-400": "#243242", "--blue-600": "#14191f"}}
    />
  );
}
