const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require('../utils/ApiError.js')
const User = require('../models/user.model.js')
const uploadOnCloudinary = require('../utils/cloudinary.js');
const ApiResponse = require('../utils/ApiResponse.js')

const { response } = require("express");

const registerUser = asyncHandler(async (req, res) => {
    //steps
    // get user details from frontend
    // validation - not empty
    // check if user already exists - username, email
    // check for images and avatar 
    // upload them on cloudinary and get their url- avatar must
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { fullname, email, username, password } = req.body
    console.log("Email: ", email);

    if ([fullname, email, username, password].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existUser = User.findOne({
        $or: [{ email }, { username }]
    })
    if (existUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file must required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!avatarLocalPath) { //avatar is required field thats why its checked
        throw new ApiError(400, "Avatar file must required")
    }

    const user = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered succesfully")
    )

})

module.exports = registerUser;