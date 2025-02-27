import mongoose, { Schema } from 'mongoose';
const ProfileSchema = new Schema({
    userName: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String, required: false },
    bio: { type: String, required: true },
    avatar: { type: String, required: true },
    aboutImage: { type: String, required: true },
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});
const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
