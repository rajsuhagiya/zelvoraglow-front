import { Link } from "react-router-dom";
import { products } from "../../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featured = products.filter((p) => p.badge);

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">✦ Luxury Skincare & Cosmetics</p>
          <h1 className="hero-title">
            Reveal Your
            <br />
            <span className="hero-title-glow">Radiant Glow</span>
          </h1>
          <p className="hero-subtitle">
            Formulated with rare botanicals and cutting-edge science —<br />
            ZelvoraGlow is where luxury meets results.
          </p>
          <div className="hero-ctas">
            <Link to="/shop" className="btn-hero-primary">
              Shop Now
            </Link>
            <a href="#about" className="btn-hero-ghost">
              Our Story
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>50K+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>100%</strong>
              <span>Cruelty Free</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>4.9★</strong>
              <span>Avg Rating</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-blob" />
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80"
            alt="ZelvoraGlow hero"
            className="hero-img"
          />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[
            "✦ Cruelty Free",
            "✦ Vegan Formula",
            "✦ Dermatologist Tested",
            "✦ Clean Ingredients",
            "✦ Sustainable Packaging",
            "✦ Cruelty Free",
            "✦ Vegan Formula",
            "✦ Dermatologist Tested",
            "✦ Clean Ingredients",
            "✦ Sustainable Packaging",
          ].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      <section className="section" id="featured">
        <div className="section-header">
          <h2>Bestsellers & New Arrivals</h2>
          <Link to="/shop" className="see-all">
            See All →
          </Link>
        </div>
        <div className="products-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80"
            alt="about"
          />
        </div>
        <div className="about-content">
          <p className="section-tag">Our Philosophy</p>
          <h2>
            Beauty Rooted in Nature,
            <br />
            Backed by Science
          </h2>
          <p>
            At ZelvoraGlow, we believe every formula should be as kind to the
            earth as it is effective on your skin. Our products are crafted with
            ethically sourced botanicals, clinically proven actives, and zero
            compromise.
          </p>
          <ul className="about-perks">
            <li>🌿 100% Vegan & Cruelty Free</li>
            <li>🧪 Dermatologist Tested</li>
            <li>♻️ Eco-Friendly Packaging</li>
            <li>🌍 Carbon Neutral Brand</li>
          </ul>
          <Link to="/shop" className="btn-hero-primary">
            Explore Products
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="section-header center">
          <h2>What Our Community Says</h2>
        </div>
        <div className="testimonials-grid">
          {[
            {
              name: "Ayesha M.",
              review:
                "The Velvet Glow Serum changed my skin in 2 weeks. My hyperpigmentation faded noticeably!",
              rating: 5,
            },
            {
              name: "Sophie L.",
              review:
                "I'm obsessed with the Midnight Repair Cream. I wake up and my skin looks SO plump and fresh.",
              rating: 5,
            },
            {
              name: "Priya K.",
              review:
                "Finally a foundation that matches my skin tone perfectly. The coverage is incredible.",
              rating: 5,
            },
          ].map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="t-stars">{"★".repeat(t.rating)}</div>
              <p>"{t.review}"</p>
              <strong>— {t.name}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <h2>Get in Touch</h2>
          <p>Have questions about our products? We'd love to hear from you.</p>
          <div className="contact-form">
            <input type="text" placeholder="Your Name" className="form-input" />
            <input
              type="email"
              placeholder="Your Email"
              className="form-input"
            />
            <textarea
              placeholder="Your Message"
              className="form-input"
              rows={4}
            />
            <button className="btn-hero-primary">Send Message</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand">
              <span className="brand-z">Z</span>elvora
              <span className="brand-glow">Glow</span>
            </span>
            <p>Luxury skincare for every skin story.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div className="footer-links">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          <div className="footer-links">
            <h4>Connect</h4>
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2025 ZelvoraGlow. All rights reserved. Made with ✦ and clean
            ingredients.
          </p>
        </div>
      </footer>
    </main>
  );
}
