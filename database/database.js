/**
 * @author cqb
 */
var config = require("../config");
var Sequelize = require('sequelize');

// initialize database connection
var sequelize = new Sequelize(config.DB.database, config.DB.user, config.DB.password, {
    port: config.DB.port,
    host: config.DB.host,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

exports.db = sequelize;


var fs = require('fs'),path = require('path');
var loadmodels = function(){
    var files = fs.readdirSync(__dirname+"/models");
    if(files){
        files.forEach(function(file){
            var name = path.basename(file,".js");
            module.exports[name] = sequelize.import(__dirname+'/models/' + name);
        });
    }
    // describe relationships
    (function(m) {
        m.Interface.hasMany(m.Request,{as: "Requests", foreignKey: "imp_id"});
        m.Interface.hasMany(m.Response,{as: "Responses", foreignKey: "imp_id"});
        m.Project.hasMany(m.Interface,{as: "Interfaces", foreignKey: "prj_id"});
        //m.User.belongsTo(m.Role,{as: "Role", foreignKey: "roleid"});
        //m.Role.hasMany(m.User,{as: "Users", foreignKey: "roleid"});
        //m.Page.hasMany(m.Article,{as: "Articles", foreignKey: "id_page"});
        //m.Page.hasMany(m.PageMeta,{as: "Metas", foreignKey: "id_page"});
        //m.Page.belongsTo(m.Template,{as: "Template", foreignKey: "id_template"});
    })(module.exports);
};
loadmodels();