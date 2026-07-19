import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons, ProductImage } from '../components/Icons';

function Cart({ cart, updateQty, removeFromCart, clearCart }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('customerDetails');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: '',
      phone: '',
      address: '',
      pincode: ''
    };
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (newData) => {
    setFormData(newData);
    localStorage.setItem('customerDetails', JSON.stringify(newData));
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const savings = cart.reduce((sum, item) => sum + (item.mrp - item.price) * item.qty, 0);
  const gstAmount = Math.round(cartSubtotal * 0.18);
  const cartTotal = cartSubtotal + gstAmount;

  const productDetails = cart.map(item => item.name).join(' || ');
  const quantities = cart.map(item => item.qty).join(' || ');

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      if (clearCart) clearCart();
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order.</p>
            <p>We will connect with you within 1 day using WhatsApp or we will call you.</p>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Hidden iframe for form submission */}
      <iframe name="hidden_iframe" id="hidden_iframe" style={{display: 'none'}} title="hidden"></iframe>

      <div className="container">
        <div className="cart-page-header">
          <Link to="/" className="back-link">
            <Icons.ArrowLeft />
            <span>Continue Shopping</span>
          </Link>
          <h1>Your Cart ({cartCount} items)</h1>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any parts yet.</p>
            <Link to="/" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-img">
                    <ProductImage type={item.image} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <span className="cart-item-category">{item.subcategory}</span>
                        <h3>{item.name}</h3>
                        <p className="cart-item-desc">{item.desc}</p>
                      </div>
                      <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                        <Icons.Trash />
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="cart-qty-controls">
                        <button onClick={() => updateQty(item.id, -1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                      <div className="cart-item-pricing">
                        <span className="cart-item-total">₹{(item.price * item.qty).toLocaleString()}</span>
                        <span className="cart-item-unit">₹{item.price} each</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({cartCount} items)</span>
                <span>₹{(cartSubtotal + savings).toLocaleString()}</span>
              </div>
              <div className="summary-row discount">
                <span>Discount</span>
                <span>-₹{savings.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Price</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>GST (18%)</span>
                <span>+₹{gstAmount.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="delivery-note">To be decided</span>
              </div>
              <p className="delivery-info">We will decide delivery charges and connect with you once the order is placed.</p>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total (incl. GST)</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="summary-savings">
                You're saving ₹{savings.toLocaleString()} on this order!
              </div>

              {!showForm ? (
                <>
                  <button className="checkout-btn-full" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                  <div className="payment-info">
                    <p>✓ Secure checkout</p>
                    <p>✓ Cash on Delivery available</p>
                  </div>
                </>
              ) : (
                <form
                  className="checkout-form"
                  action="https://docs.google.com/forms/d/e/1FAIpQLSduHMRLBkr7XaoZHdLOrBAHUiC5coF38x39JuGBQXtzQFg8Gg/formResponse"
                  method="POST"
                  target="hidden_iframe"
                  onSubmit={handleFormSubmit}
                >
                  {/* Hidden fields for product data */}
                  <input type="hidden" name="entry.2005620554" value={productDetails} />
                  <input type="hidden" name="entry.1045781291" value={quantities} />
                  <input type="hidden" name="entry.973138217" value={`₹${cartTotal.toLocaleString()}`} />

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="entry.1065046570"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => updateFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="entry.1166974658"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => updateFormData({...formData, phone: e.target.value})}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Delivery Address</label>
                    <textarea
                      name="entry.839337160"
                      placeholder="Full address with landmark"
                      value={formData.address}
                      onChange={(e) => updateFormData({...formData, address: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>PIN Code</label>
                    <input
                      type="text"
                      name="entry.701881328"
                      placeholder="6-digit PIN code"
                      value={formData.pincode}
                      onChange={(e) => updateFormData({...formData, pincode: e.target.value})}
                      pattern="[0-9]{6}"
                      required
                    />
                  </div>
                  <button type="submit" className="checkout-btn-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
