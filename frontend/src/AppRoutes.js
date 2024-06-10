import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import Theater from './pages/Theater/Theater';
import Confirmation from './pages/Summary/Summary';
import Summary from './pages/Summary/Summary';

export default function AppRoutes() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/theater" element={<Theater />} />
          <Route path="/summary" element={<Summary />} />

        </Routes>
      </Router>

);
}
