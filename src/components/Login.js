import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [isRegistered, setIsRegistered ] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    console.log("isLoggedin value has changed:", isLoggedin);
  }, [isLoggedin]);
  
  const handleLogin = () => {

    

    if (!email || email.indexOf("@") === -1) {
      // Show an error message or handle the invalid email case here
      console.log("Invalid email");
      setIsValidEmail(false);
      console.log("the email is valid: ", isValidEmail);
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setIsLoggedin(true);
      navigate("/dashboard");   
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setIsRegistered(false);
      console.log("user not registered");
      console.log( errorMessage );
      
    });
  };

  const handleSignup = () => {
    navigate("/signup");
  }
  
  return (
      <>
      <div className="container">
        <h1 className="heading">NUS Laundry Tracker</h1>
      </div>

      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
              Login
            </Button>
            <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
              Sign up
            </Button>
            
            
              {isValidEmail === true && isRegistered === false && email.trim() !== '' && password.trim() !== '' && (
                <Typography variant="body1" color="error">
                  Wrong password or email. Please register an account
                </Typography>
              )}

              {isValidEmail === false && (
                <Typography variant="body1" color="error">
                Invalid email. Please include an '@' in the email address.
              </Typography>
              )}

              {isLoggedin === true && (
                <Typography variant="body1" color="error">
                  You have already signed in.
                </Typography>
              )}
          </form>
        </Paper>
      </Grid>
    </Grid>
      </>  
  );
};

export default Login;
