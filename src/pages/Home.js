import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons, ProductImage } from '../components/Icons';
import { products } from '../data/products';

function Home({ filter, setFilter, search, cart, addToCart, removeFromCart }) {
  const navigate = useNavigate();
  const isInCart = (id) => cart.some(item => item.id === id || String(item.id).startsWith(`${id}-`));

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.subcategory.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Trust Banner */}
      <div className="trust-banner">
        <div className="trust-item">
          <span>🔒</span> Secure Payment
        </div>
        <div className="trust-item">
          <span>✓</span> 100% Genuine Products
        </div>
        <div className="trust-item">
          <span>🚚</span> Fast 2-Day Delivery
        </div>
        <div className="trust-item">
          <span>📞</span> 24/7 Support
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">Trusted by 10,000+ Customers</div>
          <h1>Kiran Bore Wells</h1>
          <p>Karnataka's leading supplier of premium bore well parts & tools</p>
          <div className="hero-features">
            <div className="feature">
              <span>✓</span> Genuine Parts
            </div>
            <div className="feature">
              <span>✓</span> Best Prices
            </div>
            <div className="feature">
              <span>✓</span> Expert Support
            </div>
          </div>
          <div className="hero-cta">
            <a href="#products" className="btn btn-primary">Shop Now</a>
            <a href="#contact" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header">
            <h2>Our Products</h2>
            <p>Find the right parts for your needs</p>
          </div>

          <div className="filter-tabs">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'typeA' ? 'active' : ''}`}
              onClick={() => setFilter('typeA')}
            >
              Lock and Nuts
            </button>
            <button
              className={`filter-btn ${filter === 'typeB' ? 'active' : ''}`}
              onClick={() => setFilter('typeB')}
            >
              Camera Set
            </button>
            <button
              className={`filter-btn ${filter === 'typeC' ? 'active' : ''}`}
              onClick={() => setFilter('typeC')}
            >
              Motor Spare
            </button>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className={`product-card ${product.soldOut ? 'sold-out' : ''}`}>
                <div className="product-badge">{product.subcategory}</div>
                {product.soldOut && <div className="sold-out-badge">Sold Out</div>}
                <Link to={`/product/${product.id}`} className="product-image">
                  <ProductImage type={product.image} />
                  {product.soldOut && <div className="sold-out-overlay"></div>}
                </Link>
                <div className="product-info">
                  <Link to={`/product/${product.id}`} className="product-name-link">
                    <h3 className="product-name">{product.name}</h3>
                  </Link>
                  <p className="product-desc">{product.desc}</p>
                  <div className="product-rating">
                    <Icons.Star />
                    <span>{product.rating}</span>
                  </div>
                  <div className="product-price">
                    <span className="price">₹{product.price.toLocaleString()}</span>
                    <span className="mrp">₹{product.mrp.toLocaleString()}</span>
                    <span className="discount">
                      {Math.round((1 - product.price / product.mrp) * 100)}% off
                    </span>
                  </div>
                  {product.soldOut ? (
                    <button className="add-btn sold-out-btn" disabled>
                      Out of Stock
                    </button>
                  ) : isInCart(product.id) ? (
                    <div className="cart-btn-group">
                      <span className="added-text">✓ Added</span>
                      <button className="remove-cart-btn" onClick={() => removeFromCart(product.id)}>
                        Remove
                      </button>
                    </div>
                  ) : product.id === 19 ? (
                    <button className="add-btn" onClick={() => navigate(`/product/${product.id}`)}>
                      Select Meters
                    </button>
                  ) : product.id === 35 ? (
                    <button className="add-btn" onClick={() => navigate(`/product/${product.id}`)}>
                      Select Package
                    </button>
                  ) : (
                    <button className="add-btn" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Why Choose Us</h2>
              <p>We are your trusted partner for quality bore well parts and tools. With years of experience in the industry, we provide genuine parts for all types of bore well pumps.</p>
              <div className="about-features">
                <div className="about-feature">
                  <span className="feature-icon">🏆</span>
                  <div>
                    <h4>Quality Assured</h4>
                    <p>100% genuine OEM & aftermarket parts</p>
                  </div>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">🚚</span>
                  <div>
                    <h4>Fast Delivery</h4>
                    <p>Average 2 days delivery</p>
                  </div>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">💰</span>
                  <div>
                    <h4>Best Prices</h4>
                    <p>Above ₹50,000: Get 5% off</p>
                  </div>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">🔄</span>
                  <div>
                    <h4>No Return</h4>
                    <p>Only replacement available</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">✓</span>
                <span className="stat-label">Trusted Company</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-header">
            <h2>Contact Us</h2>
            <p>Get in touch for inquiries and support</p>
          </div>
          <div className="contact-grid">
            <div className="contact-item">
              <Icons.Phone />
              <div>
                <h4>Phone</h4>
                <p>+91 78290 49303</p>
                <p>+91 72041 01558</p>
              </div>
            </div>
            <div className="contact-item">
              <Icons.Mail />
              <div>
                <h4>Email</h4>
                <p>kiranborewells3560@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <Icons.Location />
              <div>
                <h4>Address</h4>
                <p>Kunchanoor Road, Jamkhandi, Karnataka 587301</p>
                <a href="https://www.google.com/maps?q=16.506346,75.304366" target="_blank" rel="noopener noreferrer" className="map-link">View on Google Maps</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
