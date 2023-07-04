import React from 'react';
import Header from '~/features/ui/header';
import { CogsList } from '~/features/cog/components';
import { GagsPicker } from '~/features/gag/components';
import Footer from '~/features/ui/footer';


export default function Calculator() {
  return (
    <div id='page' className='calculator custom-scrollbar with-grid-bg'>
      <Header />
      <GagsPicker />
      <CogsList />
      <Footer />
    </div>
  );
}
