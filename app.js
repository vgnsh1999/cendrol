const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

const userRoutes = require("./routes/user");
const usersRoutes = require("./routes/users");

app.use("/user", userRoutes);
app.use("/users", usersRoutes);

mongoose
  .connect(process.env.DB_CONNECT)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
