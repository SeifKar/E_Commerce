const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrder,
    getMyOrders,
    getOrders,
    updateOrderStatus,
    cancelOrder
} = require('../controllers/order.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.route('/').post(protect, createOrder).get(protect, authorize('admin'), getOrders);
router.get('/myorders', protect, getMyOrders);
router.route('/:id').get(protect, getOrder);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
