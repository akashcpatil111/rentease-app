const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Furniture', 'Appliances', 'Packages'],
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    pricePerMonth: {
        type: Number,
        required: true,
    },
    securityDeposit: {
        type: Number,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
