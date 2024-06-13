import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import Theater from './pages/Theater/Theater';
import Confirmation from './pages/Summary/Summary';
import Summary from './pages/Summary/Summary';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AuthRoute from './services/AuthRoutes';
import UnderConstruction from './pages/UnderConstruction/UnderConstruction';

export default function AppRoutes() {
    return (
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/underconstruction" element={<UnderConstruction />} />
            
            <Route 
              path="/theater" 
              element={
                <AuthRoute>
                  <Theater/>
              </AuthRoute>
              } />

            <Route 
              path="/summary" 
              element={
                <AuthRoute>
                  <Summary />
                </AuthRoute>
            } />


          </Routes>

);
}
