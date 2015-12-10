/**
 * Created by qingbiao on 2015-12-02.
 */

var http = require("http");
var url = require("url");
var querystring = require("querystring");
module.exports = {
    "/": function(){
        var type = this.get("type");
        var host = this.get("url");
        var params = JSON.parse(this.get("params"));

        var postData = querystring.stringify(params);

        var obj = url.parse(host);

        var options = {
            hostname: obj.hostname,
            port: obj.port || 80,
            path: obj.path,
            method: type,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length,
                'Cookie': 'JSESSIONID=2D1CD0738415CB1BF546DC059F298E9F'
            }
        };
        if(params.JSESSIONID){
            options.headers['Cookie'] = 'JSESSIONID='+params.JSESSIONID;
        }

        var scope = this;
        var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                scope.res.write(chunk);
            });
            res.on('end', function() {
                scope.res.end();
            })
        });

        req.on('error', function(e) {
            scope.res.json({"error": e.message});
        });

        // write data to request body
        req.write(postData);
        req.end();

    }
};