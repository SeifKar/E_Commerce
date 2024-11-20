import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutData, setCheckoutData] = useState({
    shipping: {
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, items, navigate]);

  const handleShippingSubmit = (shippingData) => {
    setCheckoutData((prev) => ({
      ...prev,
      shipping: shippingData,
    }));
    setActiveStep(1);
  };

  const handlePaymentSubmit = (paymentData) => {
    setCheckoutData((prev) => ({
      ...prev,
      payment: paymentData,
    }));
    setActiveStep(2);
  };

  const handlePlaceOrder = async () => {
    // Here you would typically:
    // 1. Process payment
    // 2. Create order in backend
    // 3. Clear cart
    // 4. Navigate to order confirmation
    try {
      // Placeholder for order creation
      // await dispatch(createOrder({ ...checkoutData, items, totalPrice }));
      // await dispatch(clearCart());
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const steps = [
    {
      title: 'Shipping',
      component: (
        <ShippingForm
          initialData={checkoutData.shipping}
          onSubmit={handleShippingSubmit}
        />
      ),
    },
    {
      title: 'Payment',
      component: (
        <PaymentForm
          initialData={checkoutData.payment}
          onSubmit={handlePaymentSubmit}
          onBack={() => setActiveStep(0)}
        />
      ),
    },
    {
      title: 'Review',
      component: (
        <OrderSummary
          checkoutData={checkoutData}
          items={items}
          totalPrice={totalPrice}
          onBack={() => setActiveStep(1)}
          onPlaceOrder={handlePlaceOrder}
        />
      ),
    },
  ];

  return (
    <div className="checkout-container">
      <div className="checkout-progress">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`progress-step ${
              index === activeStep ? 'active' : index < activeStep ? 'completed' : ''
            }`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>
      <div className="checkout-content">{steps[activeStep].component}</div>
    </div>
  );
};

export default Checkout;
