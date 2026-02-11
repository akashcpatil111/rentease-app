const Rental = require('../models/Rental');
const Product = require('../models/Product');

// @desc    Create new rental
// @route   POST /api/rentals
// @access  Private
const createRental = async (req, res) => {
    const { products, tenure, deliveryAddress, startDate } = req.body;

    if (products && products.length === 0) {
        res.status(400).json({ message: 'No products in rental' });
        return;
    } else {
        // Calculate end date based on startDate and tenure
        const start = new Date(startDate);
        const end = new Date(start);
        end.setMonth(start.getMonth() + tenure);

        let totalAmount = 0;

        // Verify products and calculate total
        const rentalProducts = [];
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                res.status(404).json({ message: `Product not found: ${item.product}` });
                return;
            }
            totalAmount += (product.pricePerMonth * item.quantity); // Monthly rent * quantity
            rentalProducts.push({
                product: item.product,
                quantity: item.quantity,
                tenure: tenure
            });
        }

        const rental = new Rental({
            user: req.user._id,
            products: rentalProducts,
            totalAmount,
            deliveryAddress,
            startDate: start,
            endDate: end,
            status: 'Pending'
        });

        const createdRental = await rental.save();
        res.status(201).json(createdRental);
    }
};

// @desc    Get rental by ID
// @route   GET /api/rentals/:id
// @access  Private
const getRentalById = async (req, res) => {
    const rental = await Rental.findById(req.params.id).populate(
        'user',
        'name email'
    ).populate('products.product');

    if (rental) {
        // Check if admin or owner
        if (req.user.role === 'admin' || rental.user._id.toString() === req.user._id.toString()) {
            res.json(rental);
        } else {
            res.status(403).json({ message: 'Not authorized to view this rental' });
        }

    } else {
        res.status(404).json({ message: 'Rental not found' });
    }
};

// @desc    Get logged in user rentals
// @route   GET /api/rentals/myrentals
// @access  Private
const getMyRentals = async (req, res) => {
    const rentals = await Rental.find({ user: req.user._id }).populate('products.product');
    res.json(rentals);
};

// @desc    Get all rentals
// @route   GET /api/rentals
// @access  Private/Admin
const getRentals = async (req, res) => {
    const rentals = await Rental.find({}).populate('user', 'id name').populate('products.product');
    res.json(rentals);
};

// @desc    Update rental status
// @route   PUT /api/rentals/:id/status
// @access  Private/Admin
const updateRentalStatus = async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (rental) {
        const oldStatus = rental.status;
        const newStatus = req.body.status || oldStatus;

        // Stock Management Logic
        if (newStatus === 'Active' && oldStatus !== 'Active') {
            // Decrease stock
            for (const item of rental.products) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.stock -= item.quantity;
                    await product.save();
                }
            }
        } else if ((newStatus === 'Completed' || newStatus === 'Cancelled') && oldStatus === 'Active') {
            // Increase stock (Returned)
            for (const item of rental.products) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.stock += item.quantity;
                    await product.save();
                }
            }
        }

        rental.status = newStatus;
        const updatedRental = await rental.save();
        res.json(updatedRental);
    } else {
        res.status(404).json({ message: 'Rental not found' });
    }
};

// @desc    Request return for a rental
// @route   PUT /api/rentals/:id/return
// @access  Private
const requestReturn = async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (rental) {
        // Ensure user owns the rental
        if (rental.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        if (rental.status !== 'Active') {
            res.status(400).json({ message: 'Only active rentals can be returned' });
            return;
        }

        rental.status = 'Return Requested';
        const updatedRental = await rental.save();
        res.json(updatedRental);
    } else {
        res.status(404).json({ message: 'Rental not found' });
    }
};

module.exports = {
    createRental,
    getRentalById,
    getMyRentals,
    getRentals,
    updateRentalStatus,
    requestReturn
};
