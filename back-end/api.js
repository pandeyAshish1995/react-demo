var userDb = require("./schemas");
module.exports = {
  signUp: function(data) {
    return new Promise((res, rej) => {
      userDb.create(data, function(err, doc) {
        if (err) rej(err);
        else res(doc);
      });
    });
  },
  verifyonSignup: function(email, verifyStatus) {
    return new Promise((res, rej) => {
      userDb.update(
        { email: email },
        { $set: { verifyStatus: true } },
        function(err, result) {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  },

  login: function(getEmail) {
    return new Promise((res, rej) => {
      userDb.find({ email: getEmail }, function(err, result) {
        if (err) rej(err);
        else res(result);
      });
    });
  },
  loginPass: function(getEmail, getPass) {
    return new Promise((res, rej) => {
      userDb.find({ email: getEmail, password: getPass }, function(
        err,
        result
      ) {
        if (err) rej(err);
        else res(result);
      });
    });
  },
  forgetPass: function(getEmail) {
    return new Promise((res, rej) => {
      userDb.find({ email: getEmail }, function(err, result) {
        if (err) rej(err);
        else res(result);
      });
    });
  },

  resetPass: function(_id, getPass) {
    return new Promise((res, rej) => {
      userDb.update({ _id: _id }, { $set: { password: getPass } }, function(
        err,
        result
      ) {
        if (err) rej(err);
        else res(result);
      });
    });
  }
};
