const Visit = require('../Models/visit.model');

const trackVisit = async (req, res, next) => {
    try {

        await Visit.create({
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            page: req.originalUrl,
        });
    } catch (err) {
        console.log("Error tracking visit:", err.message);
    }
    next();
}
module.exports = trackVisit;