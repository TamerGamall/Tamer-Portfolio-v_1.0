const Router = require("express").Router
const authenticate = require("../middlewares/authenticate")
const { addExperience, getExperience, updateExperience, deleteExperience } = require('../Controllers/experience.controller');
let experienceRoutes = Router();
experienceRoutes.get('/', getExperience)

experienceRoutes.use(authenticate).post('/', addExperience).put('/:id', updateExperience).delete('/:id', deleteExperience);
module.exports = experienceRoutes;