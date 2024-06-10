import AppRoutes from './AppRoutes';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/Home/HomePage';

function App(){
  return (
    <>
      <Navbar/>
      <AppRoutes/>
      <Footer/>
    </>
  );
}

export default App;