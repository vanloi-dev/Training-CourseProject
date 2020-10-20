const Trainee = require("../models/Trainee");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  validateEmailTrainee,
  validateUsername,
} = require("../middlewares/Auth");
const Course = require("../models/Course");
const TraineeCourse = require("../models/TraineeCourse");

//CRUD Trainer
const GetProfile = async (req, res) => {
  let trainee = await Trainee.findOne({ username: req.params.username });
  !trainee
    ? res.status(401).json({ message: "Trainer doesn't exists." })
    : res.status(200).json({ message: trainee });
};

const GetListTrainee = async (req, res) => {
  let trainee = await Trainee.find();
  !trainee
    ? res.status(401).json({ message: "0 trainee." })
    : res.status(200).json({ message: trainee });
};

const CreateNewTrainee = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let role = "trainee";
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let address = req.body.address;

  let checkEmail = await validateEmailTrainee(email);
  if (checkEmail) {
    let checkUsername = await validateUsername(username);
    if (checkUsername) {
      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let newUser = new User({
        username: username,
        password: hashedPassword,
        role: role,
      });

      let newTrainee = new Trainee({
        email: email,
        username: username,
        name: name,
        phone: phone,
        address: address,
      });

      newUser
        .save()
        .then((resultUser) => {
          newTrainee
            .save()
            .then((resultTrainee) => {
              res.status(200).json({
                message1: resultUser.password,
                message2: resultTrainee,
                success: true,
              });
            })
            .catch((err) => {
              res.status(403).json({ message: err, success: false });
            });
        })
        .catch((err) => {
          res.status(403).json({ message: err, success: false });
        });
    } else
      return res.status(403).json({ message: "Username is already exists." });
  } else return res.status(403).json({ message: "Email is already exists." });
};

const UpdateTrainee = async (req, res) => {
  let _id = req.params.id;
  let updatedName = req.body.name;
  let updatedEmail = req.body.email;
  let updatedPhone = req.body.phone;
  let updatedAddress = req.body.address;
  let updatedPassword = req.body.password;
  let trainee = await Trainee.findById({ _id });

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(updatedPassword, salt);

  await Trainee.findByIdAndUpdate(
    _id,
    {
      email: updatedEmail,
      name: updatedName,
      phone: updatedPhone,
      address: updatedAddress,
    },
    { useFindAndModify: false }
  )
    .then((result) => {
      if (result) {
        User.findOneAndUpdate(
          { username: trainee.username },
          { password: hashedPassword },
          { useFindAndModify: false },
          (err, doc) => {
            if (!err) {
              res
                .status(200)
                .json({ message: result, password: doc, success: true });
            } else {
              res.status(403).json({ message: err, success: false });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(403).json({ message: err, success: false });
    });
};

const DeleteTrainee = async (req, res) => {
  let username = req.params.username;
  await Trainee.findOneAndRemove({ username: username }, (err) => {
    if (!err) {
      User.findOneAndRemove({ username: username }, (err) => {
        if (!err) {
          res.status(200).json({
            message: "Trainee is removed successfully",
            success: true,
          });
        } else {
          res.status(403).json({ message: err, success: false });
        }
      });
    } else {
      res.status(403).json({ message: err, success: false });
    }
  });
};

const SearchTrainee = async (req, res) => {
  res.status(200).json({ message: "OK" });
};

const viewAssignedCourse = async (req, res) => {
  let traineeCourse = await TraineeCourse.find();
  if (traineeCourse) {
    let results = [];
    for (let i = 0; i < traineeCourse.length; i++) {
      let trainee = await Trainee.findOne({
        _id: traineeCourse[i].traineeID,
      });
      let course = await Course.findOne({
        _id: traineeCourse[i].courseID,
      });

      let result = {
        trainee: trainee.name,
        course: course.name,
      };
      results.push(result);
    }
    res.status(200).json({ message: results, success: true });
  } else res.status(403).json({ message: "Can't view", success: false });
};
module.exports = {
  GetProfile,
  CreateNewTrainee,
  UpdateTrainee,
  DeleteTrainee,
  GetListTrainee,
  SearchTrainee,
  viewAssignedCourse,
};
