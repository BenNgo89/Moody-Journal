//Path helps direct routes to HTML files and OAuth middleware to check for user log ins
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/signup", function(req, res) {
    //Users are redirected to /welcome if they already have an account
    if (req.user) {
      res.redirect("/welcome");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    //Users are redirected to /welcome if they already have an account
    if (req.user) {
      res.redirect("/welcome");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/", function(req, res) {
    if (!req.user) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    } else {
      res.sendFile(path.join(__dirname, "../public/welcome.html"));
    }
  });

  //Authentication added to /welcome so users who are not logged in get redirected to sign up
  app.get("/welcome", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/welcome.html"));
  });
};
