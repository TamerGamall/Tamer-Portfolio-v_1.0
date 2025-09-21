const authenticate = require("../middlewares/authenticate");
const Router = require("express").Router
const { getSiteContent, createSiteContent, updateSiteContent } = require('../Controllers/siteContent.controller');
let siteContentRoutes = Router();
siteContentRoutes.get('/', getSiteContent);
siteContentRoutes.use(authenticate).post('/', createSiteContent).put('/', updateSiteContent);
module.exports = siteContentRoutes;