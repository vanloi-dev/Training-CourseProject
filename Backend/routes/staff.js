const router = require("express").Router();
const controller = require("../controllers/staff.controller");
const { checkRole, userAuth } = require("../middlewares/Auth");

//Admin Read List Staff Route
router.get("/", userAuth, checkRole(["admin"]), controller.GetListStaffs);

//Admin Read A Staff Route
router.get(
  "/:username",
  userAuth,
  checkRole(["admin", "staff"]),
  controller.GetProfile
);

//Admin Create Staff Route
router.post("/", userAuth, checkRole(["admin"]), controller.CreateStaff);

//Admin Update Staff Route
router.put(
  "/:id",
  userAuth,
  checkRole(["admin", "staff"]),
  controller.UpdateStaff
);

//Admin Delete Staff Route
router.delete(
  "/:username",
  userAuth,
  checkRole(["admin"]),
  controller.DeleteStaff
);

module.exports = router;
