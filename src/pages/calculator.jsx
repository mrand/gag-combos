import React from "react";
import { Page } from "~/features/ui";
import { Header } from "~/features/ui";
import { CogsList } from '~/features/cog/components';
import { GagsPicker } from '~/features/gag';
import { Footer } from "~/features/ui";


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
