module.exports = function(sequelize, DataTypes){
  return sequelize.define ("request", {
    id            : { type: DataTypes.STRING, primaryKey: true },
    imp_id        : DataTypes.STRING,
    name          : DataTypes.STRING,
    type          : DataTypes.STRING,
    desc          : DataTypes.STRING
  });
};