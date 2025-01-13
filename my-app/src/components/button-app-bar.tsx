import * as React from 'react';
import { AppBar, Button, Toolbar, Typography, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { fetchFirmName } from '../services/Contentful/contentfulFirmName'; // Import the fetch function
import { useEffect, useState } from 'react';

const ButtonAppBar: React.FC = () => {
  // Get the theme object and the screen width breakpoint
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // 'md' is the breakpoint for small screens

  const [firmName, setFirmName] = useState<string>('');
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  // Fetch the firmName from Contentful on component mount
  useEffect(() => {
    const getFirmName = async () => {
      const name = await fetchFirmName(); // Call the service to get firm name
      setFirmName(name); // Update the state with the fetched name
    };

    getFirmName(); // Fetch firm name when the component mounts
  }, []);

  // Function to handle navigation on button click
  const handleContactUsClick = () => {
    navigate('/contact'); // Programmatically navigate to the Contact page
  };

  // Function to handle firm name click to go back to the homepage
  const handleFirmNameClick = () => {
    navigate('/'); // Navigate to the homepage when firm name is clicked
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* Make the firm name clickable and navigate to the homepage */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, cursor: 'pointer' }} 
            onClick={handleFirmNameClick} // Add onClick handler
          >
            {firmName}
          </Typography>
          {/* Button to trigger navigation to Contact Us page */}
          <Button color="inherit" onClick={handleContactUsClick}>
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
