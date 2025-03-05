import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    demoLink: {
        type: String,
        required: true,
    },
    githubLink: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = model('Projects', projectSchema);

export default Project;