const { Router } = require("express");
const {
    registerUser,
    loggedInUser,
    loggedOutUser,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory } = require("../controllers/user.controller.js");

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
router.route("/change-password").post(verifyJWT, changePassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/update-coverImage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

//here we fetching data from params
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

router.route("/watch-history").get(getWatchHistory)


module.exports = router;

