"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ProfileSchema = new mongoose_1.Schema({
  userName: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true },
  phone1: { type: String, required: true },
  phone2: { type: String, required: false },
  bio: { type: String, required: true },
  avatar: { type: String, required: true },
  aboutImage: { type: String, required: true },
  skills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Skill" }],
  projects: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Project" }],
});
var Profile = mongoose_1.default.model("Profile", ProfileSchema);
exports.default = Profile;
