import './App.css';
import React from 'react';
// import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from './helpers/AuthContext';
import { useState } from "react";
// import axios from 'axios';

function App() {
  
  // Session Management
	const [authState, setAuthState]=useState(false);


  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path="/about" exact element={<About/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/dashboard" exact element={<Dashboard/>} />
            <Route path="/profile" exact element={<Profile/>} />
            <Route path="/chat" exact element={<Chat/>} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
