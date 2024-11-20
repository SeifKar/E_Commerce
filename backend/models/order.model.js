const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity cannot be less than 1']
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    shippingAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        },
        type: {
            type: String,
            required: true,
            enum: ['card', 'cash']
        },
        paidAt: {
            type: Date
        }
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        enum: [
            'Processing',
            'Confirmed',
            'Shipped',
            'Delivered',
            'Cancelled'
        ],
        default: 'Processing'
    },
    deliveredAt: Date,
    orderNotes: String,
    trackingNumber: String,
    estimatedDeliveryDate: Date,
    refund: {
        status: {
            type: String,
            enum: ['None', 'Requested', 'Approved', 'Rejected', 'Completed'],
            default: 'None'
        },
        reason: String,
        requestedAt: Date,
        processedAt: Date
    }
}, {
    timestamps: true
});

// Update product stock after order
orderSchema.pre('save', async function(next) {
    if (!this.isModified('orderStatus')) {
        return next();
    }

    if (this.orderStatus === 'Cancelled') {
        const Product = this.model('Product');
        
        for (const item of this.orderItems) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: +item.quantity }
            });
        }
    }
    
    next();
});

module.exports = mongoose.model('Order', orderSchema);
