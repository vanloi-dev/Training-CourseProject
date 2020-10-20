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
    return res.status(401).json({
      message: "Username is not found. Invalid login credentials",
      success: false,
    });
  }
  if (user.role !== role) {
    return res.status(401).json({
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
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({
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
    return res.status(401).json(
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

const requiredLogin = async () => {
  (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["Authorization"];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          console.error(err.toString());
          //if (err) throw new Error(err)
          return res
            .status(401)
            .json({ error: true, message: "Unauthorized access.", err });
        }
        console.log(`decoded>>${decoded}`);
        req.decoded = decoded;
        next();
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        error: true,
        message: "No token provided.",
      });
    }
  };
};

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
