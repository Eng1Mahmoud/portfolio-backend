"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var skillSchema = new mongoose_1.Schema(
  {
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
  },
  { timestamps: true },
);
var Skill = (0, mongoose_1.model)("Skills", skillSchema);
exports.default = Skill;
