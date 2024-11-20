const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        maxLength: [8, 'Price cannot exceed 8 characters'],
        default: 0.0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required']
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        maxLength: [5, 'Stock cannot exceed 5 characters'],
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    features: [{
        name: String,
        value: String
    }],
    specifications: [{
        name: String,
        value: String
    }],
    discount: {
        type: Number,
        default: 0
    },
    tags: [String],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create index for search
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
