/**
 * Created by cqb32_000 on 2015-11-27.
 */

(function(){
    require(["common"], function(){
        getProjects();

        $("#save-btn").on("click", function(){
            doSave();
            return false;
        });
    });

    /**
     * 获取所有的项目
     */
    function getProjects(){
        ajaxData("/project/list", null, function(projects){
            if(projects){
                projects.forEach(function(project){
                    appendProject(project);
                });
            }
        });
    }

    /**
     * 保存
     */
    function doSave(){
        var alias = $("#alias").val().trim();
        if(alias === ""){
            showTipDialog("请填写项目名称");
            return false;
        }

        var name = $("#name").val().trim();
        if(name === ""){
            showTipDialog("请填写项目路径");
            return false;
        }

        var params = {
            alias: alias,
            name: name
        };

        ajaxData("/project/add", params, function(ret){
            if(ret.success) {
                appendProject(ret.project);
                $("#add-project-dialog").modal("hide");
                showTipDialog("添加成功");
            }else{
                showTipDialog("添加失败");
            }
        });
    }

    /**
     *
     * @param project
     */
    function appendProject(project){

        var ele = $('<div class="tile bd-primary" data-id="'+project.id+'">'+
            '<div class="block-content bd-bottom bd-gray bg-white text-center">'+
                '<i class="fa fa-fire animated fadeIn"></i>'+
                '<span class="ml-10">'+project.alias+'</span>'+
            '</div>'+
            '<div class="block-content block-content-mini bg-gray-light">'+
                '<p class="animated fadeInRight">/'+project.name+
                    '<i class="fa fa-mail-forward pull-right"></i>' +
                    '<i class="fa fa-times pull-right" title="删除项目"></i>'+
                '</p>'+
            '</div>'+
        '</div>');

        $(".projectList").append(ele);
        $(".fa-mail-forward", ele).on("click", function(){
            var id = ele.data("id");
            window.location.href = "/project/detail?prj_id="+id;
        });

        $(".fa-times", ele).on("click", function(){
            var id = ele.data("id");
            doDeleteProject(id, ele);
        });
    }

    /**
     * 删除项目
     * @param id
     * @param ele
     */
    function doDeleteProject(id, ele){
        if(window.confirm("确认删除该项目？")) {
            ajaxData("/project/deleteById", {id: id}, function (ret) {
                if (ret.success) {
                    showTipDialog("删除成功");
                    ele.remove();
                } else {
                    showTipDialog("删除失败");
                }
            });
        }
    }
})();