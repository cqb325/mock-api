/**
 * Created by qingbiao on 2015-11-29.
 */

var uuid = require("uuid");
module.exports = {
    /**
     * 添加返回参数
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
            this.db.Response.bulkCreate(params).then(function(ret, err){
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
     * @param responses
     * @param callback
     */
    bulkUpdate: function(responses, callback){
        if(responses && responses.length){
            var finishedNum = 0, flag = true;
            var finished = function(ret){
                finishedNum ++;
                flag = flag && ret;
                if(finishedNum === responses.length){
                    callback(flag);
                }
            };
            responses.forEach(function(res){
                this.update(res, function(ret){
                    finished(ret);
                });
            }, this);
        }else{
            callback(true);
        }
    },

    /**
     *
     * @param res
     * @param callback
     */
    update: function(res, callback){
        this.db.Response.update(res, {where: {id: res.id}}).then(function(ret, err){
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
        this.db.Response.destroy({where: {id: id}}).then(function(ret, err){
            if(err){
                callback.call(scope, false);
            }else{
                callback.call(scope, true);
            }
        });
    }
};