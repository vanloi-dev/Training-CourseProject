const Category = require("../models/Category");
const { validateCategory } = require("../middlewares/Auth");

//CRUD Category
const CreateNewCategory = async (req, res) => {
  let name = req.body.name;
  let desc = req.body.desc;
  checkName = await validateCategory(name);
  if (checkName) {
    let newCategory = new Category({
      name: name,
      desc: desc,
    });
    newCategory
      .save()
      .then((rows) => {
        res.status(200).json({ message: rows });
      })
      .catch((err) => {
        res.status(200).json({ message: err });
      });
  } else {
    return res
      .status(403)
      .json({ message: "This category is already exists." });
  }
};

const GetListCategory = async (req, res) => {
  let category = await Category.find();
  !category
    ? res.status(401).json({ message: "0 category." })
    : res.status(200).json({ message: category });
};

const SearchCategory = async (req, res) => {
  res.status(200).json({ message: "OK" });
};

const UpdateCategory = async (req, res) => {
  let _id = req.params.id;
  let name = req.body.name;
  let desc = req.body.desc;
  await Category.findByIdAndUpdate(
    { _id },
    { name: name, desc: desc },
    { useFindAndModify: false },
    (err, doc) => {
      if (!err) {
        res
          .status(200)
          .json({ message: "Updated successfully!" + doc, success: true });
      } else {
        res.status(403).json({ message: err, success: false });
      }
    }
  );
};

const DeleteCategory = async (req, res) => {
  let _id = req.params.id;
  await Category.findOneAndRemove({ _id: _id }, (err, doc) => {
    if (!err) {
      res
        .status(200)
        .json({ message: "Category is removed successfully.", success: true });
    } else {
      res.status(403).json({ message: err, success: false });
    }
  });
};
module.exports = {
  CreateNewCategory,
  GetListCategory,
  UpdateCategory,
  DeleteCategory,
  SearchCategory,
};
