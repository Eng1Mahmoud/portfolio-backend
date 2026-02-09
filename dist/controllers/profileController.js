import { profileService } from '../services/profileService.js';
class ProfileController {
    // create profile
    async createProfile(req, res) {
        return profileService.createProfile(req, res);
    }
    // update profile - update first profile
    async updateProfile(req, res) {
        return profileService.updateProfile(req, res);
    }
    // get profile - get first profile
    async getProfile(req, res) {
        return profileService.getProfile(req, res);
    }
}
export const profileController = new ProfileController();
