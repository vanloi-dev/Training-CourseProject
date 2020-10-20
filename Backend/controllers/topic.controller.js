const Topic = require("../models/Topic");
const { validateCourse } = require("../middlewares/Auth");
//CRUD Course
const CreateNewTopic = async (req, res) => {
  let name = req.body.name;
  let desc = req.body.desc;
  let courseID = req.body.courseID;
  checkName = await validateCourse(name, desc);
  if (checkName) {
    let newTopic = new Topic({
      name: name,
      desc: desc,
      courseID: courseID,
    });
    newTopic
      .save()
      .then((rows) => {
        res.status(200).json({ message: rows });
      })
      .catch((err) => {
        res.status(200).json({ message: err });
      });
  } else {
    return res.status(403).json({ message: "This topic is already exists." });
  }
};

const GetListTopic = async (req, res) => {
  let topic = await Topic.find();
  !topic
    ? res.status(401).json({ message: "0 topic." })
    : res.status(200).json({ message: topic });
};

const SearchTopic = async (req, res) => {
  res.status(200).json({ message: "OK" });
};

const UpdateTopic = async (req, res) => {
  let _id = req.params.id;
  let name = req.body.name;
  let desc = req.body.desc;
  let courseID = req.body.courseID;
  await Topic.findByIdAndUpdate(
    { _id: _id },
    { name: name, desc: desc, courseID: courseID },
    { useFindAndModify: false },
    (err, doc) => {
      if (!err) {
        res
          .status(200)
          .json({ message:  doc, success: true });
      } else {
        res.status(403).json({
          message: err,
          success: false,
        });
      }
    }
  );
};

const DeleteTopic = async (req, res) => {
  let _id = req.params.id;
  await Topic.findOneAndRemove({ _id: _id }, (err, doc) => {
    if (!err) {
      res
        .status(200)
        .json({ message: "Topic is removed successfully.", success: true });
    } else {
      res.status(403).json({ message: err, success: false });
    }
  });
};
module.exports = {
  CreateNewTopic,
  UpdateTopic,
  GetListTopic,
  SearchTopic,
  DeleteTopic,
};
