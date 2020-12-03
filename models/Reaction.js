const mongoose = require("mongoose");

const ReactionSchema = mongoose.Schema({
  username: String,
  createdAt: Date,
  reactionBody: String,
});

module.exports = ReactionSchema;
