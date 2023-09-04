const express = require("express");

const userauthentication = require("../middleware/auth");

const router = express.Router();

const usersController = require("../controllers/userscontrollers");

router.post(
  "/add-user",
  userauthentication.authenticate,
  usersController.addUser
);

router.get(
  "/get-user",
  userauthentication.authenticate,
  usersController.getUser
);

router.delete(
  "/delete-user/:id",
  userauthentication.authenticate,
  usersController.deleteUser
);

router.get(
  "/profile-pic",
  userauthentication.authenticate,
  usersController.profilepic
);

module.exports = router;
