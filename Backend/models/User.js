const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    //default: "guest",
    enum: ["admin", "staff", "trainer", "trainee"],
  },
});

module.exports= model("users", UserSchema);

