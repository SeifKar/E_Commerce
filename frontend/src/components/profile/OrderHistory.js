import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const { orders, loading } = useSelector((state) => state.orders);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>No Orders Yet</h2>
        <p>When you place orders, they will appear here.</p>
        <Link to="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="order-number">Order #{order._id}</span>
              </div>
              <span className={`order-status ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
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
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <span>Total:</span>
                <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="order-actions">
                <Link
                  to={`/order/${order._id}`}
                  className="btn-secondary"
                >
                  View Details
                </Link>
                {order.status === 'processing' && (
                  <button className="btn-danger">Cancel Order</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
