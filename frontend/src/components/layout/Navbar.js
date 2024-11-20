import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box } from '@mui/material';
import { ShoppingCart, Person, Dashboard } from '@mui/icons-material';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar className="container">
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 600,
            flexGrow: 1,
          }}
        >
          TUZO
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/products"
            color="inherit"
            sx={{ '&:hover': { color: 'secondary.main' } }}
          >
            Products
          </Button>

          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
            sx={{ '&:hover': { color: 'secondary.main' } }}
          >
            <Badge badgeContent={cartItems?.length || 0} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton
                component={Link}
                to="/profile"
                color="inherit"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                <Person />
              </IconButton>
              <IconButton
                component={Link}
                to="/dashboard"
                color="inherit"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                <Dashboard />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="secondary"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
