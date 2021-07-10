const express = require("express");
const controller = require("../controllers/homeController");
const auth = require("../middleware/auth");
const currentUser = require("../middleware/setCurrentUser");

const router = express.Router();

router.use(currentUser.setCurrentUser);

router.get("/", controller.home);
router.get("/list", auth.checkAuthenticate, controller.list);

module.exports = router;
