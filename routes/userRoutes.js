const express = require("express");
const controller = require("../controllers/userController");
const passport = require("passport");

// Import middleware
const auth = require("../middleware/auth");
const currentUser = require("../middleware/setCurrentUser");

const router = express.Router();

router.use(currentUser.setCurrentUser);

router.get("/logout", controller.logout);

router.use(auth.checkNotAuthenticate);

router.get("/login", controller.login);

router.get("/register", controller.register);
router.post("/register", controller.registerUser);

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/user/login",
        failureFlash: true,
    })
);

module.exports = router;
