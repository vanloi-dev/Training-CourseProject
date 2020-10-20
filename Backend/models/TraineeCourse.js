const { Schema, model } = require("mongoose");

const TraineeCourse = new Schema({
  traineeID: { type: String },
  courseID: { type: String },
});

module.exports = model("traineeCourses", TraineeCourse);
