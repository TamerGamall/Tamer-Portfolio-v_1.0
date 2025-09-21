const Education = require('../Models/education.model');

// --------------------------Get All Educations--------------------------
const getEducations = async (req, res) => {
    try {
        const data = await Education.find().sort({ startDate: -1 });
        res.json(data);
        // res.status(200).json({ success: true, data: projects });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --------------------------Create New Education--------------------------

const createEducation = async (req, res) => {
    try {
        const edu = new Education(req.body);
        await edu.save();
        res.status(201).json(edu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// --------------------------Update Education--------------------------
const updateEducation = async (req, res) => {
    try {
        const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// --------------------------Delete Education--------------------------

const deleteEducation = async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: "Education deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getEducations, createEducation, updateEducation, deleteEducation }