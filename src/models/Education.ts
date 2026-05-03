import { Schema, model } from 'mongoose';

const educationSchema = new Schema({
    degree: {
        type: String,
        required: true,
    },
    institution: {
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
    description: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Education = model('Education', educationSchema);

export default Education;
