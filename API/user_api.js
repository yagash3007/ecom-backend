const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../model/user");
const app = express();
const PORT = process.env.PORT || 3000;
const user = express.Router();
const userService = require("../services/user_services");

user.post("/signup", userService.postUser);
// user.post("/logout", userService.logout);
user.get("/", userService.getUser);
user.get("/:id", userService.getsingleid);
user.put("/:id", userService.editby_id);
user.delete("/:id", userService.delete_by_id);

module.exports = user;
