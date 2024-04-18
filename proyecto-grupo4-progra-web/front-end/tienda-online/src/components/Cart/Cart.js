import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cart.module.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="success">Proceder al Pago</Button>
        <Button variant="contained" color="error" onClick={handleGoBack}>Volver</Button>
      </Stack>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

Cart.defaultProps = {};

export default Cart;
