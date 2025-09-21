const Router = require("express").Router
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require('../Controllers/project.controller');
const authenticate = require("../middlewares/authenticate")

let projectRoutes = Router();
projectRoutes.get('/', getProjects)
    .get('/:id', getProjectById)
projectRoutes.use(authenticate).post('/', createProject)
    .put('/:id', updateProject)
    .delete('/:id', deleteProject);

module.exports = projectRoutes;