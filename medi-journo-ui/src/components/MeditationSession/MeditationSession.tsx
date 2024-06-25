import { Box, Typography, Slider, Button, Card, CardContent, CardActions } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';


interface MeditationSessionProps {}

const MeditationSession: FC<MeditationSessionProps> = () => {
  
  const [time, setTime] = useState<number>(5); // Default to 5 minutes
  const [remainingTime, setRemainingTime] = useState<number>(5 * 60);
  const [isMeditating, setIsMeditating] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isMeditating && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsMeditating(false);
      alert('Meditation session completed!');
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isMeditating, remainingTime]);

  const startMeditation = () => {
    setRemainingTime(time * 60); // Convert minutes to seconds
    setIsMeditating(true);
  };

  const stopMeditation = () => {
    setIsMeditating(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Meditation
      </Typography>

      {!isMeditating && (
        <Box>
          <Typography gutterBottom>Select Meditation Time (minutes)</Typography>
          <Slider
            value={time}
            min={1}
            max={60}
            onChange={(e, newValue) => setTime(newValue as number)}
            valueLabelDisplay="auto"
            marks
          />
          <Button variant="contained" color="primary" onClick={startMeditation}>
            Start Meditation
          </Button>
        </Box>
      )}

      {isMeditating && (
        <Box>
          <Typography variant="h5" gutterBottom>
           Time Remaining: {formatTime(remainingTime)}
          </Typography>
          <Button variant="contained" color="secondary" onClick={stopMeditation}>
            Stop
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Guided Meditations
        </Typography>
        {['Relaxation', 'Focus', 'Sleep'].map((meditation) => (
          <Card key={meditation} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{meditation} Meditation</Typography>
              <Typography variant="body2" color="textSecondary">
                Description of {meditation.toLowerCase()} meditation.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Start
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>)
}


export default MeditationSession;
