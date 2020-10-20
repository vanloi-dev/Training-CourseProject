const { Schema, model } = require("mongoose");

const TrainerTopic = new Schema({
  trainerID: { type: String },
  topicID: { type: String },
});

module.exports = model("trainerTopics", TrainerTopic);
