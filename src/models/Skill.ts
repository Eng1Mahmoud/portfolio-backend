import { Schema, model } from 'mongoose';

const skillSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Skill = model('Skills', skillSchema);

export default Skill;