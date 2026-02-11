const express = require('express');
const router = express.Router();
const {
    createRental,
    getRentalById,
    getMyRentals,
    getRentals,
    updateRentalStatus,
    requestReturn
} = require('../controllers/rentalController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createRental).get(protect, admin, getRentals);
router.route('/myrentals').get(protect, getMyRentals);
router.route('/:id').get(protect, getRentalById);
router.route('/:id/status').put(protect, admin, updateRentalStatus);
router.route('/:id/return').put(protect, requestReturn);

module.exports = router;
