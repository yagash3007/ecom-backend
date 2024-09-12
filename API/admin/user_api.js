const express = require("express");
const user = express.Router();
const userService = require("../../services/user_services");

user.post("/signup", userService.postUser);

user.get("/", userService.getUser);
user.get("/:id", userService.getsingleid);
user.put("/:id", userService.editby_id);
user.delete("/:id", userService.delete_by_id);

module.exports = user;
