import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderHistory from './OrderHistory';
import AddressBook from './AddressBook';
import ProfileEdit from './ProfileEdit';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Fetch user's orders when component mounts
    // dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="profile-info">
            <div className="profile-header">
              <h2>Profile Information</h2>
              <button
                className="btn-edit"
                onClick={() => setActiveTab('edit-profile')}
              >
                Edit Profile
              </button>
            </div>
            <div className="info-group">
              <label>Name</label>
              <p>{user.name}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="info-group">
              <label>Member Since</label>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        );
      case 'edit-profile':
        return <ProfileEdit onBack={() => setActiveTab('profile')} />;
      case 'orders':
        return <OrderHistory />;
      case 'addresses':
        return <AddressBook />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="user-info">
          <div className="avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
        <nav className="profile-nav">
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Information
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          <button
            className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            Address Book
          </button>
          <Link to="/change-password" className="nav-item">
            Change Password
          </Link>
        </nav>
      </div>
      <div className="profile-content">{renderContent()}</div>
    </div>
  );
};

export default Profile;
