const { Router } = require("express");
const { registerUser, loggedInUser, loggedOutUser, refreshAccessToken, changePassword, getCurrentUser } = require("../controllers/user.controller.js");
const upload = require('../middlewares/multer.middleware.js');
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route("/login").post(loggedInUser)
router.route("/change-password").post(changePassword)

//secure routes
router.route("/logout").post(verifyJWT, loggedOutUser)
router.route("/refresh-token").post(refreshAccessToken)

module.exports = router;

