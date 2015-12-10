/**
 * Created by qingbiao on 2015-11-27.
 */

var uuid = require("uuid");
var EventProxy = require('eventproxy');
module.exports = {
    /**
     * 项目列表
     * @param prj_id
     * @param callback
     * @param scope
     */
    list: function(prj_id, callback, scope){
        this.db.Interface.all({where: {prj_id: prj_id}, order: "ct_time DESC"}).then(function(interfaces, err){
            callback.call(scope, interfaces);
        });
    },

    /**
     * 添加
     * @param params
     * @param callback
     * @param scope
     */
    add: function(params, callback, scope){
        params.inter.id = uuid.v1();
        params.inter.ct_time = new Date();

        var inter = this.db.Interface.build(params.inter);
        var self = this;
        inter.save().then(function (ret, err) {
            if (err) {
                callback.call(scope, false);
            } else {

                var success = true;
                var finishedNum = 0;
                var finished = function(flag){
                    success = success && flag;
                    finishedNum ++;
                    if(finishedNum == 2){
                        if(success){
                            callback.call(scope, true);
                        }else{
                            callback.call(scope, false);
                        }
                    }
                };
                //保存请求参数和返回数据
                var req_params = params.request;
                var req = require("./Request");
                req.add(req_params, params.inter.id, function(req_ret){
                    finished(req_ret);
                });

                var resp_params = params.response;
                var resp = require("./Response");
                resp.add(resp_params, params.inter.id, function(res_ret){
                    finished(res_ret);
                });
            }
        });
    },

    /**
     * 获取借口信息和输入输出参数
     * @param id
     * @param callback
     * @param scope
     */
    get: function(id, callback, scope){
        this.db.Interface.findById(id).then(function(inter){
            var ep = new EventProxy();

            ep.all("req","res", function(req, res){
                var inter_face = inter.dataValues;
                inter_face.requests = req;
                inter_face.responses = res;
                callback.call(scope, inter_face);
            });
            inter.getRequests().then(function (requests) {
                if(requests){
                    requests = requests.map(function(re){
                        return  re.dataValues;
                    });
                }
                ep.emit("req", requests);
            });
            inter.getResponses().then(function (responses) {
                if(responses){
                    responses = responses.map(function(re){
                        return  re.dataValues;
                    });
                }
                ep.emit("res", responses);
            });
        });
    },

    /**
     * 删除
     * @param id
     * @param callback
     * @param scope
     */
    deleteById: function(id, callback, scope){
        this.db.Interface.destroy({where: {id: id}}).then(function(ret, err){
            if(err){
                callback.call(scope, false);
            }else{
                callback.call(scope, true);
            }
        });
    },

    /**
     * 更新
     * @param params
     * @param callback
     * @param scope
     */
    update: function(params, callback, scope){
        var inter = params.inter;
        var request = params.request;
        var updateRequests = [], newRequests = [];
        if(request){
            request.forEach(function(req){
                if(!req.id) {
                    newRequests.push(req);
                }else{
                    updateRequests.push(req);
                }
            });
        }
        var ep = new EventProxy();
        ep.all("updateReq", "addReq", "inter", function(updateReq, addReq, inter){
            if(updateReq && addReq && inter){
                callback.call(scope, true);
            }else{
                callback.call(scope, false);
            }
        });
        var req = require("./Request");
        req.bulkUpdate(updateRequests, function(ret){
            ep.emit("updateReq", ret);
        });

        req.add(newRequests, inter.id, function(ret){
            ep.emit("addReq", ret);
        });

        this.db.Interface.update(inter, {where: {id: inter.id}}).then(function(ret, err){
            if(err){
                ep.emit("inter", false);
            }else{
                ep.emit("inter", true);
            }
        });
    },

    /**
     *
     * @param id
     * @param callback
     * @param scope
     */
    doc: function(id, callback, scope){
        this.get(id, function(inter){
            var str = '## '+ inter.url+'\n#### 接口类型\n    '+inter.type+'\n#### 接口请求地址\n    '
                + inter.url+'\n#### 请求参数\n'+
                '\n'+
                '|序号 |参数名 |说明 |\n'+
                '|-------- |-------- |-------- |\n';

            for(var i in inter.requests){
                var req = inter.requests[i];
                str += '|'+(parseInt(i)+1)+' |'+req.name+' |'+req.desc+' |\n';
            }
            str += '#### 返回接口 \n';

            var showdown  = require("showdown");
            var converter = new showdown.Converter();
            converter.setOption("tables", true);
            var html      = converter.makeHtml(str);

            callback.call(scope, html);
        }, this);
    },

    /**
     * 拷贝
     * @param id
     * @param callback
     * @param scope
     */
    copy: function(id, callback, scope){
        this.get(id, function(inter){
            var newid = uuid.v1();
            inter.id = newid;
            inter.ct_time = new Date();

            var requests = inter.requests;
            if(requests){
                requests.forEach(function(req){
                    req.id = uuid.v4();
                    console.log(req.id);
                    console.log(req.name);
                });
            }

            var inter_face = this.db.Interface.build(inter);
            inter_face.save().then(function(ret, err){
                if(err){
                    callback.call(scope, null);
                }else{
                    var req = require("./Request");
                    req.add(requests, newid, function(req_ret){
                        callback.call(scope, inter_face);
                    });
                }
            });
        }, this);
    }
};