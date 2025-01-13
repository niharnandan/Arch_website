import * as React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { fetchFirmName } from '../services/Contentful/contentfulFirmName';
import { useEffect, useState } from 'react';

const ButtonAppBar: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [firmName, setFirmName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const getFirmName = async () => {
      const name = await fetchFirmName();
      setFirmName(name);
    };

    getFirmName();
  }, []);

  const handleContactUsClick = () => {
    navigate('/contact');
  };

  const handleFirmNameClick = () => {
    navigate('/');
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={handleFirmNameClick}
          >
            {firmName}
          </Typography>
          <Button color="inherit" onClick={handleContactUsClick}>
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
