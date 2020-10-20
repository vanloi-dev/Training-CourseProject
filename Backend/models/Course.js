const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  name: { type: String, require: true },
  desc: { type: String, require: true },
  categoryID: { type: String },
});

module.exports = model("courses", courseSchema);
