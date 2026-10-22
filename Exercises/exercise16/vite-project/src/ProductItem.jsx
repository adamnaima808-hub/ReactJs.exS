import { useContext } from 'react';
import CartContext from './CartContext';

function ProductItem({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <p>
      {product.name} - ${product.price.toFixed(2)}{' '}
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </p>
  );
}

export default ProductItem;
