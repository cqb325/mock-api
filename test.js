/**
 * Created by cqb32_000 on 2015/8/3.
 */
var Sync = require('sync');
var obj = {};
function asyncFunction(a, b, callback) {
    setTimeout(function(){
        callback(null, obj);
    }, 100)
}

Sync(function(){

    // Function.prototype.sync() interface is same as Function.prototype.call() - first argument is 'this' context
    var result = asyncFunction.sync(null, 2, 3);
    console.log(result); // 5
});