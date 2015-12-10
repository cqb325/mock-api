/**
 * Created by qingbiao on 2015-11-29.
 */

var uuid = require("uuid");
module.exports = {
    /**
     * 添加请求参数
     * @param params
     * @param imp_id
     * @param callback
     */
    add: function(params, imp_id, callback){
        if(params && params.length){
            params.forEach(function(param){
                param.id = uuid.v1();
                param.imp_id = imp_id;
            });
            this.db.Request.bulkCreate(params).then(function(ret, err){
                if(err){
                    callback(false);
                }else{
                    callback(true);
                }
            });
        }else{
            callback(true);
        }
    },

    /**
     * 批量更新
     * @param requests
     * @param callback
     */
    bulkUpdate: function(requests, callback){
        if(requests && requests.length){
            var finishedNum = 0, flag = true;
            var finished = function(ret){
                finishedNum ++;
                flag = flag && ret;
                if(finishedNum === requests.length){
                    callback(flag);
                }
            };
            requests.forEach(function(req){
                this.update(req, function(ret){
                    finished(ret);
                });
            }, this);
        }else{
            callback(true);
        }
    },

    /**
     *
     * @param req
     * @param callback
     */
    update: function(req, callback){
        this.db.Request.update(req, {where: {id: req.id}}).then(function(ret, err){
            if(err){
                callback(false);
            }else{
                callback(true);
            }
        });
    },

    /**
     * 删除
     * @param id
     * @param callback
     * @param scope
     */
    deleteById: function(id, callback, scope){
        this.db.Request.destroy({where: {id: id}}).then(function(ret, err){
            if(err){
                callback.call(scope, false);
            }else{
                callback.call(scope, true);
            }
        });
    }
};