const router = require("express").Router();
const controller = require("../controllers/topic.controller");
const { checkRole, userAuth } = require("../middlewares/Auth");
const { AssignTrainerToTopic } = require("../controllers/staff.controller");

//Staff CRUD Category Route
router.get("/", userAuth, checkRole(["staff"]), controller.GetListTopic);
router.get(
  "/search/:query",
  userAuth,
  checkRole(["staff"]),
  controller.SearchTopic
);
router.post("/assign", userAuth, checkRole(["staff"]), AssignTrainerToTopic);
router.post("/", userAuth, checkRole(["staff"]), controller.CreateNewTopic);
router.put("/:id", userAuth, checkRole(["staff"]), controller.UpdateTopic);
router.delete("/:id", userAuth, checkRole(["staff"]), controller.DeleteTopic);
module.exports = router;
