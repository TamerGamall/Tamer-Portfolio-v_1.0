const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const connectDB = require('./Config/db');
const morgan = require('morgan');
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const Port = process.env.PORT || 3000;
// import My Middleares 
const trackVisit = require('./Middlewares/trackVisti');
// import Routes
const analyticsRoutes = require('./Routes/analytics.Routes');
const UserRoutes = require('./Routes/user.Routes');
const projectRoutes = require('./Routes/project.Routes');
const siteContentRoutes = require('./Routes/siteContent.Routes')
const educationRoutes = require('./Routes/education.Routes');
const experienceRoutes = require('./Routes/experience.Routes');
const serviceRoutes = require('./Routes/service.routes');
const translateRoutes = require('./Routes/translate.Routes');
// DB Connection
connectDB();
const app = express();

// Use the tracking middleware for all routes
app.use(express.static(path.join(__dirname, "client/dist")));
app.use(trackVisit);



// middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());

//  Routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/user', UserRoutes);
app.use("/api/projects", projectRoutes);
app.use('/api/site-content', siteContentRoutes)
app.use('/api/educations', educationRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/translate', translateRoutes);
app.use('/', (req, res) => {
    res.send('API is running...');
});


// Start the server
// app.listen(Port, () => {
//     console.log(`Server is Runnninng`);
// })
module.exports = app;
