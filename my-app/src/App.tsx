import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import ButtonAppBar from './components/button-app-bar';
import ImageCarousel from './components/image-carousel';
const App: React.FC = () => {
  return (
    <div>
      <ButtonAppBar />
      {/* Main content container */}
      <Container maxWidth="sm" style={{ marginTop: '80px' }}>
        <Typography variant="h3" gutterBottom>
          Hello, Material-UI with TypeScript!
        </Typography>
        <Button variant="contained" color="primary">
          MUI Button
        </Button>
        <ImageCarousel />
      </Container>
    </div>
  );
};

export default App;