const MaintenanceRequest = require('../models/MaintenanceRequest');

// @desc    Create new maintenance request
// @route   POST /api/maintenance
// @access  Private
const createMaintenanceRequest = async (req, res) => {
    const { rental, product, issueDescription } = req.body;

    try {
        const maintenanceRequest = new MaintenanceRequest({
            user: req.user._id,
            rental,
            product,
            issueDescription,
        });

        const createdRequest = await maintenanceRequest.save();
        res.status(201).json(createdRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all maintenance requests (Admin) or User's requests
// @route   GET /api/maintenance
// @access  Private
const getMaintenanceRequests = async (req, res) => {
    try {
        let requests;
        if (req.user.role === 'admin') {
            requests = await MaintenanceRequest.find({})
                .populate('user', 'name email')
                .populate('product', 'name')
                .populate('rental');
        } else {
            requests = await MaintenanceRequest.find({ user: req.user._id })
                .populate('product', 'name')
                .populate('rental');
        }
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update maintenance request status
// @route   PUT /api/maintenance/:id/status
// @access  Private/Admin
const updateMaintenanceStatus = async (req, res) => {
    try {
        const request = await MaintenanceRequest.findById(req.params.id);

        if (request) {
            request.status = req.body.status || request.status;
            const updatedRequest = await request.save();
            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: 'Maintenance request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMaintenanceRequest,
    getMaintenanceRequests,
    updateMaintenanceStatus,
};
