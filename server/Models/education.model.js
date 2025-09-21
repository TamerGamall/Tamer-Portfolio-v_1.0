const mongoose = require('mongoose');
const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },          // بكالوريوس, ماجستير ...
    university: { type: String, required: true },      // جامعة كذا
    fieldOfStudy: { type: String },                    // Computer Science
    grade: { type: String },                    // Computer Science
    startDate: { type: Date, required: true },
    endDate: { type: Date },                           // ممكن يبقى null لو لسه مستمر
    description: { type: String },
}, { timestamps: true })

const Education = mongoose.model('Education', educationSchema);
module.exports = Education;