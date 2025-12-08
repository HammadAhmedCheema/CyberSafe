const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    incidentType: {
        type: String,
        required: [true, 'Please select an incident type'],
        enum: ['phishing', 'malware', 'data-breach', 'suspicious-activity', 'other']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'resolved'],
        default: 'open'
    }
}, {
    timestamps: true
});

const Incident = mongoose.model('Incident', incidentSchema);
module.exports = Incident;