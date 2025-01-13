import React from 'react';
import { Button, Typography } from '@mui/material';
import ImageBox from '../components/image-box';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      marginTop: '80px',
      width: '100vw',
    },
  });
  

const Home: React.FC = () => {

    const classes = useStyles();

  return (
    <>
        <Typography variant="h3" gutterBottom>
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