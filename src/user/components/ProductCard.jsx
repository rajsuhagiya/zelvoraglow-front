import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    const btn = e.currentTarget;
    btn.textContent = "✓ Added!";
    btn.classList.add("added");
    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.classList.remove("added");
    }, 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <div className="card-overlay">
          <button className="add-cart-btn" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-price">${product.price}</span>
          <span className="product-rating">
            ⭐ {product.rating} ({product.reviews})
          </span>
        </div>
      </div>
    </Link>
  );
}
