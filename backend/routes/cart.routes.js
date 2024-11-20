const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyCoupon
} = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');

router
    .route('/')
    .get(protect, getCart)
    .post(protect, addToCart)
    .delete(protect, clearCart);

router
    .route('/:productId')
    .put(protect, updateCartItem)
    .delete(protect, removeFromCart);

router.post('/apply-coupon', protect, applyCoupon);

module.exports = router;
