import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("zelvora_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const save = (items) => {
    setCartItems(items);
    localStorage.setItem("zelvora_cart", JSON.stringify(items));
  };

  const addToCart = (product, qty = 1) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      save(cartItems.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i));
    } else {
      save([...cartItems, { ...product, qty }]);
    }
  };

  const removeFromCart = (id) => save(cartItems.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    save(cartItems.map((i) => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => save([]);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
