import { Schema, model } from "mongoose";

/**
 * How the recommender knows me. Kept as an enum — unlike a skill category,
 * these four are the whole space, and the public page renders one filter tab
 * per value, so a typo in the dashboard would create a stray tab.
 *
 * Spelled out rather than shortened: "Team Member" and "College Friend" say
 * what the tab means on their own, where "Colleague" and "Classmate" leave a
 * visitor guessing whether the two overlap.
 */
export const RECOMMENDATION_RELATIONS = [
  "Manager",
  "Team Member",
  "Freelance",
  "College Friend",
] as const;

/** Where an entry sits when nobody has given it an explicit position. */
export const DEFAULT_RECOMMENDATION_ORDER = 999;

const recommendationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    /** Empty for college friends and most freelance clients. */
    company: {
      type: String,
      required: false,
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
      enum: RECOMMENDATION_RELATIONS,
    },
    /**
     * "YYYY-MM-DD" from the dashboard date picker. A String rather than a Date
     * so an omitted date stays an empty string instead of failing a Date cast,
     * and because ISO dates already sort correctly as text.
     */
    date: {
      type: String,
      required: false,
    },
    linkedinUrl: {
      type: String,
      required: false,
    },
    /** Pins the entry to the top of its group and onto the home page. */
    featured: {
      type: Boolean,
      default: false,
    },
    /**
     * Manual position, lowest first. Defaults high rather than to 0 so an entry
     * nobody has ordered sits behind the ones that were given a number — with a
     * 0 default, every untouched entry would claim the top of the list.
     */
    order: {
      type: Number,
      default: DEFAULT_RECOMMENDATION_ORDER,
    },
  },
  { timestamps: true }
);

const Recommendation = model("Recommendation", recommendationSchema);

export default Recommendation;
