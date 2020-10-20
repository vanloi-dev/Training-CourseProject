const router = require("express").Router();
const controller = require("../controllers/category.controller");
const { checkRole, userAuth } = require("../middlewares/Auth");
//Staff CRUD Category Route
router.get("/", userAuth, checkRole(["staff"]), controller.GetListCategory);
router.get(
  "/search/:query",
  userAuth,
  checkRole(["staff"]),
  controller.SearchCategory
);
router.post("/", userAuth, checkRole(["staff"]), controller.CreateNewCategory);
router.put("/:id", userAuth, checkRole(["staff"]), controller.UpdateCategory);
router.delete(
  "/:id",
  userAuth,
  checkRole(["staff"]),
  controller.DeleteCategory
);
module.exports = router;
