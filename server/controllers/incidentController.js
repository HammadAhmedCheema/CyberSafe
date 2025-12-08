const Incident = require('../models/incidentModel');

// @desc    Create a new incident report
// @route   POST /api/incidents
// @access  Private
exports.createIncident = async (req, res, next) => {
    try {
        console.log('createIncident request body:', req.body);
        console.log('createIncident request file:', req.file);
        const { incidentType, description } = req.body;
        
        let imagePath = '';
        if (req.file) {
            imagePath = req.file.path;
        }

        const incident = await Incident.create({
            user: req.user._id,
            incidentType,
            description,
            image: imagePath
        });

        res.status(201).json(incident);
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user's incidents
// @route   GET /api/incidents
// @access  Private
exports.getMyIncidents = async (req, res, next) => {
    try {
        const incidents = await Incident.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(incidents);
    } catch (error) {
        next(error);
    }
};

// @desc    Update an incident
// @route   PUT /api/incidents/:id
// @access  Private
exports.updateIncident = async (req, res, next) => {
    try {
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            res.status(404);
            throw new Error('Incident not found');
        }

        // Check for user ownership
        if (incident.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized');
        }

        const updatedIncident = await Incident.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedIncident);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an incident
// @route   DELETE /api/incidents/:id
// @access  Private
exports.deleteIncident = async (req, res, next) => {
    try {
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            res.status(404);
            throw new Error('Incident not found');
        }

        // Check for user ownership OR admin role
        if (incident.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('User not authorized');
        }

        await incident.deleteOne();

        res.json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all incidents (Public Feed)
// @route   GET /api/incidents/public
// @access  Public
exports.getAllIncidents = async (req, res, next) => {
    try {
        const incidents = await Incident.find()
            .populate('user', 'name') // Get user name
            .sort({ createdAt: -1 });
        res.json(incidents);
    } catch (error) {
        next(error);
    }
};

// @desc    Update incident status (Admin)
// @route   PUT /api/incidents/:id/status
// @access  Private/Admin
exports.updateIncidentStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            res.status(404);
            throw new Error('Incident not found');
        }

        // Check if user is admin (simple check, ideally use middleware)
        if (req.user.role !== 'admin') {
            res.status(403);
            throw new Error('Not authorized as admin');
        }

        incident.status = status;
        const updatedIncident = await incident.save();

        res.json(updatedIncident);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single incident by ID (Public)
// @route   GET /api/incidents/public/:id
// @access  Public
exports.getIncidentById = async (req, res, next) => {
    try {
        const incident = await Incident.findById(req.params.id).populate('user', 'name');

        if (!incident) {
            res.status(404);
            throw new Error('Incident not found');
        }

        res.json(incident);
    } catch (error) {
        next(error);
    }
};