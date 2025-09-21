const Router = require("express").Router
const authenticate = require("../middlewares/authenticate")
const { createEducation, getEducations, updateEducation, deleteEducation } = require('../Controllers/education.Controller');
let educationRoutes = Router();
educationRoutes.get('/', getEducations)

educationRoutes.use(authenticate).post('/', createEducation).put('/:id', updateEducation).delete('/:id', deleteEducation);

module.exports = educationRoutes;