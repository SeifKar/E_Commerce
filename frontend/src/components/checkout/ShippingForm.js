import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ShippingForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
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
    <div className="shipping-form">
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="state">State *</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={errors.state ? 'error' : ''}
            />
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="zipCode">ZIP Code *</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={errors.zipCode ? 'error' : ''}
            />
            {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? 'error' : ''}
            />
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="+1 234-567-8900"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

ShippingForm.propTypes = {
  initialData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ShippingForm;
