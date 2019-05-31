module.exports = function(sequlize, DataTypes) {
  var Journal = sequlize.define("Journal", {
    activity: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  Journal.associate = function(models) {
    models.Journal.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreingKey: {
        allowNull: false
      }
    });
  };
  return Journal;
};
