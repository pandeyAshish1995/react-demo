var express = require("express");
var router = express.Router();
var multer = require("multer");
var userApiCategory = require("./apiCategory");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/category");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post("/addCategory", upload.single("categoryImg"), async function(
  req,
  res
) {
  try {
    console.log();
    console.log("req....file--", req.file);
    console.log(req.body);
    // var email = req.body.email;
    // var desc = req.body.description;
    var cat = req.body.categoryAdd;
    var img = req.file.originalname;

    let addCategory = await userApiCategory.addCategory(img, cat);
    res.send(addCategory);
    console.log(addCategory, "response");
  } catch (err) {
    res.send({duplicatekey:err});
    console.log("error>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> its cant be duplicate",err);
  }
});

router.post("/showCategory", async function(req, res) {
  try {
    console.log("aa gye aap yha tk");
    //  // console.log("req....file--", req.file);
    //  // console.log(req.body);
    //   // var email = req.body.email;
    //   // var desc = req.body.description;
    //   var cat = req.body.categoryAdd;
    //   var img = req.file.originalname;

    let showCategory = await userApiCategory.showCategory();
    res.send(showCategory);
    console.log(showCategory, "show category response");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
