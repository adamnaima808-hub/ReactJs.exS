import { useContext } from 'react';
import CartContext from './CartContext';

function CartSummary() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <h2>Cart Summary</h2>
      <p>Total items: {itemCount}</p>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} × {item.quantity} - ${(item.price * item.quantity).toFixed(2)}{' '}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <p>Total price: ${total.toFixed(2)}</p>
    </>
  );
}

export default CartSummary;
