import mongoose, { Schema, Document } from 'mongoose';

interface IProfile extends Document {
    name: string;
    title: string;
    image: string;
    bio: string;
    skills: string[];
    cv: string;
    projects: string[];
}

const ProfileSchema: Schema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
    cv: { type: String, required: true },
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;