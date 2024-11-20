const Category = require('../models/category.model');
const { ErrorResponse } = require('../middleware/error.middleware');

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            success: true,
            data: category
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
            .populate('parent', 'name')
            .populate({
                path: 'subcategories',
                select: 'name'
            });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('parent', 'name')
            .populate({
                path: 'subcategories',
                select: 'name'
            });

        if (!category) {
            return next(new ErrorResponse('Category not found', 404));
        }

        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!category) {
            return next(new ErrorResponse('Category not found', 404));
        }

        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return next(new ErrorResponse('Category not found', 404));
        }

        // Check if category has subcategories
        const hasSubcategories = await Category.findOne({ parent: req.params.id });
        if (hasSubcategories) {
            return next(
                new ErrorResponse(
                    'Cannot delete category with subcategories. Delete subcategories first',
                    400
                )
            );
        }

        await category.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get category tree
// @route   GET /api/categories/tree
// @access  Public
exports.getCategoryTree = async (req, res, next) => {
    try {
        const categories = await Category.find({ parent: null })
            .populate({
                path: 'subcategories',
                populate: {
                    path: 'subcategories'
                }
            });

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};
