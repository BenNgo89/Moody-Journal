module.exports = function(sequelize, DataTypes) {
  var Diary = sequelize.define("Diary", {
    mood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    entry: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Diary.associate = function(models) {
    models.Diary.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Diary;
};
