import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PaymentForm = ({ initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Card number validation (basic)
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Card name validation
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    // Expiry date validation
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const today = new Date();
      if (expiry < today) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // CVV validation
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="payment-form">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number *</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength="19"
            placeholder="1234 5678 9012 3456"
            className={errors.cardNumber ? 'error' : ''}
          />
          {errors.cardNumber && (
            <span className="error-message">{errors.cardNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="cardName">Cardholder Name *</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="John Doe"
            className={errors.cardName ? 'error' : ''}
          />
          {errors.cardName && (
            <span className="error-message">{errors.cardName}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date *</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="5"
              className={errors.expiryDate ? 'error' : ''}
            />
            {errors.expiryDate && (
              <span className="error-message">{errors.expiryDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV *</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="4"
              placeholder="123"
              className={errors.cvv ? 'error' : ''}
            />
            {errors.cvv && <span className="error-message">{errors.cvv}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>
            Back to Shipping
          </button>
          <button type="submit" className="btn-primary">
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
};

PaymentForm.propTypes = {
  initialData: PropTypes.shape({
    cardNumber: PropTypes.string.isRequired,
    cardName: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    cvv: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default PaymentForm;
