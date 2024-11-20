const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    getCategoryTree
} = require('../controllers/category.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router
    .route('/')
    .get(getCategories)
    .post(protect, authorize('admin'), createCategory);

router
    .route('/:id')
    .get(getCategory)
    .put(protect, authorize('admin'), updateCategory)
    .delete(protect, authorize('admin'), deleteCategory);

router.get('/tree', getCategoryTree);

module.exports = router;
