import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import JournalCard from '../JournalCard/JournalCard';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';
import { fetchJournalEntries } from '../db.service';
import DOMPurify from 'dompurify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';



interface JournalListProps {
  cards?: any;
}

const JournalList: FC<JournalListProps> = () => {

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [loadingbar, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const [filters, setFilters] = useState({
    title: '',
    tag: '',
    createdAt: ''
  });


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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string | undefined; value: unknown; }>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name!]: value
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const filteredEntries = journalEntries.filter(entry => {
    return (
      (filters.title === '' || entry.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.tag === '' || entry.tags.includes(filters.tag)) &&
      (filters.createdAt === '' || new Date(entry.createdAt.seconds * 1000).toLocaleDateString() === new Date(filters.createdAt).toLocaleDateString())
    );
  });


  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  

  const handleNextPage = () => {
    if (currentPage < Math.ceil(journalEntries.length / entriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(Math.ceil(journalEntries.length / entriesPerPage));
  };


  const exportJournalAsPDF = async (entry: any) => {
    const { title, content, tags, id } = entry;

    const element = document.createElement('div');
    element.innerHTML = `
      <h1>${title}</h1>
      <h3>Tags: ${tags.join(', ')}</h3>
      <div>${content}</div>
    `;
  
    const options = {
      margin: 1,
      filename: `${title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf().from(element).set(options).save();
  };

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
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/journal/new')} 
                sx={{ mt: 2, mb: 2 }}
              >
                New Journal Entry
              </Button>
              <Typography variant="h6" gutterBottom>Your Recent Journals:</Typography>

              <Box component="form" sx={{ mb: 3 }}>
                <Typography variant='h5' gutterBottom sx={{mr: 2}}>Search By: </Typography>
                <TextField 
                  label="Title" 
                  name="title" 
                  value={filters.title} 
                  onChange={handleFilterChange} 
                  sx={{ mr: 2 }}
                />
                <TextField 
                  label="Tag" 
                  name="tag" 
                  value={filters.tag} 
                  onChange={handleFilterChange} 
                  sx={{ mr: 2 }}
                />
                <TextField 
                  label="Created At" 
                  name="createdAt" 
                  type="date" 
                  value={filters.createdAt} 
                  onChange={handleFilterChange} 
                  InputLabelProps={{ shrink: true }} 
                  sx={{ mr: 2 }}
                />
              </Box>

              {currentEntries.map(entry => (
                <Paper key={entry.id} id={`journal-${entry.id}`} elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">{entry.title}</Typography>
                  <Typography variant="body2">{new Date(entry.createdAt.seconds * 1000).toLocaleString()}</Typography>
                  <Typography 
                    variant="body1"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.content.slice(0, 100) + '...') }} 
                  />
                  <Button variant="text" onClick={() => navigate(`/journal/${entry.id}`)}>Read More</Button>
                  <Button variant="text" onClick={() => exportJournalAsPDF(entry)}>Export as PDF</Button>
                </Paper>
              ))}

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button onClick={handleFirstPage} disabled={currentPage === 1}>First</Button>
                <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                <Typography sx={{ mx: 2, alignSelf: 'center' }}>{currentPage}</Typography>
                <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(journalEntries.length / entriesPerPage)}>Next</Button>
                <Button onClick={handleLastPage} disabled={currentPage === Math.ceil(journalEntries.length / entriesPerPage)}>Last</Button>
              </Box>
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
