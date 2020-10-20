const bcrypt = require("bcryptjs");
const Staff = require("../models/Staff");
const User = require("../models/User");
const Topic = require("../models/Topic");
const Trainer = require("../models/Trainer");
const TrainerTopic = require("../models/TrainerTopic");
const Course = require("../models/Course");
const Trainee = require("../models/Trainee");
const TraineeCourse = require("../models/TraineeCourse");

const { validateUsername, validateEmailStaff } = require("../middlewares/Auth");

const GetProfile = async (req, res) => {
  let staff = await Staff.findOne({ username: req.params.username });
  !staff
    ? res.status(401).json({ message: "Staff doesn't exists." })
    : res.status(200).json({ message: staff });
};

const GetListStaffs = async (req, res) => {
  let staff = await Staff.find();
  !staff
    ? res.status(401).json({ message: "0 staff." })
    : res.status(200).json({ message: staff });
};

const CreateStaff = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let role = "staff";
  let email = req.body.email;
  let name = req.body.name;
  let phone = req.body.phone;
  let address = req.body.address;

  let checkEmail = await validateEmailStaff(email);
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

      let newStaff = new Staff({
        email: email,
        username: username,
        name: name,
        phone: phone,
        address: address,
      });

      newUser
        .save()
        .then((resultUser) => {
          newStaff
            .save()
            .then((resultStaff) => {
              res.status(200).json({
                message1: resultUser,
                message2: resultStaff,
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

const UpdateStaff = async (req, res) => {
  let _id = req.params.id;
  let updatedName = req.body.name;
  let updatedEmail = req.body.email;
  let updatedPhone = req.body.phone;
  let updatedAddress = req.body.address;
  let updatedPassword = req.body.password;
  let staff = await Staff.findById({ _id });

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(updatedPassword, salt);

  await Staff.findByIdAndUpdate(
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
      User.findOneAndUpdate(
        { username: staff.username },
        { password: hashedPassword },
        { useFindAndModify: false },
        (err, doc) => {
          if (!err) {
            res
              .status(200)
              .json({ message: result, password: doc.password, success: true });
          } else {
            res.status(403).json({ message: err, success: false });
          }
        }
      );
    })
    .catch((err) => {
      res.status(403).json({ message: err, success: false });
    });
};

const DeleteStaff = async (req, res) => {
  let username = req.params.username;
  Staff.findOneAndDelete({ username: username }, (err) => {
    if (!err) {
      User.findOneAndDelete({ username: username }, (err) => {
        if (!err) {
          res
            .status(200)
            .json({ message: "Staff is removed successfully", success: true });
        } else {
          res.status(403).json({ message: err, success: false });
        }
      });
    } else {
      res.status(403).json({ message: err, success: false });
    }
  });
};

const AssignTrainerToTopic = async (req, res) => {
  let trainerID = req.body.trainerID;
  let topicID = req.body.topicID;
  await Trainer.findById({ _id: trainerID }, (err, doc) => {
    if (!err) {
      Topic.findById({ _id: topicID }, (err, docs) => {
        if (!err) {
          let AssignTrainerToTopic = new TrainerTopic({
            trainerID: trainerID,
            topicID: topicID,
          });
          AssignTrainerToTopic.save()
            .then((rows) => {
              res.status(200).json({ message: rows, success: true });
            })
            .catch((err) => {
              res.status(403).json({ message: err, success: false });
            });
        }
      });
    }
  });
};
const AssignTraineeToCourse = async (req, res) => {
  let traineeID = req.body.traineeID;
  let courseID = req.body.courseID;
  await Trainee.findById({ _id: traineeID }, (err, doc) => {
    if (!err) {
      Course.findById({ _id: courseID }, (err, docs) => {
        if (!err) {
          let AssignTraineeToCourse = new TraineeCourse({
            traineeID: traineeID,
            courseID: courseID,
          });
          AssignTraineeToCourse.save()
            .then((rows) => {
              res.status(200).json({ message: rows, success: true });
            })
            .catch((err) => {
              res.status(403).json({ message: err, success: false });
            });
        }
      });
    }
  });
};

module.exports = {
  GetProfile,
  GetListStaffs,
  CreateStaff,
  UpdateStaff,
  DeleteStaff,
  AssignTrainerToTopic,
  AssignTraineeToCourse,
};
