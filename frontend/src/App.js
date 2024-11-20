import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './store';
import theme from './theme/theme';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Products from './components/products/Products';
import ProductDetails from './components/products/ProductDetails';
import Cart from './components/cart/Cart';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Checkout from './components/checkout/Checkout';

// Styles
import './styles/global.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Navbar />
            <main className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile/*"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
