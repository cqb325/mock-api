module.exports = function(sequelize, DataTypes){
  return sequelize.define("interface", {
    id              : { type: DataTypes.STRING, primaryKey: true },
    prj_id          : DataTypes.STRING,
    url             : DataTypes.STRING,
    type            : DataTypes.STRING,
    jsonp           : DataTypes.INTEGER,
    lazy            : DataTypes.INTEGER,
    lazyTime        : DataTypes.INTEGER,
    desc            : DataTypes.STRING,
    template        : DataTypes.STRING,
    ct_time         : DataTypes.DATE
  });
};