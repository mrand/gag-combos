import React from 'react';
import Header from 'features/ui/header';
import { HomepageComponent } from 'features/homepage';
import Footer from 'features/ui/footer';


export default function Homepage() {
  return (
    <div id='page' className='home custom-scrollbar'>
      <Header />
      <HomepageComponent />
      <Footer />
    </div>
  );
}
