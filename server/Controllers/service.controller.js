const Service = require('../Models/services.model');

// Get all services
const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new service
const createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Update service
const updateService = async (req, res) => {
    try {
        const updated = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: "Service not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete service
const deleteService = async (req, res) => {
    try {
        const deleted = await Service.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Service not found" });
        res.json({ message: "Service deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getServices, createService, updateService, deleteService };