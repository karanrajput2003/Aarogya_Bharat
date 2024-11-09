const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const config = require("../config/auth.config");
const db = require("../models");
const Doctor = db.doctor;
const dbConfig = require("../config/db.config.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  }); 

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/doctorsignin", controller.doctorsignin);

};
