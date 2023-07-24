import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../styles.css";


const GoogleLogin = () => {
    const navigate = useNavigate();
  
    const handleGoogleLogin = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Logged in successfully!")
          navigate("/dashboard");
          // Handle successful login here (e.g., update state, redirect, etc.)
        })
        .catch((error) => {
          // Handle error here (e.g., display an error message)
          console.error("Error logging in with Google:", error);
        });
    };
  
    return (
      <Link to="/login">
        <button className="button" onClick={handleGoogleLogin}>Sign in with Google</button>
      </Link>
      
    ); 
};

export default GoogleLogin;