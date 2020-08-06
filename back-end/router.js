var express = require("express");
var router = express.Router();
var userApi = require("./api");
var transporter = require("./nodeMailer");
// signUp
router.post("/submitData", async function(req, res) {
  try {
    console.log("req.body in register", req.body);

    let signUp = await userApi.signUp(req.body);
    console.log("signup respon22222222s", signUp);
    res.send(signUp);
  
  } catch (err) {
    //res.send({ duplicatekey: err });
    console.log("duplicate in :", err);
  }
  //res.send("signup response",signUp,err,"error in mail",error,info);
  //console.log("signup response",signUp,err,"error in mail",error,info);
});

//login
router.post("/login", async function(req, res) {
  try {
    var getEmail = req.body.email;
    var getPass = req.body.password;

    //console.log(num);
    let signIn = await userApi.login(getEmail);

    console.log("Signin in router after api", signIn.length);
    res.send(signIn);
  } catch (err) {
    console.log(err);
  }
});
router.post("/loginPass", async function(req, res) {
  try {
    var getEmail = req.body.email;
    var getPass = req.body.password;

    //console.log(num);
    let signIn = await userApi.loginPass(getEmail, getPass);

    console.log("Signin in router after api", signIn.length);
    res.send(signIn);
  } catch (err) {
    console.log(err);
  }
});

//forget Pass
router.post("/forgetPass", async function(req, res) {
  try {
    var getEmail = req.body.email;
    // var get_id = req.body._id;
    console.log(getEmail);
    let forgetPass = await userApi.forgetPass(getEmail);
    res.send(forgetPass);
    if (forgetPass.length > 0) {
      console.log("showDetail>>> email:  " + forgetPass[0].email + " name:  " + forgetPass[0].password);

      var mailOptions = {
        from: "Asheesh Pandey",
        to: "" + req.body.email,
        subject: "Verification mail",

        text: "<a href='google.com'>num</a>",
        html:
          '<p>Click <a href="http://localhost:3000/reset/' +
          forgetPass[0]._id +
          '">here mr.</a> to reset your password</p>'
      };
      var mailOption = transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// reset pass

router.get("/verifyonSignup/:email", async function(req, res) {
  try {
    var email = req.params.email;
    var verifyStatus = true;
    let verifyonSignup = await userApi.verifyonSignup(email, verifyStatus);
    console.log(verifyonSignup, "verify on signup");
    res.redirect("http://localhost:3000/reg");
  } catch (err) {
    console.log(err);
  }
});

router.post("/resetPass", async function(req, res) {
  try {
    var password = req.body.password;
    var _id = req.body._id;
    //var getPass = req.param.password;

    console.log(password, _id);

    let resetPass = await userApi.resetPass(_id, password);
    console.log(resetPass.length);
    if (resetPass.n > 0) {
      console.log("showDetail>>> email:  ", resetPass);
    }
    resetPass.n > 0 ? res.send(resetPass) : res.send({ msg: "your pass is not reset" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
