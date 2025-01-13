import React from 'react';
import { Button, Typography } from '@mui/material';
import ImageBox from '../components/image-box';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  temp: {}
});

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.temp} variant="h3" gutterBottom>
        Hello, Material-UI with TypeScript!
      </Typography>
      <Button variant="contained" color="primary">
        MUI Button
      </Button>
      <ImageBox />
    </>
  );
};

export default Home;
