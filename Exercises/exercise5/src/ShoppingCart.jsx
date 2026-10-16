import { useState } from "react";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleAddProduct = () => {
    if (productName.trim() !== "" && productPrice.trim() !== "") {
      const newProduct = {
        Id: Date.now(),
        name: productName.trim(),
        price: parseFloat(productPrice).toFixed(2),
        quantity: 1,
      };

      setProducts([...products, newProduct]);
      setProductName("");
      setProductPrice("");
    }
  };

  const removeProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.Id !== productId);
    setProducts(updatedProducts);
  };

  const increaseQuantity = (productId) => {
    const updatedProducts = products.map((product) =>
      product.Id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );

    setProducts(updatedProducts);
  };

  const decreaseQuantity = (productId) => {
    const updatedProducts = products
      .map((product) =>(product.Id === productId && product.quantity > 1 ?{ ...product, quantity: product.quantity - 1 } : product));

    setProducts(updatedProducts);
  };

  return (
    <div>
      <h2>Simple Shopping Cart</h2>
      <div>
        <h3>Add a Product</h3>
        <input
          type="text"
          placeholder="Product"
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {products.length > 0 ? (
        <div>
          <h3>Products in Cart</h3>
          <ul>
            {products.map((product) => (
              <li key={product.Id}>
                <strong>{product.name}</strong> - ${product.price}
                <div>
                  Quantity:
                  <button onClick={() => decreaseQuantity(product.Id)}>-</button>
                  {product.quantity}
                  <button onClick={() => increaseQuantity(product.Id)}>+</button>
                </div>
                <button onClick={() => removeProduct(product.Id)}>Remove</button>
              </li>
            ))}
          </ul>
           <h3>Total: ${products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}</h3>
        </div>
      ) : (
        <p>This cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCart;