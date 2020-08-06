
const express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = require("./router");
var routerTimeLine = require("./routerTimeLine");
var routerCategory = require("./routerCategory");
var cors = require("cors");
var app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/ppl-project");
app.use("/timeline", routerTimeLine);
app.use("/category", routerCategory);
app.use("/", router); //send file in router

app.use(express.static("public"));
app.listen(8081, () => {
  console.log("fine connection done ---");
});
