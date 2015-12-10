/* GET home page. */

module.exports = {
    "/interface_add": function () {
        this.forward("interface_add");
    },

    "/list": function(){
        var prj_id = this.get("prj_id");
        this.Interface.list(prj_id, function(interfaces){
            this.res.json(interfaces);
        }, this);
    },

    "/add": function(){
        var inter = JSON.parse(this.get("interface"));
        var request = JSON.parse(this.get("request"));
        var response = JSON.parse(this.get("response"));

        this.Interface.add({
            inter: inter,
            request: request,
            response: response
        }, function(ret){
            this.res.json({success: ret});
        }, this);
    },

    "/update": function(){
        var inter = JSON.parse(this.get("interface"));
        var request = JSON.parse(this.get("request"));

        this.Interface.update({
            inter: inter,
            request: request
        }, function(ret){
            this.res.json({success: ret});
        }, this);
    },

    "/info": function(){
        var id = this.get("id");
        this.Interface.get(id, function(data){
            this.forward("interface_info", data);
        }, this);
    },

    "/deleteRequest": function(){
        var id = this.get("id");
        this.Request.deleteById(id, function(ret){
            this.res.json({success: ret});
        }, this);
    },

    "/deleteResponse": function(){
        var id = this.get("id");
        this.Response.deleteById(id, function(ret){
            this.res.json({success: ret});
        }, this);
    },

    "/deleteById": function(){
        var id = this.get("id");
        this.Interface.deleteById(id, function(ret){
            this.res.json({success: ret});
        }, this);
    },

    "/validate": function(){
        var id = this.get("id");
        this.Interface.get(id, function(data){
            this.Project.get(data.prj_id, function(project, err){
                data.projectName = project.name;
                data.requests = data.requests ? JSON.stringify(data.requests) : "";
                this.forward("validate", data);
            }, this);
        }, this);
    },

    "/doc": function(){
        var id = this.get("id");
        this.Interface.doc(id, function(html){
            this.forward("doc", {html: html});
        }, this);
    },

    "/copy": function(){
        var id = this.get("id");
        this.Interface.copy(id, function(inter){
            this.res.json(inter);
        }, this);
    }
};