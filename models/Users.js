const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
    },
    company: {
      type: String,
    },
    website: {
      type: String,
    },
    bio: {
      type: String,
    },
    whatAreYouLookingFor: {
      type: [String],
    },
    whatTopicsAreYouInterestedIn: {
      type: String,
    },
    location: {
      type: String,
    },
    whatKindOfServiceYouOffer: {
      type: String,
    },
    type: {
      type: String,
    },
    wallet: {
      type: String,
      required: true,
    },
    favorite: {
      type: [String],
    },
    watchlist: {
      type: [String],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Users", Schema);
