// General Imports
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
//   state variables 
// setting the user's photo
 const [user,setUser] = useState({});
 const [file,setFile] = useState();



  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
