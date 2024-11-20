const Order = require('../models/order.model');
const Product = require('../models/product.model');
const { ErrorResponse } = require('../middleware/error.middleware');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return next(new ErrorResponse('No order items', 400));
        }

        // Check if all products exist and have enough stock
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                return next(new ErrorResponse(`Product not found: ${item.product}`, 404));
            }
            if (product.stock < item.quantity) {
                return next(
                    new ErrorResponse(
                        `Not enough stock for product: ${product.name}. Available: ${product.stock}`,
                        400
                    )
                );
            }
        }

        // Create order
        const order = await Order.create({
            user: req.user.id,
            orderItems,
            shippingAddress,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        // Update product stock
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            product.stock -= item.quantity;
            await product.save();
        }

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('user', 'name email')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        );

        if (!order) {
            return next(new ErrorResponse('Order not found', 404));
        }

        // Make sure user is order owner or admin
        if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse('Not authorized to access this order', 403));
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort('-createdAt');

        // Calculate total amount of all orders
        const totalAmount = orders.reduce(
            (acc, order) => acc + order.totalPrice,
            0
        );

        res.status(200).json({
            success: true,
            count: orders.length,
            totalAmount,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorResponse('Order not found', 404));
        }

        if (order.orderStatus === 'Delivered') {
            return next(new ErrorResponse('Order has already been delivered', 400));
        }

        // Update status
        order.orderStatus = req.body.status;

        // If delivered, add deliveredAt date
        if (req.body.status === 'Delivered') {
            order.deliveredAt = Date.now();
        }

        await order.save();

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorResponse('Order not found', 404));
        }

        // Make sure user is order owner or admin
        if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse('Not authorized to cancel this order', 403));
        }

        // Check if order can be cancelled
        if (!['Processing', 'Confirmed'].includes(order.orderStatus)) {
            return next(
                new ErrorResponse(
                    `Order cannot be cancelled. Current status: ${order.orderStatus}`,
                    400
                )
            );
        }

        // Update order status
        order.orderStatus = 'Cancelled';
        await order.save();

        // Restore product stock
        for (const item of order.orderItems) {
            const product = await Product.findById(item.product);
            product.stock += item.quantity;
            await product.save();
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};
