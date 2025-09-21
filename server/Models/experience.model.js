const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },           // Software Developer
    company: { type: String, required: true },         // الشركة
    location: { type: String },                        // القاهرة - عن بعد
    projects: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 10']
    },                        // القاهرة - عن بعد
    startDate: { type: Date, required: true },
    endDate: { type: Date },                           // ممكن يبقى null لو لسه شغال
    responsibilities: { type: String },
}, { timestamps: true })
function arrayLimit(val) {
    return val.length <= 10;
}
const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;