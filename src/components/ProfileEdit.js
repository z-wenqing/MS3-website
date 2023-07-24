import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { auth, db } from '../config/firebase'; // Import your Firebase configuration
import {doc, collection, updateDoc} from "firebase/firestore"
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

import "../styles.css";

const ProfileEdit = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [ location, setLocation ] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch the user's current profile data
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      setLocation(user.location || '');
    }
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const user = auth.currentUser;
      
      if (user) {
        const id = user.uid;
        console.log("current user is: ", id)
        
        const userCollectionRef = collection(db, "users");
        const userToUpdateRef = doc(userCollectionRef, id);
        
        setLocation(location);
        setEmail(email);

        await updateDoc(userToUpdateRef, {
          location: location,
          email: email,
          
        });

        setSuccessMessage('Edit successfully!');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error saving content to Firestore:', error);
    }
  };

  return (
    <div className = "profile-edit-container">
      <div className = "form-container"> 
      <h1>Edit Profile</h1>
      {error && <div>{error}</div>}
      <Form onSubmit={handleUpdateProfile}>
        <Form.Group controlId="formDisplayName">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <button type="submit" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </Form>
      {successMessage && <p>{successMessage}</p>}
      </div>
      
    </div>
  );
};

export default ProfileEdit;
