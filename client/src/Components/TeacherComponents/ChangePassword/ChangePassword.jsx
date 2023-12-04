import React, { useState } from 'react';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';

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
      toast.error("Password Don't Match!!");
      return;
    }

    axios
      .post(
        `http://localhost:5000/teacher-change-password/teacher-change-password/teacher-change-password/${auth.email}`,
        data
      )
      .then((response) => {
        // Password changed successfully
        // You can handle the response accordingly
        toast.success('Password Changed Successfully!!!!');
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
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={6}>
        {/* <Typography sx={{font:"Nunito",fontWeight:"bolder",marginBottom: "5px",}}>
          CHANGE PASSWORD
        </Typography> */}
        <Paper elevation={3} style={{ padding: '20px' }}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
            <Input
             name='currentPassword'
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="newPassword">New Password</InputLabel>
            <Input
            name='newPassword'
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="confirmNewPassword">
              Confirm New Password
            </InputLabel>
            <Input
            name='confirmNewPassword'
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </FormControl>
          <Button
            name="changePasswordButton"
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            style={{ marginTop: '20px' }}
          >
            Change Password
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
