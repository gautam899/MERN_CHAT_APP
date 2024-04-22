import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";
// /api/user/
const allUsers = asyncHandler(async (req, res) => {
  // Now we will check the query if the name in the query matches the name of the user.
  //This will be done using the regex feature of the mongodb. The option i of the mongodb will make the query match insensitive.
  //If the query has nothing then we will do nothing
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // Now out of the search result we need all the users except the user who is currently signed in. But to do that first we need to authorize the user that is currently logged in
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
// Now here we are going to write the logic for registering the user.
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  //If any of the above field is not defined we are going to throw an error.
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the required fields");
  }
  //Now during the user registration we need to make sure that the user does not
  //already exist. If it does we need to throw ans error.
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exist. Please Login!!");
  }

  //If the user does not exist then we create new user.
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  //   If there is something in the user that means the operation has been successfull
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,

      //Now when a new user is created I also want a JWT token to be sent along
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check if the user exist in the database before login.
  const user = await User.findOne({ email });

  //Is the user exist in the database and the password entered by the user match the password in the database then we send the info.
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      //Now when a new user is created I also want a JWT token to be sent along
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

export { allUsers, registerUser, authUser };
