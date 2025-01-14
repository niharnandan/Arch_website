import * as React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { fetchFirmName } from '../services/Contentful/contentfulFirmName';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import useIsMobile from '../services/Helpers/isMobile';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

interface ButtonAppBarProps {
  toggleTheme: () => void;
}

const ButtonAppBar: React.FC<ButtonAppBarProps> = ({ toggleTheme }) => {
  const classes = useStyles();
  const isMobile = useIsMobile();
  const [firmName, setFirmName] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getFirmName = async () => {
      const name = await fetchFirmName();
      setFirmName(name);
    };

    getFirmName();
  }, []);

  // Menu handling functions
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
            }}
          >
            {firmName}
          </Typography>
          {!isMobile && (
            <Button
              color="inherit"
              onClick={() => {
                navigate('/about');
              }}
              startIcon={<InfoIcon />}
            >
              About
            </Button>
          )}
          <Button
            color="inherit"
            size={isMobile ? 'small' : 'medium'}
            onClick={() => {
              navigate('/contact');
            }}
            startIcon={<ConnectWithoutContactIcon />}
          >
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {isMobile && (
          <MenuItem
            onClick={() => {
              handleNavigation('/');
            }}
          >
            Home
          </MenuItem>
        )}
        {isMobile && (
          <MenuItem
            onClick={() => {
              handleNavigation('/about');
            }}
          >
            About Us
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            toggleTheme();
            handleMenuClose();
          }}
        >
          Toggle Theme
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ButtonAppBar;
