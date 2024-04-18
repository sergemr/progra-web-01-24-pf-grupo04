import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../Home/Home';

const ProductDetails = () => {
  const { id } = useParams();
  const product = product.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Precio: {product.price}</p>
      <img src={product.image} alt={product.name} />
      <p>Descripción: {product.description}</p>
    </div>
  );
};

export default ProductDetails;