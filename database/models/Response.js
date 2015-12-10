module.exports = function(sequelize, DataTypes){
  return sequelize.define ("response", {
    id            : { type: DataTypes.STRING, primaryKey: true },
    imp_id        : DataTypes.STRING,
    name          : DataTypes.STRING,
    type          : DataTypes.STRING,
    rule          : DataTypes.STRING,
    desc          : DataTypes.STRING,
    lm_time       : DataTypes.DATE
  });
};