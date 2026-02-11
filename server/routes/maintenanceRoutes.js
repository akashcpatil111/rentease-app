const express = require('express');
const router = express.Router();
const {
    createMaintenanceRequest,
    getMaintenanceRequests,
    updateMaintenanceStatus,
} = require('../controllers/maintenanceController');
const { protect, admin } = require('../middleware/authMiddleware');

router
    .route('/')
    .post(protect, createMaintenanceRequest)
    .get(protect, getMaintenanceRequests);

router.route('/:id/status').put(protect, admin, updateMaintenanceStatus);

module.exports = router;
