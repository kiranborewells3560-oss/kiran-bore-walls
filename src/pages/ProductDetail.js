import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductImage } from '../components/Icons';
import { products } from '../data/products';

function ProductDetail({ cart, addToCart, removeFromCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedMeters, setSelectedMeters] = useState(100);

  const product = products.find(p => p.id === parseInt(id));
  const isInCart = cart.some(item => item.id === parseInt(id) || String(item.id).startsWith(`${id}-`));

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const productImages = product.images || [product.image];
  const hasVideo = product.video;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const cableFullSetPrices = {
    100: 17500,
    150: 20000,
    200: 22800,
    250: 25600,
    300: 28500,
    400: 33800
  };

  const handleAddToCart = () => {
    if (product.id === 19) {
      // Camera Cable - add with meters info, unique ID for each meter variant
      const cableProduct = {
        ...product,
        id: `19-${selectedMeters}`,
        name: `${product.name} (${selectedMeters} meters)`,
        price: product.price * selectedMeters,
        mrp: product.mrp * selectedMeters
      };
      addToCart(cableProduct);
    } else if (product.id === 35) {
      // Cable Wire Full Set - fixed prices per meter option
      const cableSetProduct = {
        ...product,
        id: `35-${selectedMeters}`,
        name: `Cable Wire Full Set (${selectedMeters} mtr)`,
        price: cableFullSetPrices[selectedMeters],
        mrp: Math.round(cableFullSetPrices[selectedMeters] * 1.1)
      };
      addToCart(cableSetProduct);
    } else {
      for (let i = 0; i < qty; i++) {
        addToCart(product);
      }
    }
    navigate('/cart');
  };

  const discount = Math.round((1 - product.price / product.mrp) * 100);

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/#products">{product.category === 'typeA' ? 'Lock and Nuts' : product.category === 'typeB' ? 'Camera Set' : 'Motor Spare'}</Link>
          <span>›</span>
          <span>{product.subcategory}</span>
          <span>›</span>
          <span>{product.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="product-detail">
          {/* Left - Image Gallery */}
          <div className="product-gallery">
            {/* Thumbnails */}
            <div className="gallery-thumbnails">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index && !showVideo ? 'active' : ''}`}
                  onMouseEnter={() => { setSelectedImage(index); setShowVideo(false); }}
                  onClick={() => { setSelectedImage(index); setShowVideo(false); }}
                >
                  <ProductImage type={img} />
                </div>
              ))}
              {hasVideo && (
                <div
                  className={`thumbnail video-thumb ${showVideo ? 'active' : ''}`}
                  onMouseEnter={() => setShowVideo(true)}
                  onClick={() => setShowVideo(true)}
                >
                  <span className="video-icon">▶</span>
                  <span className="video-label">Video</span>
                </div>
              )}
            </div>

            {/* Main Image / Video */}
            <div className="gallery-main">
              <div className="product-detail-badge">{product.subcategory}</div>

              {showVideo && hasVideo ? (
                <div className="video-container">
                  <iframe
                    src={product.video}
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="main-image">
                  <ProductImage type={productImages[selectedImage]} />
                </div>
              )}

              {/* Image Counter */}
              {!showVideo && (
                <div className="image-counter">
                  {selectedImage + 1} / {productImages.length}
                </div>
              )}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="product-detail-info">
            <span className="product-detail-category">
              {product.category === 'typeA' ? 'Lock and Nuts' : product.category === 'typeB' ? 'Camera Set' : 'Motor Spare'} • {product.subcategory}
            </span>
            <h1>{product.name}</h1>

            <div className="product-detail-rating">
              <div className="stars">
                {product.rating} ★
              </div>
              <span className="rating-text">124 Ratings & 45 Reviews</span>
              {hasVideo && (
                <span className="has-video-badge" onClick={() => setShowVideo(true)}>
                  ▶ Watch Video
                </span>
              )}
            </div>

            <div className="product-detail-price">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
              <span className="original-price">₹{product.mrp.toLocaleString()}</span>
              <span className="discount-badge">{discount}% off</span>
            </div>
            <p className="gst-info">+ 18% GST applicable</p>

            <p className="product-detail-desc">{product.desc}</p>

            {/* Meter selector for Camera Cable */}
            {product.id === 19 && (
              <div className="meter-selector">
                <label>Select Meters:</label>
                <select
                  value={selectedMeters}
                  onChange={(e) => setSelectedMeters(Number(e.target.value))}
                  className="meter-dropdown"
                >
                  <option value={100}>100 meters - ₹{(product.price * 100).toLocaleString()}</option>
                  <option value={150}>150 meters - ₹{(product.price * 150).toLocaleString()}</option>
                  <option value={200}>200 meters - ₹{(product.price * 200).toLocaleString()}</option>
                  <option value={300}>300 meters - ₹{(product.price * 300).toLocaleString()}</option>
                  <option value={400}>400 meters - ₹{(product.price * 400).toLocaleString()}</option>
                </select>
                <p className="meter-info">Price: ₹{product.price} per meter</p>
              </div>
            )}

            {/* Meter selector for Cable Wire Full Set */}
            {product.id === 35 && (
              <div className="meter-selector">
                <label>Select Package:</label>
                <select
                  value={selectedMeters}
                  onChange={(e) => setSelectedMeters(Number(e.target.value))}
                  className="meter-dropdown"
                >
                  <option value={100}>100 mtr cable with full set - ₹17,500</option>
                  <option value={150}>150 mtr cable with full set - ₹20,000</option>
                  <option value={200}>200 mtr cable with full set - ₹22,800</option>
                  <option value={250}>250 mtr cable with full set - ₹25,600</option>
                  <option value={300}>300 mtr cable with full set - ₹28,500</option>
                  <option value={400}>400 mtr cable with full set - ₹33,800</option>
                </select>
              </div>
            )}

            {product.soldOut ? (
              <div className="sold-out-section">
                <div className="sold-out-message">
                  <span className="sold-out-icon">⚠️</span>
                  <div>
                    <h4>Currently Out of Stock</h4>
                    <p>This item is sold out. Please check back later or browse similar products.</p>
                  </div>
                </div>
                <button className="btn btn-large btn-notify">
                  NOTIFY ME WHEN AVAILABLE
                </button>
              </div>
            ) : (
              <div className="product-detail-actions">
                <div className="qty-selector">
                  <span>Quantity:</span>
                  <div className="qty-buttons">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)}>+</button>
                  </div>
                </div>

                <div className="action-buttons">
                  {isInCart ? (
                    <>
                      <button className="btn btn-large btn-added" onClick={() => navigate('/cart')}>
                        ✓ GO TO CART
                      </button>
                      <button className="btn btn-large btn-remove" onClick={() => removeFromCart(product.id)}>
                        REMOVE
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-large btn-primary" onClick={handleAddToCart}>
                        ADD TO CART
                      </button>
                      <button className="btn btn-large btn-buy" onClick={handleAddToCart}>
                        BUY NOW
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="product-guarantees">
              <div className="guarantee">
                <span>🚚</span>
                <div>
                  <strong>Fast Delivery</strong>
                  <p>Average 2 days</p>
                </div>
              </div>
              <div className="guarantee">
                <span>🔄</span>
                <div>
                  <strong>No Return</strong>
                  <p>Only replacement available</p>
                </div>
              </div>
              <div className="guarantee">
                <span>✓</span>
                <div>
                  <strong>Genuine Parts</strong>
                  <p>100% authentic</p>
                </div>
              </div>
              <div className="guarantee">
                <span>💰</span>
                <div>
                  <strong>5% Off</strong>
                  <p>Orders above ₹50,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Similar Products</h2>
            <div className="related-grid">
              {relatedProducts.map(p => (
                <Link to={`/product/${p.id}`} key={p.id} className="related-card">
                  <div className="related-image">
                    <ProductImage type={p.image} />
                  </div>
                  <div className="related-info">
                    <h4>{p.name}</h4>
                    <div className="related-rating">{p.rating} ★</div>
                    <p className="related-price">
                      <span>₹{p.price.toLocaleString()}</span>
                      <span className="related-mrp">₹{p.mrp.toLocaleString()}</span>
                      <span className="related-discount">{Math.round((1 - p.price / p.mrp) * 100)}% off</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
