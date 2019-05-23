//This middleware is for restricting routes unless a user is logged in
module.exports = function(req, res, next) {
  //If the user is logged in, continue with the request to the restriced route
  if (req.user) {
    return next();
  }
  //If the user is not logged in, redirect to the login page
  return res.redirect("/");
};
