import "./styles.css";
import "./navigation.css";

import React from "react";

// Import the functions you need from the SDKs you need


import { BrowserRouter as Router, Route, Routes,Link, Outlet } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Forum from "./components/Forum";
import Signup from "./components/signup";
import Login from "./components/Login";
import ProfileEdit from "./components/ProfileEdit";
import SignupSuccess from "./components/SignupSuccess";
import Homepage from "./components/Homepage1";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  return (
  
    <Router>
      <div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li> 
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </nav>

      
      <Routes>
        <Route path = "/" element={<Login />} />
        <Route path = "/home" element={<Homepage />} />
        <Route path = "/dashboard" element={<Dashboard />} />
        <Route path = "/forum" element={<Forum />} />
        <Route path = "/signup" element ={<Signup />} />
        <Route path = "/profile/edit" element={<ProfileEdit />} />
        <Route path = "/signup/success" element={<SignupSuccess />} />
        <Route path = "/leaderboard" element={<Leaderboard />} />
      </Routes>

    </div>
    </Router>
  );
}

