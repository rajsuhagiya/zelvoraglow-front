import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [added, setAdded] = useState(false);

  if (!product)
    return (
      <main className="not-found">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn-hero-primary">
          Back to Shop
        </Link>
      </main>
    );

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="product-detail">
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
        <span>{product.name}</span>
      </div>

      <div className="pd-main">
        <div className="pd-img-wrap">
          <img src={product.image} alt={product.name} />
          {product.badge && (
            <span className="product-badge lg">{product.badge}</span>
          )}
        </div>

        <div className="pd-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="pd-rating">
            {"★".repeat(Math.round(product.rating))} {product.rating} ·{" "}
            {product.reviews} reviews
          </div>
          <div className="pd-price">${product.price}</div>

          <div className="pd-qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <button
            className={`btn-add-to-cart ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>

          <Link to="/cart" className="btn-view-cart">
            View Cart →
          </Link>

          <div className="pd-perks">
            <span>🚚 Free shipping over $50</span>
            <span>↩️ 30-day returns</span>
            <span>💎 Cruelty Free</span>
          </div>

          <div className="pd-tabs">
            {["description", "ingredients", "howToUse"].map((t) => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "howToUse"
                  ? "How to Use"
                  : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="pd-tab-content">{product[tab]}</div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>You May Also Like</h2>
          </div>
          <div className="products-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
