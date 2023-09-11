import React from "react";
import Header from "~/features/ui/header";
import NotFound from "../features/ui/not-found";
import Footer from "~/features/ui/footer";


export default function PageNotFound() {
  return (
    <div 
      id="page" 
      // replace toon colors with cog colors
      style={{"--blue-400": "#243242", "--blue-600": "#14191f"}}
    >
      <Header />
      <NotFound />
      <Footer />
    </div>
  );
}
