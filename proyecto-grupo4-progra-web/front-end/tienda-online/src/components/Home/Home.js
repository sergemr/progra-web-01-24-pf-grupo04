import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = ({ addToCart }) => (
  <div className={styles.Home} data-testid="Home">
    
    <main className={styles['main-content']}>
      <section className={styles['product-list']}>
        <h2>Artículos</h2>
        <div className={styles['product-items-container']}>
          {products.map((product) => (
            <div className={styles['product-item']} key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className={styles['product-details']}>
                <h3>{product.name}</h3>
                <p>Precio: {product.price}</p>
                <button>
                  <Link to={`/product/${product.id}`}>Ver detalles</Link>
                </button>
                <button onClick={() => addToCart(product)}>Agregar al carrito</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <p>&copy; 2024 TrendNet. Todos los derechos reservados.</p>
        <ul>
          <li>
            <a href="#">Política de privacidad</a>
          </li>
          <li>
            <a href="#">Términos y condiciones</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
);

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

const products = [
  {
    id: 1,
    name: 'Lámpara de Mesa',
    price: 29617.5,
    image: 'https://aliss.cr/media/catalog/product/5/a/5aa6444a5a272eb22a7da875a27f5dfd0af05178_file.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description: 'Lámpara de mesa de diseño moderno',
  },
  {
    id: 2,
    name: 'Lámpara Piso Decorativa',
    price: 46087.5,
    image: 'https://aliss.cr/media/catalog/product/2/e/2e68950bd9cc9c9a69444ed1918fb5c9b139a54f_file.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description: 'Lámpara de piso decorativa de diseño moderno',
  },
  {
    id: 3,
    name: 'Pantalon',
    price: 16087.5,
    image: 'https://caterpillarcr.com/cdn/shop/products/30065487_e0e35c1c-98a7-440b-be21-6865b3be8443.jpg?v=1695343979',
    description: '... Pantalon',
  },
  {
    id: 4,
    name: 'Camisa',
    price: 86087.5,
    image: 'https://caterpillarcr.com/cdn/shop/files/2610628_12815_Standard-Stone.jpg?v=1695391085',
    description: '... camisa',
  },
  {
    id: 5,
    name: 'Gorra',
    price: 42087.5,
    image: 'https://tottocr.vteximg.com.br/arquivos/ids/207561-1000-1000/AC60IND655-2210M-N01_1.jpg?v=637861757073570000',
    description: '... gorra',
  },
  {
    id: 6,
    name: 'Ventilador',
    price: 22087.5,
    image: 'https://walmartcr.vtexassets.com/arquivos/ids/538495/Ventilador-Durabrand-De-Pie-18-Pulgadas-75-W-1-43673.jpg?v=638424097787700000',
    description: '... ventilador',
  },
  {
    id: 7,
    name: 'Reloj de Pared',
    price: 12087.5,
    image: 'https://siman.vtexassets.com/arquivos/ids/3908536/104052492-1.jpg?v=638113232394500000',
    description: '... reloj de pared',
  },
  {
    id: 8,
    name: 'Camiseta',
    price: 82080.3,
    image: 'https://grafia.cr/wp-content/uploads/2020/05/crga-negro-frente.png',
    description: '... camiseta',
  },
];

export { Home, products };
