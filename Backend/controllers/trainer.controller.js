const Trainer = require("../models/Trainer");
const TrainerTopic = require("../models/TrainerTopic");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  validateEmailTrainer,
  validateUsername,
} = require("../middlewares/Auth");
const Topic = require("../models/Topic");

//CRUD Trainer
const GetProfile = async (req, res) => {
  let trainer = await Trainer.findOne({ username: req.params.username });
  !trainer
    ? res.status(401).json({ message: "Trainer doesn't exists." })
    : res.status(200).json({ message: trainer });
};

const GetListTrainer = async (req, res) => {
  let trainer = await Trainer.find();
  !trainer
    ? res.status(401).json({ message: "0 trainer." })
    : res.status(200).json({ message: trainer });
};

const CreateNewTrainer = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let role = "trainer";
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let address = req.body.address;

  let checkEmail = await validateEmailTrainer(email);
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

      let newTrainer = new Trainer({
        email: email,
        username: username,
        name: name,
        phone: phone,
        address: address,
      });

      newUser
        .save()
        .then((resultUser) => {
          newTrainer
            .save()
            .then((resultTrainer) => {
              res.status(200).json({
                message1: resultUser,
                message2: resultTrainer,
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

const UpdateTrainer = async (req, res) => {
  let _id = req.params.id;
  let updatedName = req.body.name;
  let updatedEmail = req.body.email;
  let updatedPhone = req.body.phone;
  let updatedAddress = req.body.address;
  let updatedPassword = req.body.password;
  let trainer = await Trainer.findById({ _id });

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(updatedPassword, salt);

  await Trainer.findByIdAndUpdate(
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
        { username: trainer.username },
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

const DeleteTrainer = async (req, res) => {
  let username = req.params.username;
  Trainer.findOneAndDelete({ username: username }, (err) => {
    if (!err) {
      User.findOneAndDelete({ username: username }, (err) => {
        if (!err) {
          res.status(200).json({
            message: "Trainer is removed successfully",
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

const SearchTrainer = async (req, res) => {
  res.status(200).json({ message: "OK" });
};

const viewAssignedTopic = async (req, res) => {
  let trainerTopic = await TrainerTopic.find();
  if (trainerTopic) {
    let results = [];
    for (let i = 0; i < trainerTopic.length; i++) {
      let trainer = await Trainer.findOne({
        _id: trainerTopic[i].trainerID,
      });
      let topic = await Topic.findOne({
        _id: trainerTopic[i].topicID,
      });

      let result = {
        trainer: trainer.name,
        topic: topic.name,
      };
      results.push(result);
    }
    res.status(200).json({ message: results, success: true });
  } else res.status(403).json({ message: "Can't view", success: false });
};

module.exports = {
  GetProfile,
  CreateNewTrainer,
  UpdateTrainer,
  DeleteTrainer,
  GetListTrainer,
  SearchTrainer,
  viewAssignedTopic,
};
