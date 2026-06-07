import React from 'react';
import { Link } from 'react-router-dom';
import { Icons, ProductImage } from '../components/Icons';
import { products } from '../data/products';

function Home({ filter, setFilter, search, cart, addToCart, removeFromCart }) {
  const isInCart = (id) => cart.some(item => item.id === id);

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.subcategory.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Kiran Bore Walls</h1>
          <p>Premium bore wall parts & tools at the best prices</p>
          <div className="hero-features">
            <div className="feature">
              <span>✓</span> Genuine Parts
            </div>
            <div className="feature">
              <span>✓</span> Fast Delivery
            </div>
          </div>
          <div className="hero-cta">
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
              Type A
            </button>
            <button
              className={`filter-btn ${filter === 'typeB' ? 'active' : ''}`}
              onClick={() => setFilter('typeB')}
            >
              Type B
            </button>
            <button
              className={`filter-btn ${filter === 'typeC' ? 'active' : ''}`}
              onClick={() => setFilter('typeC')}
            >
              Type C
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
              <p>We are your trusted partner for quality bore wall parts and tools. With years of experience in the industry, we provide genuine parts for all types of bore wall pumps.</p>
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
                    <p>Same day dispatch on orders before 2PM</p>
                  </div>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">💰</span>
                  <div>
                    <h4>Best Prices</h4>
                    <p>Competitive prices with great discounts</p>
                  </div>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">🔄</span>
                  <div>
                    <h4>Easy Returns</h4>
                    <p>7-day hassle-free return policy</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">5000+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Brands</span>
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
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="contact-item">
              <Icons.Mail />
              <div>
                <h4>Email</h4>
                <p>info@kiranborewalls.com</p>
              </div>
            </div>
            <div className="contact-item">
              <Icons.Location />
              <div>
                <h4>Address</h4>
                <p>Kunchanoor Road, Jamkhandi, Karnataka 587301</p>
                <a href="https://maps.app.goo.gl/qpaPfWNdbfGjXd1i9" target="_blank" rel="noopener noreferrer" className="map-link">View on Google Maps</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
