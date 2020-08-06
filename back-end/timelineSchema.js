var mongoose = require("mongoose");

var register = mongoose.Schema({
  email: { type: String },
  selectedFiles: String,
  description: String,
  category: String,
  userName: { type: String },
  time: { type: Date, default: Date.now },
  comment: Array,
  like: Array
});
module.exports = mongoose.model("timelines", register);
