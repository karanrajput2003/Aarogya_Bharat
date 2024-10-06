const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Answer = db.answer;
const Course_Enroll = db.course_enroll;


const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};


const checkAnswer = (req, res, next) => {
    Answer.findOne({
      q_id: req.body.q_id,
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
  
      if (user) {
        return res.status(400).send({ message: "Quiz Already Submitted" });
      }
      
      // If the quiz hasn't been submitted, call next() to proceed to the next middleware or handler
      next();
    });
};

const checkCourse = (req, res, next) => {
  Course_Enroll.findOne({
    email: req.body.email,
    course_id: req.body.course_id
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (user) {
      return res.status(400).send({ message: "Course Already Enrolled" });
    }
    
    // If the quiz hasn't been submitted, call next() to proceed to the next middleware or handler
    next();
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkAnswer,
  checkCourse
};

module.exports = verifySignUp;
