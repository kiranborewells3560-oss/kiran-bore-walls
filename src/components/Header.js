import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons, ProductImage } from './Icons';
import { products } from '../data/products';

function Header({ cartCount, search, setSearch }) {
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredProducts = search.length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleProductClick = (productId) => {
    setShowSuggestions(false);
    setSearch('');
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigate('/#products');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="nav">
          <Link to="/" className="logo">
            <span className="logo-text">Kiran<span>BoreWalls</span></span>
          </Link>

          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for pump parts, tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <button type="submit" className="search-btn">
              <Icons.Search />
            </button>

            {showSuggestions && filteredProducts.length > 0 && (
              <div className="search-suggestions">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="search-item"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="search-item-icon">
                      <Icons.Search />
                    </div>
                    <div className="search-item-info">
                      <span className="search-item-name">{product.name}</span>
                      <span className="search-item-category">{product.subcategory}</span>
                    </div>
                    <div className="search-item-image">
                      <ProductImage type={product.image} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>

          <div className="header-actions">
            <div className="header-link">
              <span className="header-link-big">Account & Orders</span>
            </div>

            <button className="cart-btn" onClick={() => navigate('/cart')}>
              <div className="cart-icon-wrap">
                <Icons.Cart />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </div>
              <span className="cart-text">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
