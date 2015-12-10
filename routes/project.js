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
            this.forward('project', {project: project.dataValues});
        }, this);
    },

    "/deleteById": function(){
        var id = this.get("id");
        this.Project.deleteById(id, function(ret){
            this.res.json({success: ret});
        }, this);
    }
};