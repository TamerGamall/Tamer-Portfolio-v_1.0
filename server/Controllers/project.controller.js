const Project = require('../Models/project.model');

// --------------------------Create New Project--------------------------
const createProject = async (req, res) => {
    try {
        const { title, description, image_url, project_url, technologies, github_url } = req.body;
        if (!title || !description || !technologies) {
            return res.status(400).json({ message: "Title, Description and Technologies are required" });
        }

        const project = await Project.create({
            title,
            description,
            image_url,
            project_url,
            technologies,
            github_url
        });

        res.status(201).json({ message: "Project created successfully", project });
    } catch (err) {
        res.status(500).json({ message: "Error creating project" });
    }
};

// --------------------------Get All Projects--------------------------
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: projects });
    } catch (err) {
        res.status(500).json({ message: "Error fetching projects" });
    }
};

// --------------------------Get Single Project--------------------------
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ success: true, data: project });
    } catch (err) {
        res.status(500).json({ message: "Error fetching project" });
    }
};
// --------------------------Update Project--------------------------
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image_url, project_url, technologies, github_url } = req.body;

        const project = await Project.findByIdAndUpdate(id, {
            title,
            description,
            image_url,
            project_url,
            technologies,
            github_url
        }, { new: true });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project updated successfully", project });
    } catch (err) {
        res.status(500).json({ message: "Error updating project" });
    }
};
// --------------------------Delete Project--------------------------
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting project" });
    }
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };
