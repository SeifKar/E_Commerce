import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../../slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, loading, error } = useSelector(
    (state) => state.cart
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    } else {
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartItem({ productId, quantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to continue shopping</p>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <Link to={`/product/${item.product}`}>
                  <h3>{item.name}</h3>
                </Link>
                <p className="price">${item.price}</p>
              </div>
              <div className="item-quantity">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.product, Number(e.target.value))
                  }
                >
                  {[...Array(5).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => handleRemoveItem(item.product)}
                className="remove-item"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Items ({totalItems}):</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="checkout-button">
            Proceed to Checkout
          </button>
          <button onClick={handleClearCart} className="clear-cart-button">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
