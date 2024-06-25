import { AppBar, Box, Button, Card, CardContent, CircularProgress, Grid, Paper, Toolbar, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import { Support } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchJournalEntries } from '../db.service';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';


interface HomePageProps {}

const HomePage: FC<HomePageProps> = (props: any) => {

    const navigate = useNavigate();

//   return (<div>
//     <Box sx={{ flexGrow: 1, m: 2 }}>
//             <Typography variant="h2" gutterBottom align="center">
//                 Good Morning, [Username]!
//             </Typography>
//             <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
//                 What would you like to focus on today?
//             </Typography>
//             <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ minHeight: 140 }}>
//                         <CardContent>
//                             <Typography variant="h6">Start Journaling</Typography>
//                             <Button variant="contained" color="primary" fullWidth>Journal</Button>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ minHeight: 140 }}>
//                         <CardContent>
//                             <Typography variant="h6">Begin Meditation</Typography>
//                             <Button variant="contained" color="primary" fullWidth>Meditate</Button>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//             {/* Additional sections can be added here */}
//         </Box>
//     </div>)

return (
    <Box sx={{ flexGrow: 1, p: 3 }}> 
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Journal</Typography>
              <Typography variant="body1" gutterBottom>Reflect on your day, write down your thoughts and track your mood.</Typography>
              <Button variant="outlined" onClick={() => navigate('/journal')}>Start Journaling</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Meditate</Typography>
              <Typography variant="body1" gutterBottom>Engage in guided meditation sessions to relax and find inner peace.</Typography>
              <Button variant="outlined" onClick={() => navigate('/meditate')}>Begin Meditation</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>About Us</Typography>
              <Typography variant="body1" gutterBottom>Learn more about our mission and the team behind the app.</Typography>
              <Button variant="outlined" onClick={() => navigate('/about')}>Read More</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Support</Typography>
              <Typography variant="body1" gutterBottom>Need help? Reach out to our support team for assistance.</Typography>
              <Button variant="outlined" onClick={() => navigate('/support')}>Get Support</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>FAQs</Typography>
              <Typography variant="body1" gutterBottom>Find answers to frequently asked questions.</Typography>
              <Button variant="outlined" onClick={() => navigate('/faqs')}>View FAQs</Button>
            </Paper>
          </Grid>
        </Grid>
    </Box>
);
  };

export default HomePage;
