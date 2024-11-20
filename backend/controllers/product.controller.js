const Product = require('../models/product.model');
const { ErrorResponse } = require('../middleware/error.middleware');

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Seller/Admin
exports.createProduct = async (req, res, next) => {
    try {
        req.body.seller = req.user.id;
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Product.countDocuments();

        const query = Product.find()
            .populate('category', 'name')
            .populate('seller', 'name')
            .skip(startIndex)
            .limit(limit);

        // Filtering
        if (req.query.category) {
            query.where('category').equals(req.query.category);
        }

        if (req.query.minPrice || req.query.maxPrice) {
            query.where('price').gte(req.query.minPrice || 0).lte(req.query.maxPrice || Infinity);
        }

        // Search
        if (req.query.search) {
            query.or([
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ]);
        }

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query.sort(sortBy);
        } else {
            query.sort('-createdAt');
        }

        const products = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: products.length,
            pagination,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .populate('seller', 'name');

        if (!product) {
            return next(new ErrorResponse('Product not found', 404));
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Seller/Admin
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorResponse('Product not found', 404));
        }

        // Make sure user is product seller or admin
        if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse('Not authorized to update this product', 403));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Seller/Admin
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorResponse('Product not found', 404));
        }

        // Make sure user is product seller or admin
        if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse('Not authorized to delete this product', 403));
        }

        await product.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createProductReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorResponse('Product not found', 404));
        }

        // Check if user already reviewed
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user.id.toString()
        );

        if (alreadyReviewed) {
            return next(new ErrorResponse('Product already reviewed', 400));
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user.id
        };

        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
        product.ratings =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
exports.getProductReviews = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorResponse('Product not found', 404));
        }

        res.status(200).json({
            success: true,
            data: product.reviews
        });
    } catch (error) {
        next(error);
    }
};
