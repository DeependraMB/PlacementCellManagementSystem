import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function ProfileUpdateMessage() {
  const [open, setOpen] = React.useState(true);
  const history = useNavigate();

  const storedSuccess = localStorage.getItem('profileUpdateSuccess');
  const showProfileUpdateMessage = storedSuccess !== 'false';

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateProfile = () => {
    // Redirect to the update profile page
    history('/stud-update-profile');
  };

  return (
    <React.Fragment>
      {showProfileUpdateMessage && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="profile-update-dialog-title"
          aria-describedby="profile-update-dialog-description"
        >
          <DialogTitle id="profile-update-dialog-title">
            Update Your Profile
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="profile-update-dialog-description">
              It's important to keep your profile information up to date. Please update your profile now.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={handleUpdateProfile} color="primary">
              Update Profile
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}
