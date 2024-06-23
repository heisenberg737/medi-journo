import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';
import LoginPage from './components/LoginPage/LoginPage';
import LandingPage from './components/LandingPage/LandingPage';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import SupportPage from './components/SupportPage/SupportPage';
import HomePage from './components/HomePage/HomePage';
import MainLayout from './components/MainLayout/MainLayout';
import MeditationSession from './components/MeditationSession/MeditationSession';
import JournalEntry from './components/JournalEntry/JournalEntry';
import JournalList from './components/JournalList/JournalList';

function App() {

  const cardData = [
    { id: 1, title: "Card One", date: "2023-04-12", description: "This is the first card.", imageUrl: "https://source.unsplash.com/random/1" },
    { id: 2, title: "Card Two", date: "2023-04-13", description: "This is the second card.", imageUrl: "https://source.unsplash.com/random/2" },
    { id: 3, title: "Card Three", date: "2023-04-14", description: "This is the third card.", imageUrl: "https://source.unsplash.com/random/3" },
    // Add more cards as needed
  ];

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
}

  // return (
  //   // <div className='App'>
  //   //   <JournalList cards={cardData} />      
  //   // </div>
  //   <AppBar position="static">
  //           <Toolbar>
  //               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  //                   Company Name
  //               </Typography>
  //               <Button color="inherit">Home</Button>
  //               <Button color="inherit">About</Button>
  //               <Button color="inherit">Services</Button>
  //               <ProfileDetails />
  //           </Toolbar>
  //       </AppBar>
  // );

      return (
        <Router>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/home" replace /> : <LandingPage />} />
                <Route path="/" element={!user? <Navigate to="/login" replace /> : <MainLayout  />} > 
                  <Route index element={<HomePage />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route path='meditate' element={<MeditationSession />}></Route>
                  <Route path='journal' element={<JournalList />}></Route>
                  <Route path='journal/new' element={<JournalEntry />}></Route>
                  <Route path='journal/:journalId' element={<JournalEntry />}></Route>
                </Route>
                <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
            </Routes>
        </Router>
    );

}

export default App;
