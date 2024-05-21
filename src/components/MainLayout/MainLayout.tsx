import { DarkMode, Support } from '@mui/icons-material';
import { AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import BookIcon from '@mui/icons-material/Book';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DarkModeSwitch from '../DarkModeSwitch/DarkModeSwitch';
import LightModeIcon from '@mui/icons-material/LightMode';


interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = () => {

  const navigate = useNavigate();

  const navigateToSupportPage = (event: any) => {
      navigate("/support");
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <AppBar position="static" elevation={1}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="journal" onClick={() => navigate('/journal')}>
                    <BookIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => navigate('/meditate')}>
                    <SelfImprovementIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="inherit" onClick={() => navigate('/about')}>
                    <InfoIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => navigate('/support')}>
                    <HelpIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => navigate('/faqs')}>
                    <QuestionAnswerIcon />
                </IconButton>
                <IconButton>
                    <ProfileDetails />
                </IconButton>
                <Button startIcon={<LightModeIcon />} color='inherit' endIcon={<DarkMode />}>
                <DarkModeSwitch />
                </Button>
            </Toolbar>
        </AppBar>

    <Outlet />
  </Box>
) 

  };

export default MainLayout;
