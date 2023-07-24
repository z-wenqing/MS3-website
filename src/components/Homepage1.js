import React from "react";
import { useNavigate } from "react-router-dom";
export default function Homepage() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/");
    }
    return (
        <div>
          <h1>NUS Laundry Tracker</h1>
          <button onClick={handleLogin}>Log in</button>
        </div>
        
    );
}