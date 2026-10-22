import { useState } from 'react';
import CartContext from './CartContext';
import ProductItem from './ProductItem';
import CartSummary from './CartSummary';

const products = [
  { id: 1, name: 'Widget', price: 19.99 },
  { id: 2, name: 'Gadget', price: 29.99 },
  { id: 3, name: 'Bottle', price: 12.5 },
];

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems((items) => {
      const foundItem = items.find((item) => item.id === product.id);

      if (foundItem) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCartItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      <h1>Shopping Cart</h1>

      <h2>Products</h2>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}

      <CartSummary />
    </CartContext.Provider>
  );
}

export default App;
