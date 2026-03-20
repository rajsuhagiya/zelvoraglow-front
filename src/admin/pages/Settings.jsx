import { useState } from "react";

const DEFAULT_SETTINGS = {
  brandName: "ZelvoraGlow",
  tagline: "Luxury Skincare & Cosmetics",
  logoUrl: "",
  primaryColor: "#c87c6e",
  accentColor: "#c9a96e",
  heroTitle: "Reveal Your Radiant Glow",
  heroSubtitle: "Formulated with rare botanicals and cutting-edge science.",
  freeShippingThreshold: 50,
  currency: "USD",
  contactEmail: "hello@zelvoraglow.com",
  contactPhone: "+1 (800) ZEL-GLOW",
  instagramUrl: "https://instagram.com/zelvoraglow",
  tiktokUrl: "https://tiktok.com/@zelvoraglow",
  pinterestUrl: "https://pinterest.com/zelvoraglow",
  metaTitle: "ZelvoraGlow — Luxury Cosmetics",
  metaDescription: "Discover ZelvoraGlow's range of luxury, cruelty-free cosmetics and skincare.",
  announcementBar: "Free shipping on orders over $50 ✦ 100% Cruelty Free",
  announcementBarEnabled: true,
  maintenanceMode: false,
};

export default function AdminSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("zelvora_settings");
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("brand");

  const set = (key, val) => setSettings((s) => ({ ...s, [key]: val }));

  const handleSave = () => {
    localStorage.setItem("zelvora_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const TABS = [
    { id: "brand",    label: "Brand & Logo" },
    { id: "content",  label: "Content" },
    { id: "store",    label: "Store Config" },
    { id: "social",   label: "Social & SEO" },
  ];

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your brand identity, content, and store configuration.</p>
        </div>
        <button className={`adm-btn-primary ${saved ? "saved" : ""}`} onClick={handleSave}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="adm-settings-layout">
        {/* SETTINGS TABS */}
        <div className="adm-settings-nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`adm-settings-tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="adm-settings-content">

          {/* BRAND & LOGO */}
          {activeTab === "brand" && (
            <div className="adm-card adm-settings-card">
              <h3 className="adm-section-title">Brand Identity</h3>

              <div className="adm-logo-preview">
                {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt="Logo" className="adm-logo-img" />
                ) : (
                  <div className="adm-logo-placeholder">
                    <span style={{ color: settings.primaryColor, fontSize: "1.8rem", fontFamily: "Georgia, serif" }}>
                      {settings.brandName}
                    </span>
                  </div>
                )}
              </div>

              <div className="adm-form-grid">
                <div className="adm-field adm-field-full">
                  <label>Logo URL</label>
                  <input
                    value={settings.logoUrl}
                    onChange={(e) => set("logoUrl", e.target.value)}
                    placeholder="https://yourdomain.com/logo.png"
                  />
                  <span className="adm-field-hint">Paste a direct image URL for your logo. Leave blank to use text logo.</span>
                </div>
                <div className="adm-field">
                  <label>Brand Name</label>
                  <input value={settings.brandName} onChange={(e) => set("brandName", e.target.value)} />
                </div>
                <div className="adm-field">
                  <label>Tagline</label>
                  <input value={settings.tagline} onChange={(e) => set("tagline", e.target.value)} />
                </div>
                <div className="adm-field">
                  <label>Primary Colour</label>
                  <div className="adm-color-row">
                    <input type="color" value={settings.primaryColor} onChange={(e) => set("primaryColor", e.target.value)} className="adm-color-input" />
                    <input value={settings.primaryColor} onChange={(e) => set("primaryColor", e.target.value)} className="adm-color-text" />
                  </div>
                </div>
                <div className="adm-field">
                  <label>Accent Colour</label>
                  <div className="adm-color-row">
                    <input type="color" value={settings.accentColor} onChange={(e) => set("accentColor", e.target.value)} className="adm-color-input" />
                    <input value={settings.accentColor} onChange={(e) => set("accentColor", e.target.value)} className="adm-color-text" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTENT */}
          {activeTab === "content" && (
            <div className="adm-card adm-settings-card">
              <h3 className="adm-section-title">Homepage Content</h3>
              <div className="adm-form-grid">
                <div className="adm-field adm-field-full">
                  <label>Announcement Bar Text</label>
                  <input value={settings.announcementBar} onChange={(e) => set("announcementBar", e.target.value)} />
                </div>
                <div className="adm-field">
                  <label>Announcement Bar</label>
                  <div className="adm-toggle-row">
                    <label className="adm-toggle">
                      <input type="checkbox" checked={settings.announcementBarEnabled} onChange={(e) => set("announcementBarEnabled", e.target.checked)} />
                      <span className="adm-toggle-slider"></span>
                    </label>
                    <span>{settings.announcementBarEnabled ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
                <div className="adm-field adm-field-full">
                  <label>Hero Title</label>
                  <input value={settings.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} />
                </div>
                <div className="adm-field adm-field-full">
                  <label>Hero Subtitle</label>
                  <textarea rows={3} value={settings.heroSubtitle} onChange={(e) => set("heroSubtitle", e.target.value)} />
                </div>
                <div className="adm-field">
                  <label>Contact Email</label>
                  <input type="email" value={settings.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
                </div>
                <div className="adm-field">
                  <label>Contact Phone</label>
                  <input value={settings.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STORE CONFIG */}
          {activeTab === "store" && (
            <div className="adm-card adm-settings-card">
              <h3 className="adm-section-title">Store Configuration</h3>
              <div className="adm-form-grid">
                <div className="adm-field">
                  <label>Currency</label>
                  <select value={settings.currency} onChange={(e) => set("currency", e.target.value)}>
                    <option value="USD">USD — US Dollar ($)</option>
                    <option value="CAD">CAD — Canadian Dollar ($)</option>
                    <option value="GBP">GBP — British Pound (£)</option>
                    <option value="EUR">EUR — Euro (€)</option>
                    <option value="AUD">AUD — Australian Dollar ($)</option>
                  </select>
                </div>
                <div className="adm-field">
                  <label>Free Shipping Threshold ($)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => set("freeShippingThreshold", parseFloat(e.target.value))}
                  />
                </div>
                <div className="adm-field adm-field-full">
                  <label>Maintenance Mode</label>
                  <div className="adm-toggle-row">
                    <label className="adm-toggle">
                      <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => set("maintenanceMode", e.target.checked)} />
                      <span className="adm-toggle-slider"></span>
                    </label>
                    <span className={settings.maintenanceMode ? "adm-warning-text" : ""}>
                      {settings.maintenanceMode ? "⚠ Store is in maintenance mode — customers will see a coming soon page." : "Store is live and accepting visitors."}
                    </span>
                  </div>
                </div>
              </div>

              <div className="adm-divider" />
              <h3 className="adm-section-title">Danger Zone</h3>
              <div className="adm-danger-zone">
                <div>
                  <strong>Reset All Settings</strong>
                  <p>Restore all settings to their default values.</p>
                </div>
                <button className="adm-btn-danger" onClick={() => { setSettings(DEFAULT_SETTINGS); localStorage.removeItem("zelvora_settings"); }}>
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* SOCIAL & SEO */}
          {activeTab === "social" && (
            <div className="adm-card adm-settings-card">
              <h3 className="adm-section-title">Social Media</h3>
              <div className="adm-form-grid">
                <div className="adm-field">
                  <label>Instagram URL</label>
                  <input value={settings.instagramUrl} onChange={(e) => set("instagramUrl", e.target.value)} />
                </div>
                <div className="adm-field">
                  <label>TikTok URL</label>
                  <input value={settings.tiktokUrl} onChange={(e) => set("tiktokUrl", e.target.value)} />
                </div>
                <div className="adm-field">
                  <label>Pinterest URL</label>
                  <input value={settings.pinterestUrl} onChange={(e) => set("pinterestUrl", e.target.value)} />
                </div>
              </div>

              <div className="adm-divider" />
              <h3 className="adm-section-title">SEO</h3>
              <div className="adm-form-grid">
                <div className="adm-field adm-field-full">
                  <label>Meta Title</label>
                  <input value={settings.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
                </div>
                <div className="adm-field adm-field-full">
                  <label>Meta Description</label>
                  <textarea rows={3} value={settings.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} />
                  <span className="adm-field-hint">{settings.metaDescription.length}/160 characters recommended</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
