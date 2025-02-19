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
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = model('Projects', projectSchema);

export default Project;