import { Box, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import JournalCard from '../JournalCard/JournalCard';


interface JournalListProps {
  cards?: any;
}

const JournalList: FC<JournalListProps> = (props: any) => {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = props.cards.filter((card: any) => 
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    card.date.includes(searchTerm)
  );

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  

  return (
    <Box sx={{ p: 2 }}>
    <TextField
      label="Search by Title or Date"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
      sx={{ mb: 2 }}
    />
    {filteredCards.map((card: any) => (
      <JournalCard key={card.id} card={card} />
    ))}
  </Box>
)
};

export default JournalList;
