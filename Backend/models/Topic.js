const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  name: { type: String, require: true },
  desc: { type: String, require: true },
  courseID: { type: String },
});

module.exports = model("topics", topicSchema);
