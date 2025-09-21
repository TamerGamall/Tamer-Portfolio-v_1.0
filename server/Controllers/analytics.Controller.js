const Visit = require('../Models/visit.model');


//  --------------------------Get Total Visits--------------------------
const getTotalVisits = async (req, res) => {
    try {
        const totalVisits = await Visit.countDocuments();
        res.status(200).json({ totalVisits });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total visits" });
    }
}

// --------------------------Get page Status--------------------------
const getPageStatus = async (req, res) => {
    try {
        const stats = await Visit.aggregate([
            { $group: { _id: "$page", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.status(200).json({ stats });
    } catch (error) {
        res.status(500).json({ message: "Error fetching page status" });
    }
}

// --------------------------Get daily Visits--------------------------
const getDailyVisits = async (req, res) => {
    try {
        const stats = await Visit.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.status(200).json({ stats });
    } catch (error) {
        res.status(500).json({ message: "Error fetching daily visits" });
    }
}

module.exports = { getTotalVisits, getPageStatus, getDailyVisits };