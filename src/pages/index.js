import React from 'react';
import Header from 'components/header';
import { HomepageComponent } from 'features/homepage';
import Footer from 'components/footer';


export default function Homepage() {
  return (
    <div id='page' className='home custom-scrollbar'>
      <Header />
      <HomepageComponent />
      <Footer />
    </div>
  );
}
