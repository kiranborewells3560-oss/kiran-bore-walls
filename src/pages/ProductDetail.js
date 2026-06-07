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

  const product = products.find(p => p.id === parseInt(id));
  const isInCart = cart.some(item => item.id === parseInt(id));

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

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
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
          <Link to="/#products">{product.category === 'typeA' ? 'Type A' : product.category === 'typeB' ? 'Type B' : 'Type C'}</Link>
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
              {product.category === 'typeA' ? 'Type A' : product.category === 'typeB' ? 'Type B' : 'Type C'} • {product.subcategory}
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

            <div className="offers-section">
              <h4>Available Offers</h4>
              <ul>
                <li><span className="offer-tag">Bank Offer</span> 10% off on SBI Credit Card</li>
                <li><span className="offer-tag">Special</span> Get extra 5% off on orders above ₹2000</li>
                <li><span className="offer-tag">Partner</span> Free delivery on first order</li>
              </ul>
            </div>

            <p className="product-detail-desc">{product.desc}</p>

            <div className="product-features">
              <h4>Highlights</h4>
              <ul>
                <li>✓ Premium quality material</li>
                <li>✓ Perfect fit guarantee</li>
                <li>✓ 6 months warranty</li>
                <li>✓ Easy installation</li>
              </ul>
            </div>

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
                  <strong>Free Delivery</strong>
                  <p>Orders above ₹500</p>
                </div>
              </div>
              <div className="guarantee">
                <span>🔄</span>
                <div>
                  <strong>7 Day Returns</strong>
                  <p>Easy return policy</p>
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
                <span>💳</span>
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure</p>
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
