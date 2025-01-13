import React from 'react';
import { Button, Typography } from '@mui/material';
import ImageBox from '../components/image-box';

const Home: React.FC = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Hello, Material-UI with TypeScript!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }} // Add custom spacing or styling if necessary
      >
        MUI Button
      </Button>
      <ImageBox />
    </>
  );
};

export default Home;
