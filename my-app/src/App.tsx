import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ButtonAppBar from './components/button-app-bar';

import Home from './pages/Home';
import ContactUs from './pages/ContactUs';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    width: '100vw',
    maxWidth: '100vw',
    boxSizing: 'border-box',
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
