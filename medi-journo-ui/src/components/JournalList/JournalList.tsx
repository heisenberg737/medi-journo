import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import JournalCard from '../JournalCard/JournalCard';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';
import { fetchJournalEntries } from '../db.service';
import DOMPurify from 'dompurify';


interface JournalListProps {
  cards?: any;
}

const JournalList: FC<JournalListProps> = () => {

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [loadingbar, setLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      if (user) {
        const entries = await fetchJournalEntries(user.uid);
        entries.sort((a: any, b: any) => b.updatedAt.seconds - a.updatedAt.seconds);
        setJournalEntries(entries);
        setLoading(false);
      }
    };
    loadEntries();
  }, [user]);

  return (
    <Box sx={{ p: 2 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>Welcome Back!</Typography>
              <Typography variant="h6" gutterBottom>Your Recent Journals:</Typography>
              {journalEntries.slice(0, 5).map(entry => (
                <Paper key={entry.id} elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">{entry.title}</Typography>
                  <Typography variant="body2">{new Date(entry.createdAt.seconds * 1000).toLocaleString()}</Typography>
                  <Typography 
                    variant="body1"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.content.slice(0, 100) + '...') }} 
                  />
                  <Button variant="text" onClick={() => navigate(`/journal/${entry.id}`)}>Read More</Button>
                </Paper>
              ))}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/journal/new')} 
                sx={{ mt: 2 }}
              >
                New Journal Entry
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {/* Additional section for all journal entries if needed */}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default JournalList;
