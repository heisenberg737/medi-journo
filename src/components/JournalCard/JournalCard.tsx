import { Edit, Delete } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { FC } from 'react';


interface JournalCardProps {
  key: any,
  card: any
}

const JournalCard: FC<JournalCardProps> = (props: any) => (
  <Card sx={{maxWidth: 345}}>
      {/* <CardMedia
      component={"img"}
      height={"140"}
      alt='random image' /> */}
      
      <CardContent>
        <Typography gutterBottom variant='h5' component={"div"}>
          {props.card.title}
        </Typography>

        <Typography variant='body2'
        color={"text.secondary"}>
          {props.card.description}
        </Typography>

        <Typography variant='body2' color={"text.secondary"}>
        {props.card.date}
      </Typography>

      </CardContent>

      <CardActions style={{justifyContent: 'right'}}>
        <Button size='small' onClick={(event: any) => {}}><Edit /></Button>
        <Button size='small' onClick={(event: any) => {}}><Delete /></Button>
      </CardActions>
    </Card>
);

export default JournalCard;
