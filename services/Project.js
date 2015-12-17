/**
 * Created by qingbiao on 2015-11-27.
 */

var uuid = require("uuid");
module.exports = {

    /**
     * 添加项目
     * @param params
     * @param callback
     * @param scope
     */
    add: function(params, callback, scope){
        params.id = uuid.v1();
        params.ct_time = new Date();

        var project = this.db.Project.build(params);
        project.save().then(function(ret, error){
            callback.call(scope, ret, error);
        });
    },

    /**
     * 项目列表
     * @param callback
     * @param scope
     */
    list: function(callback, scope){
        this.db.Project.all({order: "ct_time DESC"}).then(function(projects, err){
            callback.call(scope, projects);
        });
    },

    /**
     * 获取项目
     * @param prj_id
     * @param callback
     * @param scope
     */
    get: function(prj_id, callback, scope){
        this.db.Project.find({where: {id: prj_id}}).then(function(project, err){
            callback.call(scope, project);
        });
    },

    /**
     * 根据名称获取project
     * @param name
     * @param callback
     * @param scope
     */
    getByName: function(name, callback, scope){
        this.db.Project.find({where: {name: name}}).then(function(project, error){
            callback.call(scope, project);
        });
    },

    /**
     * 删除项目
     * @param id
     * @param callback
     * @param scope
     */
    deleteById: function(id, callback, scope){
        this.db.Project.destroy({where: {id: id}}).then(function(ret, err){
            if(err){
                callback.call(scope, false);
            }else {
                callback.call(scope, true);
            }
        });
    },

    /**
     * 更新mock规则
     * @param id
     * @param extend_mock
     * @param callback
     * @param scope
     */
    updateRule: function(id, extend_mock, callback, scope){
        this.db.Project.update({extend_mock: extend_mock}, {where: {id: id}}).then(function(err, ret){
            if(err){
                callback.call(scope, false);
            }else{
                callback.call(scope, true);
            }
        });
    }
};