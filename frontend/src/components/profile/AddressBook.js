import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../../slices/addressSlice';

const AddressBook = () => {
  const dispatch = useDispatch();
  const { addresses, loading } = useSelector((state) => state.addresses);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false,
  });
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (editingId) {
          // await dispatch(updateAddress({ id: editingId, ...formData })).unwrap();
        } else {
          // await dispatch(addAddress(formData)).unwrap();
        }
        resetForm();
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          submit: error.message,
        }));
      }
    }
  };

  const handleEdit = (address) => {
    setEditingId(address._id);
    setFormData({
      fullName: address.fullName,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone,
      isDefault: address.isDefault,
    });
    setIsAddingNew(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        // await dispatch(deleteAddress(id)).unwrap();
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      // await dispatch(setDefaultAddress(id)).unwrap();
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      isDefault: false,
    });
    setEditingId(null);
    setIsAddingNew(false);
    setErrors({});
  };

  if (loading) {
    return <div className="loading">Loading addresses...</div>;
  }

  return (
    <div className="address-book">
      <div className="address-header">
        <h2>Address Book</h2>
        {!isAddingNew && (
          <button
            className="btn-primary"
            onClick={() => setIsAddingNew(true)}
          >
            Add New Address
          </button>
        )}
      </div>

      {isAddingNew ? (
        <div className="address-form">
          <h3>{editingId ? 'Edit Address' : 'Add New Address'}</h3>
          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}
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
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
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
              {errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
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
                {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
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
                {errors.state && (
                  <span className="error-message">{errors.state}</span>
                )}
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
                {errors.zipCode && (
                  <span className="error-message">{errors.zipCode}</span>
                )}
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
                {errors.country && (
                  <span className="error-message">{errors.country}</span>
                )}
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
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />
                Set as default address
              </label>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingId ? 'Save Changes' : 'Add Address'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="addresses-list">
          {(!addresses || addresses.length === 0) ? (
            <div className="no-addresses">
              <p>You haven't added any addresses yet.</p>
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address._id}
                className={`address-card ${address.isDefault ? 'default' : ''}`}
              >
                {address.isDefault && (
                  <span className="default-badge">Default</span>
                )}
                <div className="address-content">
                  <p className="name">{address.fullName}</p>
                  <p className="address-line">{address.address}</p>
                  <p className="city-state">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="country">{address.country}</p>
                  <p className="phone">{address.phone}</p>
                </div>
                <div className="address-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(address)}
                  >
                    Edit
                  </button>
                  {!address.isDefault && (
                    <>
                      <button
                        className="btn-default"
                        onClick={() => handleSetDefault(address._id)}
                      >
                        Set as Default
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(address._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AddressBook;
