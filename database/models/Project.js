module.exports = function(sequelize, DataTypes){
  return sequelize.define ("project", {
    id      : { type: DataTypes.STRING, primaryKey: true },
    name    : DataTypes.STRING,
    alias   : DataTypes.STRING,
    ct_time : DataTypes.DATE,
    extend_mock: DataTypes.STRING
  });
};