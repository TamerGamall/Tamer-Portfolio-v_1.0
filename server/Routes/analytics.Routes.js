const Router = require("express").Router
const authenticate = require("../middlewares/authenticate")
const { getTotalVisits, getPageStatus, getDailyVisits } = require('../Controllers/analytics.Controller');
let analyticsRoutrer = Router();

analyticsRoutrer.use(authenticate).get('/total-visits', getTotalVisits)
    .get('/page-status', getPageStatus)
    .get('/daily-visits', getDailyVisits);

module.exports = analyticsRoutrer;