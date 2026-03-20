import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", province: "", zip: "", country: "Canada",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });
  const [placed, setPlaced] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleOrder = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
    setTimeout(() => navigate("/"), 4000);
  };

  if (placed) return (
    <main className="checkout-success">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2>Order Placed!</h2>
        <p>Thank you for shopping with ZelvoraGlow. Your glowing skin journey begins now! 🌟</p>
        <p className="redirect-note">Redirecting to home...</p>
      </div>
    </main>
  );

  const shipping = total >= 50 ? 0 : 5.99;

  return (
    <main className="checkout-page">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-layout">
        <div className="checkout-form-wrap">
          <div className="checkout-steps">
            {["Shipping", "Payment", "Review"].map((s, i) => (
              <div key={i} className={`checkout-step ${step >= i + 1 ? "active" : ""}`}>
                <span>{i + 1}</span> {s}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="field"><label>First Name</label><input value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="Jane" /></div>
                <div className="field"><label>Last Name</label><input value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Doe" /></div>
              </div>
              <div className="field"><label>Email</label><input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@example.com" /></div>
              <div className="field"><label>Phone</label><input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 (555) 000-0000" /></div>
              <div className="field"><label>Address</label><input value={form.address} onChange={e => set("address", e.target.value)} placeholder="123 Main St" /></div>
              <div className="form-row">
                <div className="field"><label>City</label><input value={form.city} onChange={e => set("city", e.target.value)} placeholder="Toronto" /></div>
                <div className="field"><label>Province</label><input value={form.province} onChange={e => set("province", e.target.value)} placeholder="ON" /></div>
                <div className="field"><label>Postal Code</label><input value={form.zip} onChange={e => set("zip", e.target.value)} placeholder="M5V 2T6" /></div>
              </div>
              <button className="btn-next" onClick={() => setStep(2)}>Continue to Payment →</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h2>Payment Details</h2>
              <div className="field"><label>Name on Card</label><input value={form.cardName} onChange={e => set("cardName", e.target.value)} placeholder="Jane Doe" /></div>
              <div className="field"><label>Card Number</label><input value={form.cardNumber} onChange={e => set("cardNumber", e.target.value)} placeholder="•••• •••• •••• ••••" maxLength={19} /></div>
              <div className="form-row">
                <div className="field"><label>Expiry</label><input value={form.expiry} onChange={e => set("expiry", e.target.value)} placeholder="MM/YY" /></div>
                <div className="field"><label>CVV</label><input value={form.cvv} onChange={e => set("cvv", e.target.value)} placeholder="•••" maxLength={4} /></div>
              </div>
              <div className="payment-secure">🔒 Secured with 256-bit SSL encryption</div>
              <div className="step-btns">
                <button className="btn-back" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-next" onClick={() => setStep(3)}>Review Order →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form className="form-section" onSubmit={handleOrder}>
              <h2>Review & Place Order</h2>
              <div className="review-block">
                <h4>Shipping to:</h4>
                <p>{form.firstName} {form.lastName}</p>
                <p>{form.address}, {form.city}, {form.province} {form.zip}</p>
              </div>
              <div className="review-block">
                <h4>Payment:</h4>
                <p>Card ending in {form.cardNumber.slice(-4) || "••••"}</p>
              </div>
              <div className="step-btns">
                <button type="button" className="btn-back" onClick={() => setStep(2)}>← Back</button>
                <button type="submit" className="btn-place-order">Place Order ✦</button>
              </div>
            </form>
          )}
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="co-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <span>Qty: {item.qty}</span>
              </div>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="co-totals">
            <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? "Free 🎉" : `$${shipping}`}</span></div>
            <div className="summary-row total-row"><span>Total</span><span>${(total + shipping).toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </main>
  );
}
