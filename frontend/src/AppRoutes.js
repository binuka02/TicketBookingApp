import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import Theater from './pages/Theater/Theater';
import Confirmation from './pages/Summary/Summary';
import Summary from './pages/Summary/Summary';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

export default function AppRoutes() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/theater" element={<Theater />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Router>

);
}
