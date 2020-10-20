const router = require("express").Router();
const controller = require("../controllers/topic.controller");

const { AssignTrainerToTopic } = require("../controllers/staff.controller");

//Staff CRUD Category Route
router.get("/", controller.GetListTopic);
router.get("/search/:query", controller.SearchTopic);
router.post("/assign", AssignTrainerToTopic);
router.post("/", controller.CreateNewTopic);
router.put("/:id", controller.UpdateTopic);
router.delete("/:id", controller.DeleteTopic);
module.exports = router;
