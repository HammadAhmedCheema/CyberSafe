const express = require('express');
const router = express.Router();
const { 
    createIncident, 
    getMyIncidents, 
    updateIncident, 
    deleteIncident,
    getAllIncidents,
    updateIncidentStatus,
    getIncidentById
} = require('../controllers/incidentController');
const { protect } = require('../middleware/authMiddleware');
const { validateIncidentCreation } = require('../middleware/validationMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route
router.get('/public', getAllIncidents);
router.get('/public/:id', getIncidentById);

// Protected routes
router.use(protect);

router.route('/')
    .get(getMyIncidents)
    .post(upload.single('image'), validateIncidentCreation, createIncident);

router.route('/:id')
    .put(updateIncident)
    .delete(deleteIncident);

router.put('/:id/status', updateIncidentStatus);

module.exports = router;