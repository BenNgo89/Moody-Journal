var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  //Using the passport.authenticate middleware with out local strategy
  //If the user has valid login credentials, send them to the members page. Otherwise send an error.
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    //Send the user to a /members route because the redirect will happen on the front end
    //Users will not get this or even be able to access the /members page if they aren't authenticated
    res.json("/members");
  });

  /*Route for signing up a user. User passwords are automatically hashed and stored securely because of 
  how we configured out Sequelize User model. If the user is created successfully, proceed to log the
  user in or else we send back an error.*/
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message)
      });
  });

  //Route for logging users out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //Client-side route for getting some data about our user
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      //Send an empty object for users not logged in
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
