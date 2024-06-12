import AppRoutes from './AppRoutes';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SideNavbar from './components/SideNavbar/SideNavbar';
import HomePage from './pages/Home/HomePage';

function App(){
  return (
    <>
      <Navbar/>
      <AppRoutes/>
      <Footer/>
      {/* <SideNavbar/> */}
    </>
  );
}

export default App;