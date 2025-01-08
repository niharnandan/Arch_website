import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import ButtonAppBar from './components/button-app-bar';
import ImageBox from './components/image-box';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    marginTop: '80px',
    width: '100vw'

  }
})
const App: React.FC = () => {

  const classes = useStyles()
  return (
    <div>
      <ButtonAppBar />
      {/* Main content container */}
      <Container className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Hello, Material-UI with TypeScript!
        </Typography>
        <Button variant="contained" color="primary">
          MUI Button
        </Button>
        <ImageBox />
      </Container>
    </div>
  );
};

export default App;