import './App.css';
import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Admin from './admin/App.js';
import AdminDashboard from "./admin/scenes/AdminDash";
import AdminBanApprove from "./admin/scenes/AdminBA";
import AdminDelete from "./admin/scenes/AdminDP";
import AdminCategory from "./admin/scenes/AdminAC"
import AdminAddsd from "./admin/scenes/AdminSD";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {


  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/ad' exact element={<Admin/>} />
            <Route path="/about" exact element={<About/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/dashboard" exact element={<Dashboard/>} />
            <Route path="/profile" exact element={<Profile/>} />
            <Route path="/chat" exact element={<Chat/>} />
            <Route path="/admin" exact element={<AdminDashboard/>} />
            <Route path="/admin/delete" exact element={<AdminDelete/>} />
            <Route path="/admin/banapprove" exact element={<AdminBanApprove/>} />
            <Route path="/admin/addsd" exact element={<AdminAddsd/>} />
            <Route path="/admin/category" exact element={<AdminCategory/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
