import React, { useContext } from "react";
import { PageSizeContext } from "~/App";
import Header from '~/features/ui/header';
import { CogsList } from '~/features/cog/components';
import { GagsPicker } from '~/features/gag';
import Footer from '~/features/ui/footer';


export default function Calculator() {
  const pageSize = useContext(PageSizeContext);

  return (
    <div id='page' className='calculator custom-scrollbar with-grid-bg'>
      <Header />
      <GagsPicker pageSize={pageSize} />
      <CogsList />
      <Footer />
    </div>
  );
}
