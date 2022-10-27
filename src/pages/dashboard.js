import Header from 'components/header';
import Footer from 'components/footer';
import { DashboardComponent } from 'features/dashboard';


export default function Dashboard() {

  return (
    <div id='page' className='dashboard custom-scrollbar'>
      <Header />
      <DashboardComponent />
      <Footer />
    </div>
  );

}
