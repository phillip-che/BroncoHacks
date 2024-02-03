// Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import '../styles/Navbar.css'; // Adjust the path based on your project structure

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar className="navbar-toolbar">
        <div className="navbar-left">
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <StorefrontIcon />
          </IconButton>
          <a href="/">
            <Button color="inherit" style={{ textTransform: 'none'}}>CPP Marketplace</Button>
          </a>
        </div>
        <div className="navbar-right-buttons">
          <a href="/createlisting">
            <Button color="inherit" style={{ textTransform: 'none', marginRight: '15px'}}>Create Listing</Button>
          </a>
          <a href="/login">
          <Button color="inherit" style={{ textTransform: 'none'}}>Logout</Button>
          </a>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
