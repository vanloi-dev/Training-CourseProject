const User = require("../models/User");
const Staff = require("../models/Staff");
const Trainee = require("../models/Trainee");
const Trainer = require("../models/Trainer");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/app");
const Category = require("../models/Category");
const Course = require("../models/Course");

const validateLogin = async (userCreds, res) => {
  let { username, password, role } = userCreds;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials",
      success: false,
    });
  }
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false,
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    //Sign in the token and issue it to user
    let token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      password: user.password,
      role: user.role,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "You are now logged in",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false,
    });
  }
};

//Passport middlewares
const userAuth = passport.authenticate("jwt", { session: false });

//Check role middlewares
const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else
    return res.status(403).json(
      (results = {
        message: "Unauthorized",
        success: false,
      })
    );
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username: username });
  return user ? false : true;
};

const validateEmailStaff = async (email) => {
  let user = await Staff.findOne({ email: email });
  return user ? false : true;
};
const validateEmailTrainer = async (email) => {
  let user = await Trainer.findOne({ email: email });
  return user ? false : true;
};

const validateEmailTrainee = async (email) => {
  let user = await Trainee.findOne({ email: email });
  return user ? false : true;
};

const validateCategory = async (name) => {
  let category = await Category.findOne({ name: name });
  return category ? false : true;
};

const validateCourse = async (name, desc) => {
  let course = await Course.findOne({ name: name, desc: desc });
  return course ? false : true;
};

const requiredLogin = async () => {};

module.exports = {
  userAuth,
  validateLogin,
  validateUsername,
  validateEmailStaff,
  requiredLogin,
  validateEmailTrainer,
  validateEmailTrainee,
  checkRole,
  validateCategory,
  validateCourse,
};
