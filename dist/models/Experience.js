import { Schema, model } from 'mongoose';
const experienceSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    workType: {
        type: String,
        required: false,
    },
    skills: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Experience = model('Experience', experienceSchema);
export default Experience;
