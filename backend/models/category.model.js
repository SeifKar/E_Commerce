const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        maxLength: [50, 'Category name cannot exceed 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Category description is required']
    },
    slug: {
        type: String,
        unique: true
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        default: null
    },
    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    level: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    metadata: {
        title: String,
        description: String,
        keywords: [String]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for getting subcategories
categorySchema.virtual('subcategories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent'
});

// Create slug before saving
categorySchema.pre('save', function(next) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    next();
});

module.exports = mongoose.model('Category', categorySchema);
