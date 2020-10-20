const router = require("express").Router();
const controller = require("../controllers/trainee.controller");
const { checkRole, userAuth } = require("../middlewares/Auth");

//Get list trainee
router.get(
  "/",
  userAuth,
  checkRole(["admin", "staff"]),
  controller.GetListTrainee
);

router.get(
  "/course/assigned",
  userAuth,
  checkRole(["trainee", "staff"]),
  controller.viewAssignedCourse
);

//Get profile trainee
router.get(
  "/:username",
  userAuth,
  checkRole(["admin", "staff", "trainee"]),
  controller.GetProfile
);

//Create new trainee
router.post(
  "/",
  userAuth,
  checkRole(["admin", "staff"]),
  controller.CreateNewTrainee
);

//Update trainee by id
router.put(
  "/:id",
  userAuth,
  checkRole(["admin", "staff", "trainee"]),
  controller.UpdateTrainee
);

//Delete trainee by username
router.delete(
  "/:username",
  userAuth,
  checkRole(["admin", "staff"]),
  controller.DeleteTrainee
);

module.exports = router;
