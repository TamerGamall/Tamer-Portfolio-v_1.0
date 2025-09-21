const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
    ipAddress: { type: String },
    userAgent: { type: String },
    page: { type: String },
    timestamp: { type: Date, default: Date.now }
});

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;