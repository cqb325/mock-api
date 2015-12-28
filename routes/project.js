/* GET home page. */

module.exports = {
    "/": function () {
        this.forward('project');
    },

    "/list": function(){
        this.Project.list(function(projects){
            this.res.json(projects);
        }, this);
    },

    "/add": function(){
        var name = this.get("name");
        var alias = this.get("alias");

        this.Project.add({name: name, alias: alias}, function(project, err){
            if(err){
                this.res.json({success: false});
            }else {
                this.res.json({success: true, project: project.dataValues});
            }
        }, this);
    },

    "/detail": function(){
        var prj_id = this.get("prj_id");
        this.Project.get(prj_id, function(project, error){
            var p = project.dataValues;
            p.extend_mock = p.extend_mock ? p.extend_mock.replace(/\s+/g, "") : p.extend_mock;
            this.forward('project', {project: p});
        }, this);
    },

    "/deleteById": function(){
        var id = this.get("id");
        this.Project.deleteById(id, function(ret){
            this.res.json({success: ret});
        }, this);
    },

    "/updateRule": function(){
        var id = this.get("id");
        var extend_mock = this.get("extend_mock");
        this.Project.updateRule(id,extend_mock, function(ret){
            this.res.json({success: ret});
        }, this);
    }
};