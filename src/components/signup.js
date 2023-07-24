import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../config/firebase";

import { useNavigate } from "react-router-dom";
import {setDoc, collection, doc} from "firebase/firestore"

import SignupSuccess from './SignupSuccess';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [registeredUser, setRegisteredUser] = useState('');
  
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      const userId = user.uid;
      const userEmail = user.email;
      // ... and other properties.

      setRegisteredUser(userEmail);

      const registeredUserCollectionRef = doc(collection(db, 'users'), userId);
      await setDoc(registeredUserCollectionRef, {email: userEmail, location: 1});
      console.log('Content saved to Firestore with ID: ', userId);

      navigate("/signup/success");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Registration Error:', errorCode, errorMessage);
    }
  }

  return (
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
            <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
