const { Schema, model } = require("mongoose");

const trainerSchema = new Schema({
  username: {type: String, required: true},
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  address: { type: String, require: true },
});

module.exports = model("trainers", trainerSchema);
