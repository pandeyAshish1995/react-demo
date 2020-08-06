var express = require("express");
var router = express.Router();
var multer = require("multer");
var userApiTimeLine = require("./apiTimeline");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post("/timelinepost", upload.single("files"), async function(req, res) {
  try {
    console.log("hello");
    console.log("file--", req.file);
    console.log(req.body, "time line post");
    var email = req.body.email;
    var userName = req.body.userName;
    var desc = req.body.description;
    var cat = req.body.category;
    var img = req.file.originalname;

    let upload = await userApiTimeLine.uploadPost(
      email,
      img,
      desc,
      cat,
      userName
    );
    console.log("upload post in router return call ", upload);
    res.send(upload);
  } catch (err) {
    console.log(err);
  }
});

router.post("/all_uploads", async function(req, res) {
  try {
    console.log("all upload router");
    //console.log("file--", req.file);
    console.log(req.body);
    var userName = req.body.userName;
    let all_uploads = await userApiTimeLine.allUpload();
    res.send(all_uploads);
    console.log(all_uploads);
  } catch (err) {
    console.log(err);
  }
});

router.post("/singlePost", async function(req, res) {
  try {
    console.log("hello single post");
    //console.log("file--", req.file);
    console.log(req.body);
    var _id = req.body._id;
    let singleUpload = await userApiTimeLine.singleUpload(_id);
    res.send(singleUpload);
    console.log("single upload router response", singleUpload);
  } catch (err) {
    console.log(err);
  }
});

router.post("/addComment", async function(req, res) {
  try {
    console.log("hello comment upload", req.body);

    let addComment = await userApiTimeLine.addComment(req.body);
    res.send(addComment);
    console.log("commented add after response", addComment);
  } catch (err) {
    console.log(err);
  }
});

router.post("/addlike", async function(req, res) {
  try {
    const likedBy = req.body.likedBy;
    console.log(req.body, "sssssssssssssssssssssssssj");
    let postExist = await userApiTimeLine.singleUpload({
      _id: req.body.postId
    });
    console.log(postExist.length, "hai ki niii");
    if (postExist.length == 0)
      res.send({ msg: "This post does not exist. It might have been deleted" });
    else {
      //post exist
      if (
        postExist[0].like.some(elem => {
          return elem === likedBy;
        })
      ) {
        await userApiTimeLine.updatePost(
          { _id: req.body.postId },
          { $pull: { like: likedBy } }
        );
        res.send({ msg: "false" });
      } else {
        await userApiTimeLine.updatePost(
          { _id: req.body.postId },
          { $push: { like: likedBy } }
        );
        res.send({ msg: "true" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/dislike", async function(req, res) {
  try {
    console.log("dislike req", req.body);

    let disLike = await userApiTimeLine.disLike(req.body);
    res.send(disLike);
    console.log("dislike response in the router ", disLike);
  } catch (err) {
    console.log(err);
  }
});

router.get("/latestFirst", async function(req, res) {
  try {
    console.log("latest first router call");

    let latestFirst = await userApiTimeLine.latestFirst();
    res.send(latestFirst);
    console.log("latest first response", latestFirst);
  } catch (err) {
    console.log(err);
  }
});

router.get("/mostCommented", async function(req, res) {
  try {
    console.log("mostCommented router call");

    let mostCommented = await userApiTimeLine.mostCommented();
    res.send(mostCommented);
    console.log("mostCommented response", mostCommented);
  } catch (err) {
    console.log(err);
  }
});

router.get("/oldestFirst", async function(req, res) {
  try {
    console.log("oldest first router call");

    let oldestFirst = await userApiTimeLine.oldestFirst();
    res.send(oldestFirst);
    console.log("oldestFirst first response", oldestFirst);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;