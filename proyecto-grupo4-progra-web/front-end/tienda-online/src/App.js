import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import axios from "axios";
import Usuario from "./components/Usuario/Usuario";
import { Home } from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import ProductDetails from'./components/ProductDetails/ProductDetails';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/Usuario" element={<Usuario />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;