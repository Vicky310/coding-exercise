import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';

// Handles the display of toast messages.
export default function Toast({ horizontal, open, vertical, handleSave, handleClose, userData, isLoading, isError }) {

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={userData ? <div><p>{userData.firstName} {userData.lastName}</p><p>{userData.email}</p></div> : 'User data not submitted'}
      key={vertical + horizontal}
      action={
        <>
          {isError ? <Alert severity="error">Error saving data! <Button onClick={handleSave}>Try again!</Button> or <Button onClick={handleClose}>Close</Button></Alert> :
            <>
              {isLoading ? <CircularProgress /> :
                <Button color="primary" size="small" onClick={handleSave}>
                  Like
                </Button>
              }
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        </>
      }
    />
  );
}
