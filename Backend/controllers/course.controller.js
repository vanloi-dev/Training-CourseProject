const Course = require("../models/Course");
const { validateCourse } = require("../middlewares/Auth");
//CRUD Course
const CreateNewCourse = async (req, res) => {
  let name = req.body.name;
  let desc = req.body.desc;
  let categoryID = req.body.categoryID;
  checkName = await validateCourse(name, desc);
  if (checkName) {
    let newCourse = new Course({
      name: name,
      desc: desc,
      categoryID: categoryID,
    });
    newCourse
      .save()
      .then((rows) => {
        res.status(200).json({ message: rows });
      })
      .catch((err) => {
        res.status(200).json({ message: err });
      });
  } else {
    return res.status(403).json({ message: "This course is already exists." });
  }
};

const GetListCourse = async (req, res) => {
  let course = await Course.find();
  !course
    ? res.status(401).json({ message: "0 course." })
    : res.status(200).json({ message: course });
};

const SearchCourse = async (req, res) => {
  res.status(200).json({ message: "OK" });
};

const UpdateCourse = async (req, res) => {
  let _id = req.params.id;
  let name = req.body.name;
  let desc = req.body.desc;
  let categoryID = req.body.categoryID;
  await Course.findByIdAndUpdate(
    { _id },
    { name: name, desc: desc, categoryID: categoryID },
    { useFindAndModify: false },
    (err, doc) => {
      if (!err) {
        res
          .status(200)
          .json({ message: "Updated successfully." + doc, success: true });
      } else {
        res.status(403).json({
          message: err,
          success: false,
        });
      }
    }
  );
};

const DeleteCourse = async (req, res) => {
  let _id = req.params.id;
  await Course.findOneAndRemove({ _id: _id }, (err, doc) => {
    if (!err) {
      res
        .status(200)
        .json({ message: "Course is removed successfully.", success: true });
    } else {
      res.status(403).json({ message: err, success: false });
    }
  });
};

module.exports = {
  CreateNewCourse,
  UpdateCourse,
  GetListCourse,
  SearchCourse,
  DeleteCourse,
};
