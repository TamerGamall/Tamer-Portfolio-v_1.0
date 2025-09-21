const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'bi bi-cup-hot-fill' },
}, { timestamps: true });

const Service = mongoose.model('Service', servicesSchema);
module.exports = Service;
