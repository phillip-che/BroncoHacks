// Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { getAuth, signOut } from "firebase/auth";
import StorefrontIcon from '@mui/icons-material/Storefront';
import '../styles/Navbar.css'; // Adjust the path based on your project structure

const Navbar: React.FC = () => {

  const handleLogoutClick = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      alert("Successfully Logged Out.")
    }).catch((error) => {
      // An error happened.
    });
  }

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
          <Button onClick={handleLogoutClick} color="inherit" style={{ textTransform: 'none'}}>Logout</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
