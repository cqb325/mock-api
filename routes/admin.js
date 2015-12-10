/* GET home page. */

module.exports = {
    "/": function () {
        this.forward('admin/login');
    },
    /**
     * ��¼��֤
     */
    "/dologin": function () {
        var username = this.get("username");
        var password = this.get("password");

        this.User.login({username: username, password: password}, function(user, err){
            if(user) {
                this.req.session.user = user;
                this.chain('/admin/back_index');
            }else{
                this.redirect('/admin');
            }
        }, this);
    },
    /**
     * �˳���¼
     */
    '/quite': function(){
        this.req.session.destroy();
        this.redirect('/admin');
    },

    '/back_index': function(){
        if(!this.req.session.user){
            this.redirect('/admin');
        }
        var EventProxy = require('eventproxy');
        var ep = new EventProxy();
        var cat_id = this.get("id");
        cat_id = cat_id ? cat_id : "*";

        var scope = this;
        ep.all('article', 'category', function(article, category){
            if(article && category){
                scope.forward('admin/index');
            }
        });
        this.Article.listByCategory(cat_id, 0, function (ret, err) {
            if(ret.articles) {
                this.set('articles',ret.articles);
                ep.emit('article', true);
            }
        }, this);

        this.Category.list({}, function (categories, err) {
            if(categories) {
                this.set('categories',categories);
                ep.emit('category', true);
            }
        }, this);
    }
};