import { Schema, model } from "mongoose";
const skillSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: false,
    },
}, { timestamps: true });
const Skill = model("Skills", skillSchema);
export default Skill;
