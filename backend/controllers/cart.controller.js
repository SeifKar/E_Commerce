const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const { ErrorResponse } = require('../middleware/error.middleware');

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return next(new ErrorResponse('Product not found', 404));
        }

        // Check if quantity is available
        if (product.stock < quantity) {
            return next(
                new ErrorResponse(
                    `Not enough stock. Available: ${product.stock}`,
                    400
                )
            );
        }

        // Get user's cart
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            // Create new cart if it doesn't exist
            cart = await Cart.create({
                user: req.user.id,
                items: [{
                    product: productId,
                    quantity,
                    price: product.price,
                    name: product.name,
                    image: product.images[0].url
                }]
            });
        } else {
            // Check if product already exists in cart
            const existingItem = cart.items.find(
                item => item.product.toString() === productId
            );

            if (existingItem) {
                // Update quantity if product exists
                existingItem.quantity = quantity;
            } else {
                // Add new item if product doesn't exist in cart
                cart.items.push({
                    product: productId,
                    quantity,
                    price: product.price,
                    name: product.name,
                    image: product.images[0].url
                });
            }

            await cart.save();
        }

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(200).json({
                success: true,
                data: {
                    items: [],
                    totalItems: 0,
                    totalPrice: 0
                }
            });
        }

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
exports.updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return next(new ErrorResponse('Cart not found', 404));
        }

        // Find item in cart
        const cartItem = cart.items.find(
            item => item.product.toString() === req.params.productId
        );

        if (!cartItem) {
            return next(new ErrorResponse('Item not found in cart', 404));
        }

        // Check if product has enough stock
        const product = await Product.findById(req.params.productId);
        if (product.stock < quantity) {
            return next(
                new ErrorResponse(
                    `Not enough stock. Available: ${product.stock}`,
                    400
                )
            );
        }

        // Update quantity
        cartItem.quantity = quantity;
        await cart.save();

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return next(new ErrorResponse('Cart not found', 404));
        }

        // Remove item from cart
        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return next(new ErrorResponse('Cart not found', 404));
        }

        cart.items = [];
        cart.totalItems = 0;
        cart.totalPrice = 0;
        cart.appliedCoupon = null;

        await cart.save();

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Apply coupon to cart
// @route   POST /api/cart/apply-coupon
// @access  Private
exports.applyCoupon = async (req, res, next) => {
    try {
        const { code } = req.body;

        // TODO: Implement coupon validation logic
        const coupon = {
            code: code,
            discount: 10,
            discountType: 'percentage'
        };

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return next(new ErrorResponse('Cart not found', 404));
        }

        cart.appliedCoupon = coupon;
        await cart.save();

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        next(error);
    }
};
