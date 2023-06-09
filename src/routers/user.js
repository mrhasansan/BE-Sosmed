const express = require("express");
const route = express.Router();
const { userControlers } = require("../controlers");

route.get("/", userControlers.getUsers);
route.post("/register", userControlers.register);
route.post("/login", userControlers.login);
module.exports = route;
