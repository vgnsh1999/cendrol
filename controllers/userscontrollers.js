const Users = require("../models/Users");
const User = require("../models/User");
require("dotenv").config();

const addUser = async (req, res, next) => {
  try {
    const { username, email, mobile } = req.body;
    if (username === undefined || username.length === 0) {
      return res
        .status(400)
        .json({ message: "Parameters are missing", success: false });
    }
    const user = new Users({
      username: username,
      email: email,
      mobile: mobile,
      userId: req.user._id,
    });
    await user.save();
    res.status(201).json({ newUserAdded: user, success: true });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await Users.find({ userId: req.user._id });

    res.status(200).json({ allUsers: users, success: true });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({ message: error, success: false });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userID = req.params.id;
    if (userID === undefined || userID.length === 0) {
      return res
        .status(400)
        .json({ message: "Task ID is missing", success: false });
    }
    const userToBeDeleted = await Users.find({ _id: userID });

    const noofrows = await Users.deleteOne({ _id: userID });
    if (noofrows === 0) {
      return res
        .status(404)
        .json({ message: "user doesnot belongs to this user" });
    }
    res.status(200).json({ message: "Deleted Successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, success: false });
  }
};

const profilepic = async (req, res, next) => {
  try {
    const profilepic = await User.find({ _id: req.user._id });
    res.status(200).json({ message: profilepic, success: false });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({ message: error, success: false });
  }
};

module.exports = {
  addUser,
  getUser,
  deleteUser,
  profilepic,
};
