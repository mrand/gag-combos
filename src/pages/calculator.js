import Header from 'features/ui/header';
import { CalculatorComponent } from 'features/calculator';
import Footer from 'features/ui/footer';


export default function Calculator() {
  return (
    <div id='page' className='calculator custom-scrollbar with-grid-bg'>
      <Header />
      <CalculatorComponent />
      <Footer />
    </div>
  );
}
