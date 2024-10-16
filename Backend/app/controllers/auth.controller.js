const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const dbConfig = require("../config/db.config.js");
const qrcode = require("qrcode"); // Import the QR code library
const fs = require("fs"); // File system module
const path = require("path");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    aadhar_no: req.body.aadhar_no,
    Address: req.body.Address,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  try {
    // Save user to database first
    const savedUser = await user.save();

    // Generate the QR code
    const qrCodeData = `https://aarogya-bharat-backend.vercel.app/patient/${savedUser._id}`; // URL to encode in QR code
    const qrCodePath = path.join(__dirname, "public", "qrcodes", `${savedUser._id}.png`);

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(qrCodePath), { recursive: true });

    // Generate and save the QR code image
    await QRCode.toFile(qrCodePath, qrCodeData);

    // Update the user document with the path to the QR code image
    savedUser.qrCodePath = `/qrcodes/${savedUser._id}.png`; // Relative path to serve the image
    await savedUser.save();

    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      age: savedUser.age,
      aadhar_no: savedUser.aadhar_no,
      Address: savedUser.Address,
      qrCodePath: savedUser.qrCodePath, // Return the QR code path
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              dbConfig.JWT_SECRET_KEY,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });
                              
      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.cookie(String(user._id), token,{
        path: '/',
        expires: new Date(Date.now() + 1000 *60*60),
        httpOnly: true,
        sameSite: 'lax'
    });
      res.status(200).json({
        id: user._id,
        email: user.email,
        name: user.name,
        age: user.age,
        aadhar_no: user.aadhar_no,
        Address: user.Address,
        roles: authorities,
        accessToken: token
      });
    });
};


exports.logout = (req, res) => {
  const cookie = req.headers.cookie;

  if (!cookie) {
      return res.status(403).send({ message: "No cookie provided!" });
  }

  const token = cookie.split("=")[1];

  if (!token) {
      return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, dbConfig.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
          return res.status(401).send({
              message: "Unauthorized!",
          });
      }

      const userId = decoded.id;

      res.clearCookie(`${userId}`);
      return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

