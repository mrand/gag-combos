import React, { useContext } from "react";
import { PageSizeContext } from "~/App";
import Page from "../features/ui/page";
import Header from '~/features/ui/header';
import { CogsList } from '~/features/cog/components';
import { GagsPicker } from '~/features/gag';
import Footer from '~/features/ui/footer';


export default function Calculator() {
  const pageSize = useContext(PageSizeContext);

  return (
    <Page
      content={
        <>
          <Header />
          <GagsPicker pageSize={pageSize} />
          <CogsList />
          <Footer />
        </>
      } 
    />
  );
}
