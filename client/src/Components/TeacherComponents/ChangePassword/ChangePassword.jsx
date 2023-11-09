import React, { useState } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from "../../../Context/AuthContext";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { auth, setAuth } = useAuth();

  const data = {
    currentPassword: currentPassword,
    newPassword: newPassword,
  };

  const handleChangePassword = () => {
    
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    axios.post(`http://localhost:5000/change-password/${auth.email}`, data)
    .then((response) => {
      // Password changed successfully
      // You can handle the response accordingly
      console.log('Password changed successfully');
      // Reset form fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    })
    .catch((error) => {
      // Handle errors (e.g., password change failed)
      console.error('Password change failed:', error);
      // You can display an error message to the user if needed
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="newPassword">New Password</InputLabel>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="confirmNewPassword">Confirm New Password</InputLabel>
          <Input
            id="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleChangePassword}>
          Change Password
        </Button>
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
