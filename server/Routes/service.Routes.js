const Router = require("express").Router
const authenticate = require("../middlewares/authenticate")
const { getServices, createService, updateService, deleteService } = require('../Controllers/service.controller');

let serviceRoutes = Router();
serviceRoutes.get('/', getServices)
serviceRoutes.use(authenticate)
    .post('/', createService)
    .put('/:id', updateService)
    .delete('/:id', deleteService);

module.exports = serviceRoutes;