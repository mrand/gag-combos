import React from "react";
import { Page } from "~/features/ui";
import { Header } from "~/features/ui";
import { NotFound } from "~/features/ui";
import { Footer } from "~/features/ui";

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
