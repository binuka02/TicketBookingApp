import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <Footer />
      {/* <SideNavbar/> */}
    </Router>
  );
}

export default App;
