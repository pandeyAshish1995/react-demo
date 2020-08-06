//use 'strict';
var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();

//var nodemailer = require("nodema;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "......................",
    pass: "...................."
  }
});

module.exports = transporter;
