import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OrderSummary = ({ checkoutData, items, totalPrice, onBack, onPlaceOrder }) => {
  const { shipping, payment } = checkoutData;

  const formatCardNumber = (number) => {
    const last4 = number.replace(/\s/g, '').slice(-4);
    return `**** **** **** ${last4}`;
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="summary-section">
        <h3>Shipping Information</h3>
        <div className="info-group">
          <p className="name">{shipping.fullName}</p>
          <p className="address">{shipping.address}</p>
          <p className="city-state">
            {shipping.city}, {shipping.state} {shipping.zipCode}
          </p>
          <p className="country">{shipping.country}</p>
          <p className="phone">{shipping.phone}</p>
        </div>
      </div>

      <div className="summary-section">
        <h3>Payment Information</h3>
        <div className="info-group">
          <p className="card-number">{formatCardNumber(payment.cardNumber)}</p>
          <p className="card-name">{payment.cardName}</p>
          <p className="card-expiry">Expires: {payment.expiryDate}</p>
        </div>
      </div>

      <div className="summary-section">
        <h3>Order Items</h3>
        <div className="order-items">
          {items.map((item) => (
            <div key={item.product} className="order-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <Link to={`/product/${item.product}`} className="item-name">
                  {item.name}
                </Link>
                <p className="item-price">${item.price}</p>
                <p className="item-quantity">Quantity: {item.quantity}</p>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="price-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>FREE</span>
        </div>
        <div className="summary-row">
          <span>Tax:</span>
          <span>${(totalPrice * 0.1).toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${(totalPrice * 1.1).toFixed(2)}</span>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back to Payment
        </button>
        <button type="button" className="btn-primary" onClick={onPlaceOrder}>
          Place Order
        </button>
      </div>

      <div className="order-notes">
        <p>
          By placing your order, you agree to our{' '}
          <Link to="/terms">Terms of Service</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  checkoutData: PropTypes.shape({
    shipping: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
    payment: PropTypes.shape({
      cardNumber: PropTypes.string.isRequired,
      cardName: PropTypes.string.isRequired,
      expiryDate: PropTypes.string.isRequired,
      cvv: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
};

export default OrderSummary;
