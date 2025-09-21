const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        image_url: {
            type: String,
            trim: true,
            default: "https://res.cloudinary.com/default-project.png",
        },
        project_url: {
            type: String,
            trim: true,
            default: "https://res.cloudinary.com/default-project.png",
        },
        technologies: {
            type: [String],
            required: true,
            validate: [arrayLimit, '{PATH} exceeds the limit of 10']
        },
        github_url: {
            type: String,
            trim: true,
            default: "https://res.cloudinary.com/default-project.png",
        },
        created_at: {
            type: Date,
            default: Date.now,
            immutable: true,
        },

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

function arrayLimit(val) {
    return val.length <= 10;
}
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;