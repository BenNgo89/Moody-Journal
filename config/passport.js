var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

//Initialize Local Strategy for Passportjs use
passport.use(
  new LocalStrategy(
    //Users will sign in using an email instead of a username
    {
      usernameField: "email"
    },
    function(email, password, done) {
      //When a user tries to sign, this code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        //If there is no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        //If there is a user with the given email, but the password is incorrect...
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        //If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

/*Serialize is something I don't truly understand from Passport. I'm just going with the docs here
In order to help keep authentication state across HTTPS requests, Sequelize needs to serialize and 
deserialize the user. Following code is boilerplate needed to make it all work.*/
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//Exporting the configured passport
module.exports = passport;
