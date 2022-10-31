import React, { useContext } from 'react';
import { PageSizeContext } from 'App';
import Header from 'features/ui/header';
import Footer from 'features/ui/footer';
import { DashboardComponent } from 'features/dashboard';


export default function Dashboard() {
  const pageSize = useContext(PageSizeContext);

  return (
    <div id='page' className='dashboard custom-scrollbar with-grid-bg'>
      <Header />
      <DashboardComponent />
      {/* Dashboard Special Case - no footer on mobile */}
      {pageSize==='mobile' ? null : <Footer />}
    </div>
  );

}
