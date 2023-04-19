const express = require("express");
const route = express.Router();
const { userControlers } = require("../controlers");

route.get("/", userControlers.getData);
route.post("/register", userControlers.register);
module.exports = route;
