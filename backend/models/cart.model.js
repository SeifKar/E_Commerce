const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity cannot be less than 1'],
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    totalItems: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    appliedCoupon: {
        code: String,
        discount: Number,
        discountType: {
            type: String,
            enum: ['percentage', 'fixed']
        }
    }
}, {
    timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
    this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    this.totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Apply coupon discount if any
    if (this.appliedCoupon) {
        if (this.appliedCoupon.discountType === 'percentage') {
            this.totalPrice = this.totalPrice * (1 - this.appliedCoupon.discount / 100);
        } else {
            this.totalPrice = Math.max(0, this.totalPrice - this.appliedCoupon.discount);
        }
    }

    next();
});

module.exports = mongoose.model('Cart', cartSchema);
