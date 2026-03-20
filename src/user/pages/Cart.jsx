import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, total, clearCart } = useCart();

  if (cartItems.length === 0) return (
    <main className="cart-page empty">
      <div className="empty-cart">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-hero-primary">Start Shopping</Link>
      </div>
    </main>
  );

  return (
    <main className="cart-page">
      <h1 className="page-title">Your Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <span className="cart-item-cat">{item.category}</span>
                <h3>{item.name}</h3>
                <span className="cart-item-price">${item.price}</span>
              </div>
              <div className="cart-item-actions">
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <span className="cart-item-subtotal">${(item.price * item.qty).toFixed(2)}</span>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            </div>
          ))}
          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{total >= 50 ? "Free 🎉" : "$5.99"}</span></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${(total >= 50 ? total : total + 5.99).toFixed(2)}</span>
          </div>
          {total < 50 && (
            <p className="free-shipping-notice">
              Add ${(50 - total).toFixed(2)} more for free shipping!
            </p>
          )}
          <Link to="/checkout" className="btn-checkout">Proceed to Checkout →</Link>
          <Link to="/shop" className="continue-link">← Continue Shopping</Link>
        </div>
      </div>
    </main>
  );
}
