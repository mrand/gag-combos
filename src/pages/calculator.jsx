import React from "react";
import Page from "../features/ui/page";
import Header from "~/features/ui/header";
import { CogsList } from '~/features/cog/components';
import { GagsPicker } from '~/features/gag';
import Footer from "~/features/ui/footer";


export default function Calculator() {

  return (
    <Page
      content={
        <>
          <Header />
          <GagsPicker />
          <CogsList />
          <Footer />
        </>
      } 
    />
  );
}
