//TABLE INSERT TO MAKE A USER MODEL
//Require bcrypt for password hashing
var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  //Check if a unhashed password entered is the same to one stored in database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  //Use a hook to hash a user password before a User is created
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.associate = function(models) {
    models.User.hasMany(models.Diary, {
      onDelete: "cascade" //If you delete a user, all associated diaries will be deleted
    });
  };

  return User;
};
