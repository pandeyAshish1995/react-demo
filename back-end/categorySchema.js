var mongoose = require("mongoose");

var category = mongoose.Schema({
  categoryName: { type: String, unique: true },
  categoryImg: String
});
module.exports = mongoose.model("category", category);
