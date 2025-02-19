import mongoose, { Schema } from 'mongoose';
const ProfileSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
    cv: { type: String, required: true },
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});
const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
