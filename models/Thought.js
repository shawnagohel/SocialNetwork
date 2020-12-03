const mongoose = require("mongoose");
const  ReactionSchema  = require('./Reaction')

const ThoughtSchema = new mongoose.Schema({
  user: String,
  thought_text: String,
  created_at: String,
  reactions: [ReactionSchema],
}, {
  collection: "thoughts"
});

const Thought = mongoose.model("thoughts", ThoughtSchema);

module.exports = Thought
