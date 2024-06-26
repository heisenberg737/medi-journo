import { Box, Button, Paper, TextField, TextareaAutosize, useMediaQuery, useTheme, Chip, Tooltip, Popover, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import './JournalEntry.css'
import { addJournalEntry, fetchJournalEntryById, updateJournalEntry } from '../db.service';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';
import { useParams } from 'react-router-dom';


interface JournalEntryProps {}

const JournalEntry: FC<JournalEntryProps> = (props: any) => {


  const [value, setValue] = useState('');
  // const [title, setTitle] = useState('');
  const [entryDate, setEntryDate] = useState<Date | null>(new Date());
  // const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [user, loading, error] = useAuthState(auth);
  const userId = user?.uid
  const { journalId } = useParams<{ journalId: string }>();
  const [entry, setEntry] = useState<any>({content: "", title: "", tags: [], userId: userId, createdAt: new Date()});
  const [loadingBar, setLoading] = useState(true);

  const modules = {
    // Quill modules configuration
  };

  const handleAddTag = () => {
    if (tagInput && entry.tags.length < 5) {
      entry.tags = [...entry.tags, tagInput];
      setEntry(entry)
      setTagInput('');
    }
  };

  



  useEffect(() => {
    const loadEntry = async () => {
      if (journalId && journalId!=undefined) {
        const entryData = await fetchJournalEntryById(journalId);
        setEntry(entryData);
        // setTags(entryData!.tags)
        // setTitle(entryData!.title)
        setValue(entryData!.content)
        // setEntryDate(entryData!.entryDate)
        setLoading(false);
      }
    };
    loadEntry();
  }, [journalId]);

  useEffect(() => {
      entry.content = value;
      setEntry(entry)
  }, [value])

  const handleDeleteTag = (index: number) => {
    const updatedTags = entry.tags.filter((_: any, i: any) => i !== index);
    entry.tags = updatedTags;
    setEntry(entry)
  };
  const handleStatisticsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const calculateReadingTime = (text: string) => {
    // Average reading speed in words per minute
    const averageWPM = 200;

    // Total word count
    const wordCount = text.trim().split(/\s+/).length;

    // Estimate reading time in minutes
    const readingTime = Math.ceil(wordCount / averageWPM);

    return readingTime;
  };


  const handleSubmit = async () => {
    if(journalId == null || journalId == undefined)
    {
        await addJournalEntry(entry)
        setValue("")
        setEntry({content: "", title: "", tags: [], userId: userId, createdAt: new Date(), updatedAt: new Date()})
    }

    else 
    {
      await updateJournalEntry(journalId, entry)
    }


  };

  const updateJournalData = (event: any, field: string) => {
    console.log("Here!")
    entry[field] = event.target.value
    setEntry((prevEntry: any) => ({
      ...prevEntry,
      [field]: event.target.value,
    }))
    console.log(entry)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'statistics-popover' : undefined;

  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Paper elevation={3} sx={{ p: 2, flex: 1, overflow: 'auto', position: 'relative' }}>
       {/* Journal Title */}
      <Typography variant="h4" gutterBottom>
        {entry.title}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter a title"
        label="Title"
        value={entry.title}
        onChange={(e) => updateJournalData(e, "title")}
        margin="normal"
      />
      <Box sx={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 10px)', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {entry.tags.map((tag: any, index: any) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(index)}
            />
          ))}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add tags (up to 5)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTag();
              }
            }}
          />
        </Box>
      </Box>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="What's on your mind today?"
        style={{ height: '80%', marginTop: 20 }}
        modules={{
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['color', 'background'],
            ['indent', 'outdent'],
          ],
        }}
      />
    </Paper>
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
    <Button onClick={handleStatisticsClick}>
          <InfoIcon />
        </Button>
      <Button 
        onClick={() => handleSubmit()}
        endIcon={<SendIcon />} 
        variant='contained' 
        color="primary"
      >
        Submit
      </Button>
      <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="body1">Word count: {value.trim().split(/\s+/).length}</Typography>
            <Typography variant="body1">Character count: {value.length}</Typography>
            <Typography variant="body1">Reading time: {calculateReadingTime(value)} min</Typography>
          </Box>
        </Popover>
    </Box>
  </Box>

  );
}

export default JournalEntry;
