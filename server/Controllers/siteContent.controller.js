const siteContent = require('../Models/siteContent.model');


// --------------------------Get Site Content--------------------------
const getSiteContent = async (req, res) => {
    try {
        const content = await siteContent.findOne();
        if (!content) {
            return res.status(404).json({ success: false, message: "Site content not found" });
        }

        res.status(200).json({ success: true, data: content });


    } catch (err) {
        res.status(500).json({ message: "Error fetching site content" });
    }
}

// --------------------------Create Site Content--------------------------
const createSiteContent = async (req, res) => {
    try {
        const newContent = new siteContent(req.body);
        await newContent.save();
        res.status(201).json({ success: true, data: newContent });
    } catch (err) {
        res.status(500).json({ message: "Error creating site content" });
    }
};
// --------------------------Update Site Content--------------------------
const updateSiteContent = async (req, res) => {
    try {
        const content = await siteContent.findOneAndUpdate({}, req.body, { new: true });
        if (!content) {
            return res.status(404).json({ success: false, message: "Site content not found" });
        }
        res.status(200).json({ success: true, data: content });
    } catch (err) {
        res.status(500).json({ message: "Error updating site content" });
    }
};

module.exports = { getSiteContent, createSiteContent, updateSiteContent };