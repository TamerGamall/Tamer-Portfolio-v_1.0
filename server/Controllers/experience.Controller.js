const Experience = require('../Models/experience.model');

// --------------------------Get All Experience--------------------------

const getExperience = async (req, res) => {
    try {
        const data = await Experience.find().sort({ startDate: -1 });
        res.json(data);
        // res.status(200).json({ success: true, data: education });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --------------------------Create New Experience--------------------------
const addExperience = async (req, res) => {
    try {
        const exp = new Experience(req.body);
        await exp.save();
        res.status(201).json(exp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// --------------------------Update Experience--------------------------

const updateExperience = async (req, res) => {
    try {
        const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// --------------------------Delete Experience--------------------------
const deleteExperience = async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: "Experience deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getExperience, addExperience, updateExperience, deleteExperience }