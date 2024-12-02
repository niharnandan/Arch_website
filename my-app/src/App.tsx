import React from 'react';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import ButtonAppBar from './components/button-app-bar';
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
      </Container>
    </div>
  );
};

export default App;