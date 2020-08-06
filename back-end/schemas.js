var mongoose = require("mongoose");

var register = mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  verifyStatus: { type: Boolean, default: false }
});
module.exports = mongoose.model("users", register);
