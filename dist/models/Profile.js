import { model, Schema } from 'mongoose';
const ProfileSchema = new Schema({
    userName: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String, required: false },
    bio: { type: String, required: true },
    avatar: { type: String, required: true },
    aboutImage: { type: String, required: true },
    cv: { type: String, required: true },
});
const Profile = model('Profile', ProfileSchema);
export default Profile;
