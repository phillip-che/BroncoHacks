// Navbar.tsx
import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import StorefrontIcon from '@mui/icons-material/Storefront';
import '../styles/Navbar.css'; // Adjust the path based on your project structure

const Navbar: React.FC = () => {

  const auth = getAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth])

  const handleLogoutClick = () => {
    signOut(auth).then(() => {
      alert("Successfully Logged Out.")
    }).catch((error) => {
      alert(error.message);
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
        {isLoggedIn ? 
          <div className="navbar-right-buttons">
            <a href="/createlisting">
              <Button color="inherit" style={{ textTransform: 'none', marginRight: '15px'}}>Create Listing</Button>
            </a>
            <Button onClick={handleLogoutClick} color="inherit" style={{ textTransform: 'none'}}>Logout</Button>
          </div>
        : null }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
