const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.record = require("./medialrecord.model");
db.doctor = require("./doctor.model");
db.consult = require("./consultation.model");
db.slots = require("./slots.model");
db.order = require("./order.model");
db.ROLES = ["user", "admin", "moderator"];
db.medicine = require("./medicine.model");
db.prescription = require("./prescription.model");

module.exports = db;