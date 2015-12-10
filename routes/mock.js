/**
 * Created by qingbiao on 2015-12-01.
 */

var Mock = require("mockjs");
var path = require("path");

module.exports = {
    "/:project/*": function(){
        var projectName = this.req.params["project"];
        var url = this.req.url;
        this.Project.getByName(projectName, function(project){
            if(project){
                var scope = this;
                project.getInterfaces().then(function(interfaces){
                    if(interfaces){

                        function resData(inter){
                            if(inter.jsonp){
                                var callback = scope.get("callback") || "callback";
                                var resStr = callback + "(" + JSON.stringify(data) + ")";
                                scope.res.send(resStr);
                            }else {
                                //跨域
                                scope.res.setHeader("Access-Control-Allow-Origin", "*");
                                scope.res.json(data);
                            }
                        }

                        var find = false;
                        for (var i in interfaces){
                            var interFace = interfaces[i];

                            var reg = new RegExp(interFace.url);
                            if(url.indexOf(interFace.url) != -1 || reg.test(url)){
                                find = true;
                                var template = interFace.template;
                                try{
                                    template = JSON.parse(template);
                                    var data = Mock.mock(template);
                                    if(data.___list){
                                        data = data.___list;
                                    }

                                    if(interFace.lazy){
                                        setTimeout(function(){
                                            resData(interFace);
                                        }, interFace.lazyTime || 2000);
                                    }else{
                                        resData(interFace);
                                    }

                                }catch (e){
                                    scope.res.json({"success": false, msg: "/"+url+"接口模板存在问题"});
                                }
                                break;
                            }
                        }

                        if(!find){
                            scope.res.json({"success": false, msg: "/"+url+"接口不存在"});
                        }
                    }else{
                        scope.res.json({"success": false, msg: "/"+projectName+"不存在接口任何接口"});
                    }
                });
            }else{
                this.res.json({"success": false, msg: "/"+projectName+"不存在"});
            }
        }, this);
    }
};