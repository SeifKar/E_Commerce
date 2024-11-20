const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews
} = require('../controllers/product.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router
    .route('/')
    .get(getProducts)
    .post(protect, authorize('seller', 'admin'), createProduct);

router
    .route('/:id')
    .get(getProduct)
    .put(protect, authorize('seller', 'admin'), updateProduct)
    .delete(protect, authorize('seller', 'admin'), deleteProduct);

router
    .route('/:id/reviews')
    .get(getProductReviews)
    .post(protect, createProductReview);

module.exports = router;
