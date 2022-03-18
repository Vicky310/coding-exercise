import React, { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { createMockFormSubmission, saveLikedFormSubmission } from './service/mockServer';
import Toast from './components/toast/Toast';

export default function Header() {
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { vertical, horizontal, open } = state;
  const handleClick = (newState) => () => {
    const formData = createMockFormSubmission();
    setUserData(formData);
    setState({ open: true, ...newState });
  };
  const handleClose = () => {
    setIsError(false);
    setState({ ...state, open: false });
  };
  const handleSave = () => {
    setIsError(false);
    const response = saveLikedFormSubmission(userData);
    setIsLoading(true);
    response.then(data => {
      setState({ ...state, open: false });
      setIsLoading(false);
    }).catch(err => {
      setIsError(true);
      setIsLoading(false);
    })
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Toast Exercise
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleClick({
                vertical: 'bottom',
                horizontal: 'right',
              })}
            >
              New Submission
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Toast vertical={vertical} horizontal={horizontal} open={open} handleSave={handleSave}
        handleClose={handleClose} userData={userData ? userData.data : undefined} isLoading={isLoading}
        isError={isError} />
    </>
  );
}
