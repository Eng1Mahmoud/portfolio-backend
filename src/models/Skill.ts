import { Schema, model } from "mongoose";

const skillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    /**
     * Groups the skills page. Free-form rather than an enum so a new group can
     * be added from the dashboard without a schema change and a redeploy.
     * Skills saved before this field existed have none, and the UI collects
     * those under "Other".
     */
    category: {
      type: String,
      required: false,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Skill = model("Skills", skillSchema);

export default Skill;
