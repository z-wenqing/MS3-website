// SignupSuccess.js
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupSuccess = () => {
  const navigate = useNavigate();

  // Redirect to the login page after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 2000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div>
      <h1>Signup successful!</h1>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default SignupSuccess;
