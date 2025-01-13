import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Import components
import ButtonAppBar from './components/button-app-bar';
import ImageBox from './components/image-box';

// Import page components
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';

// Material-UI styles
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    width: '100vw',
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      {/* ButtonAppBar will be shown on every page */}
      <ButtonAppBar />

      {/* Main content container */}
      <Container className={classes.root}>
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
