import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import React, { FC, useState } from 'react';
import AttachmentIcon from '@mui/icons-material/Attachment';


interface SupportPageProps {}

const SupportPage: FC<SupportPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueDetail: '',
    attachment: null
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event: any) => {
    setFormData({
      ...formData,
      attachment: event.target.files[0]
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you would handle form submission to the server or backend
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Submit your support request
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email ID"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Issue Detail"
            name="issueDetail"
            variant="outlined"
            multiline
            rows={4}
            value={formData.issueDetail}
            onChange={handleInputChange}
            margin="normal"
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<AttachmentIcon />}
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            Attach File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
;

export default SupportPage;
