const router = require("express").Router();
const controller = require("../controllers/category.controller");
const { checkRole, userAuth } = require("../middlewares/Auth");
//Staff CRUD Category Route
router.get("/", controller.GetListCategory);
router.get("/search/:query", controller.SearchCategory);
router.post("/", controller.CreateNewCategory);
router.put("/:id", controller.UpdateCategory);
router.delete("/:id", controller.DeleteCategory);
module.exports = router;
