import {
  Box,
  Button,
  Paper,
  TextField,
  Chip,
  Typography,
  Popover,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import SendIcon from "@mui/icons-material/Send";
import InfoIcon from "@mui/icons-material/Info";
import TagIcon from "@mui/icons-material/LocalOffer";
import "./JournalEntry.css";
import {
  addJournalEntry,
  fetchJournalEntryById,
  updateJournalEntry,
} from "../db.service";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import { useParams } from "react-router-dom";
import { extractEntities } from "../../utils/tagging";

interface JournalEntryProps {}

const JournalEntry: FC<JournalEntryProps> = () => {
  const [value, setValue] = useState("");
  const [entryDate, setEntryDate] = useState<Date | null>(new Date());
  const [tagInput, setTagInput] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [user, loading, error] = useAuthState(auth);
  const userId = user?.uid;
  const { journalId } = useParams<{ journalId: string }>();
  const [entry, setEntry] = useState<any>({
    content: "",
    title: "",
    tags: [],
    userId: userId,
    createdAt: new Date(),
  });
  const [loadingBar, setLoading] = useState(true);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [loadingTags, setLoadingTags] = useState(false); // New state for loading spinner

  const handleAddTag = (tag: string) => {
    if (tag && entry.tags.length < 5 && !entry.tags.includes(tag)) {
      entry.tags = [...entry.tags, tag];
      setEntry(entry);
    }
  };

  const handleDeleteTag = (index: number) => {
    const updatedTags = entry.tags.filter((_: any, i: any) => i !== index);
    entry.tags = updatedTags;
    setEntry(entry);
  };

  const handleStatisticsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const calculateReadingTime = (text: string) => {
    const averageWPM = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / averageWPM);
    return readingTime;
  };

  const handleSubmit = async () => {
    if (journalId == null || journalId == undefined) {
      await addJournalEntry(entry);
      setValue("");
      setEntry({
        content: "",
        title: "",
        tags: [],
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      await updateJournalEntry(journalId, entry);
    }
  };

  const updateJournalData = (event: any, field: string) => {
    entry[field] = event.target.value;
    setEntry((prevEntry: any) => ({
      ...prevEntry,
      [field]: event.target.value,
    }));
  };

  // Function to strip HTML tags from the input
  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const suggestTags = () => {
    const getTags = async () => {
      setLoadingTags(true); // Start loading
      try {
        // Clean the HTML to plain text
        const plainText = stripHtmlTags(value);
        const newTags = await extractEntities(plainText);
        setSuggestedTags(newTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoadingTags(false); // End loading
      }
    };
    if (value) {
      getTags();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "statistics-popover" : undefined;

  useEffect(() => {
    const loadEntry = async () => {
      if (journalId && journalId != undefined) {
        const entryData = await fetchJournalEntryById(journalId);
        setEntry(entryData);
        setValue(entryData!.content);
        setLoading(false);
      }
    };
    loadEntry();
  }, [journalId]);

  useEffect(() => {
    entry.content = value;
    setEntry(entry);
  }, [value]);

  return (
    <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
      <Paper elevation={3} sx={{ p: 2, flex: 1, overflow: "auto", position: "relative" }}>
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
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
              if (e.key === "Enter") {
                handleAddTag(tagInput);
                setTagInput("");
              }
            }}
          />
        </Box>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="What's on your mind today?"
          style={{ height: "80%", marginTop: 20 }}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "video"],
              ["color", "background"],
              ["indent", "outdent"],
            ],
          }}
        />
      </Paper>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button onClick={handleStatisticsClick}>
          <InfoIcon />
        </Button>
        <Button
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <Tooltip title="Suggest tags" arrow>
        <IconButton onClick={suggestTags} color="primary">
          {loadingTags ? <CircularProgress size={24} /> : <TagIcon />}
        </IconButton>
        </Tooltip>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">Word count: {value.trim().split(/\s+/).length}</Typography>
          <Typography variant="body1">Character count: {value.length}</Typography>
          <Typography variant="body1">Reading time: {calculateReadingTime(value)} min</Typography>
        </Box>
      </Popover>
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {suggestedTags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onClick={() => {
              handleAddTag(tag);
              setSuggestedTags((prevTags) => prevTags.filter((t) => t !== tag));
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default JournalEntry;
