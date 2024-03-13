import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Components/Auth/SignUp";
import Login from "./Components/Auth/Login";
import { FirebaseAuthProvider } from "./store/auth-context";
import { PathContextProvider } from "./store/path-context";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import Tnc from "./Components/Tnc";


function App() {
  
  return (
    <FirebaseAuthProvider>
      <PathContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Content />} />
            <Route path="/tnc" element={<Tnc/>}/>
          </Routes>
          <Footer/> 
        </Router>
      </PathContextProvider>
    </FirebaseAuthProvider>
    )
  }
export default App