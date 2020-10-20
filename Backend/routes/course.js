const router = require("express").Router();
const controller = require("../controllers/course.controller");
const { AssignTraineeToCourse } = require("../controllers/staff.controller");
const { checkRole, userAuth } = require("../middlewares/Auth");
//Staff CRUD Category Route
router.get("/", userAuth, checkRole(["staff"]), controller.GetListCourse);
router.get(
  "/search/:query",
  userAuth,
  checkRole(["staff"]),
  controller.SearchCourse
);
router.post("/assign", userAuth, checkRole(["staff"]), AssignTraineeToCourse);
router.post("/", userAuth, checkRole(["staff"]), controller.CreateNewCourse);
router.put("/:id", userAuth, checkRole(["staff"]), controller.UpdateCourse);
router.delete("/:id", userAuth, checkRole(["staff"]), controller.DeleteCourse);
module.exports = router;
