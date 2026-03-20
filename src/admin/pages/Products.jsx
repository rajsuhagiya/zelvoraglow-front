import { useState } from "react";

const SEED_PRODUCTS = [
  { id:1, name:"Velvet Glow Serum",       category:"Serums",       price:58, rating:4.9, reviews:214, badge:"Bestseller", image:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80", description:"Our hero serum infused with 20% Vitamin C, hyaluronic acid, and rare rosehip extract.", ingredients:"Ascorbic Acid 20%, Hyaluronic Acid, Rosa Canina Fruit Oil", howToUse:"Apply 3–4 drops to clean skin every morning." },
  { id:2, name:"Lumière Silk Foundation",  category:"Face",         price:45, rating:4.8, reviews:189, badge:"New",        image:"https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=500&q=80", description:"A weightless buildable foundation with SPF 30.",                                        ingredients:"Titanium Dioxide, Iron Oxides, Dimethicone",             howToUse:"Apply with fingers, sponge, or brush." },
  { id:3, name:"Rose Petal Lip Balm",      category:"Lips",         price:18, rating:4.7, reviews:302, badge:null,         image:"https://images.unsplash.com/photo-1586495777744-4e6232bf4d3e?w=500&q=80", description:"Deeply nourishing lip balm with Bulgarian rose extract.",                              ingredients:"Rosa Damascena Flower Oil, Shea Butter, Tocopherol",     howToUse:"Apply liberally throughout the day." },
  { id:4, name:"Midnight Repair Cream",    category:"Moisturisers", price:72, rating:4.9, reviews:156, badge:"Luxury",     image:"https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80", description:"A rich night cream with retinol and peptides.",                                        ingredients:"Retinol 0.3%, Ceramides, Squalane, Niacinamide",         howToUse:"Apply a generous layer to face and neck each evening." },
  { id:5, name:"Sculpt & Define Brow Gel", category:"Eyes",         price:24, rating:4.6, reviews:98,  badge:null,         image:"https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=500&q=80", description:"Flexible-hold clear brow gel.",                                                       ingredients:"Hydroxypropyl Cellulose, Panthenol, Castor Oil",         howToUse:"Brush upward through brows." },
  { id:6, name:"Pore Perfecting Primer",   category:"Face",         price:32, rating:4.5, reviews:143, badge:null,         image:"https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80", description:"Silky primer that blurs pores for 16 hours.",                                         ingredients:"Cyclopentasiloxane, Dimethicone, Niacinamide",           howToUse:"Apply a small amount before foundation." },
  { id:7, name:"Glow Drops Illuminator",   category:"Face",         price:38, rating:4.8, reviews:201, badge:"Fan Fave",   image:"https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=500&q=80", description:"Liquid highlighter drops for a glass-skin glow.",                                    ingredients:"Mica, Glycerin, Aloe Vera, Vitamin C",                  howToUse:"Mix with foundation or apply directly." },
  { id:8, name:"Cherry Bloom Lip Gloss",   category:"Lips",         price:22, rating:4.7, reviews:178, badge:"New",        image:"https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=500&q=80", description:"High-shine non-sticky lip gloss with cherry extract.",                               ingredients:"Prunus Cerasus Extract, Castor Oil, Vitamin E",         howToUse:"Apply directly from the wand." },
];

const EMPTY = { id: null, name: "", category: "Face", price: "", rating: 4.5, reviews: 0, badge: "", image: "", description: "", ingredients: "", howToUse: "" };
const CATEGORIES = ["Face", "Lips", "Eyes", "Serums", "Moisturisers"];

export default function AdminProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("zelvora_admin_products");
    return saved ? JSON.parse(saved) : SEED_PRODUCTS;
  });
  const [showModal, setShowModal]   = useState(false);
  const [form, setForm]             = useState(EMPTY);
  const [isEdit, setIsEdit]         = useState(false);
  const [search, setSearch]         = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const save = (list) => {
    setProducts(list);
    localStorage.setItem("zelvora_admin_products", JSON.stringify(list));
  };

  const openAdd  = () => { setForm({ ...EMPTY, id: Date.now() }); setIsEdit(false); setShowModal(true); };
  const openEdit = (p) => { setForm(p); setIsEdit(true); setShowModal(true); };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    const product = { ...form, price: parseFloat(form.price) };
    if (isEdit) save(products.map((p) => p.id === form.id ? product : p));
    else        save([...products, { ...product, id: Date.now() }]);
    setShowModal(false);
  };

  const handleDelete = (id) => { save(products.filter((p) => p.id !== id)); setDeleteConfirm(null); };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your entire product catalogue.</p>
        </div>
        <button className="adm-btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>

      <div className="adm-card">
        <div className="adm-table-toolbar">
          <input className="adm-search" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <span className="adm-count">{filtered.length} products</span>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Product</th><th>Category</th><th>Price</th><th>Rating</th><th>Badge</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="adm-product-cell">
                      <img src={p.image} alt={p.name} className="adm-product-thumb" />
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td><span className="adm-pill">{p.category}</span></td>
                  <td><strong>${p.price}</strong></td>
                  <td>⭐ {p.rating}</td>
                  <td>{p.badge ? <span className="adm-badge-pill">{p.badge}</span> : <span className="adm-muted">—</span>}</td>
                  <td>
                    <div className="adm-row-actions">
                      <button className="adm-btn-edit"   onClick={() => openEdit(p)}>Edit</button>
                      <button className="adm-btn-delete" onClick={() => setDeleteConfirm(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="adm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h3>{isEdit ? "Edit Product" : "Add New Product"}</h3>
              <button onClick={() => setShowModal(false)} className="adm-modal-close">✕</button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-form-grid">
                <div className="adm-field">
                  <label>Product Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Velvet Glow Serum" />
                </div>
                <div className="adm-field">
                  <label>Category *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="adm-field">
                  <label>Price ($) *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                </div>
                <div className="adm-field">
                  <label>Rating (0–5)</label>
                  <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })} />
                </div>
                <div className="adm-field">
                  <label>Badge (optional)</label>
                  <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. New, Bestseller" />
                </div>
                <div className="adm-field adm-field-full">
                  <label>Image URL</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/..." />
                </div>
                <div className="adm-field adm-field-full">
                  <label>Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Product description..." />
                </div>
                <div className="adm-field adm-field-full">
                  <label>Ingredients</label>
                  <textarea rows={2} value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} placeholder="Ingredient list..." />
                </div>
                <div className="adm-field adm-field-full">
                  <label>How to Use</label>
                  <textarea rows={2} value={form.howToUse} onChange={(e) => setForm({ ...form, howToUse: e.target.value })} placeholder="Usage instructions..." />
                </div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-ghost"   onClick={() => setShowModal(false)}>Cancel</button>
              <button className="adm-btn-primary"  onClick={handleSave}>{isEdit ? "Save Changes" : "Add Product"}</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="adm-modal-overlay">
          <div className="adm-confirm-modal">
            <h3>Delete Product?</h3>
            <p>This action cannot be undone.</p>
            <div className="adm-modal-footer">
              <button className="adm-btn-ghost"  onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="adm-btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
