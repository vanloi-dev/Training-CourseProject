const router = require("express").Router();
const controller = require("../controllers/trainer.controller");
const { checkRole, userAuth } = require("../middlewares/Auth");

//Get list trainer
router.get(
  "/",
  userAuth,
  checkRole(["admin", "staff"]),
  controller.GetListTrainer
);

//Get profile trainer
router.get(
  "/:username",
  userAuth,
  checkRole(["admin", "staff", "trainer"]),
  controller.GetProfile
);

//Create new trainer
router.post(
  "/",
  userAuth,
  checkRole(["staff", "admin"]),
  controller.CreateNewTrainer
);

//Update trainer by id
router.put(
  "/:id",
  userAuth,
  checkRole(["admin", "staff", "trainer"]),
  controller.UpdateTrainer
);

//Delete trainer by username
router.delete(
  "/:username",
  userAuth,
  checkRole(["staff", "admin"]),
  controller.DeleteTrainer
);

router.get(
  "/topic/assigned",
  userAuth,
  checkRole(["trainer", "staff"]),
  controller.viewAssignedTopic
);

module.exports = router;
