import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import React, { FC } from 'react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import { Support } from '@mui/icons-material';
import LoginPage from '../LoginPage/LoginPage';


interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = (props: any) => {


  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Company Name
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)', // subtract AppBar height
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      }}>
        <LoginPage />
      </Box>
    </div>
  );

  };

export default LandingPage;
