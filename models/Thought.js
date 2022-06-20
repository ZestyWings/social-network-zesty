const { Types, Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const dateFormat = require("../utils/dateFormat");

// Thought Schema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Must leave a thought",
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
