import * as React from 'react';
import { AppBar, Button, Toolbar, Typography, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { fetchFirmName } from '../services/Contentful/contentfulFirmName'; // Import the fetch function
import { useEffect, useState } from 'react';

const ButtonAppBar: React.FC = () => {
  // Get the theme object and the screen width breakpoint
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // 'sm' is the breakpoint for small screens

  const [firmName, setFirmName] = useState<string>('');

  // Fetch the firmName from Contentful on component mount
  useEffect(() => {
    const getFirmName = async () => {
      const name = await fetchFirmName(); // Call the service to get firm name
      setFirmName(name); // Update the state with the fetched name
    };

    getFirmName(); // Fetch firm name when the component mounts
  }, []);

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {firmName} {/* Display the fetched firm name */}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
