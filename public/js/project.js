/**
 * Created by qingbiao on 2015-11-27.
 */
(function(){
    var editor;
    require(["common","../lib/jsoneditor/dist/jsoneditor"], function(common, JSONEditor){
        getInterfaceList();

        editor = new JSONEditor($("#template")[0]);

        if(extend_mock){
            try {
                extend_mock = extend_mock.replace(/&#34;/g,'"');
                extend_mock = extend_mock.replace(/&#39;/g,"'");
                extend_mock = JSON.parse(extend_mock);
                editor.set(extend_mock);
            }catch (e){}
        }

        $("#save_rule_btn").on("click", function(){
            saveMockRules();
        });
    });

    /**
     *
     */
    function saveMockRules(){
        var data = editor.get();
        ajaxData("/project/updateRule", {id: projectId, extend_mock: JSON.stringify(data)}, function(ret){
            if(ret.success){
                alert("保存成功");
            }else{
                alert("保存失败");
            }
        });
    }


    /**
     * 获取接口列表
     */
    function getInterfaceList(){
        ajaxData("/interface/list", {prj_id: projectId}, function(interfaces){
            if(interfaces){
                interfaces.forEach(function(inter){
                    appendInterface(inter);
                });
            }
        });
    }

    /**
     * 插入接口
     * @param interf
     */
    function appendInterface(interf){
        var ele = $('<div class="tile bd-primary mb-20" data-id="'+interf.id+'">'+
            '<div class="block-content bd-bottom bd-gray bg-white">'+
                '<i class="fa fa-link animated fadeIn"></i>'+
                '<span class="ml-40">'+interf.url+'</span>'+
                '<i class="fa fa-times pull-right" title="删除接口"></i>'+
                '<i class="fa fa-copy pull-right" title="拷贝接口"></i>'+
                '<i class="fa fa-tasks pull-right" title="接口详情"></i>'+
                '<i class="fa fa-eye pull-right" title="接口验证"></i>'+
                '<i class="fa fa-file-word-o pull-right" title="文档"></i>'+
            '</div>'+
        '</div>');

        $(".interfaceList").append(ele);

        $(".fa-tasks", ele).on("click", function(){
            var id = ele.attr("data-id");
            linkToInterface(id);
        });

        $(".fa-eye", ele).on("click", function(){
            var id = ele.attr("data-id");
            window.location.href = "/interface/validate?id="+id+"&_="+new Date().getTime();
        });

        $(".fa-times", ele).on("click", function(){
            var id = ele.attr("data-id");
            deleteInterface(id, ele);
        });

        $(".fa-file-word-o", ele).on("click", function(){
            var id = ele.attr("data-id");
            window.location.href = "/interface/doc?id="+id+"&_="+new Date().getTime();
        });

        $(".fa-copy", ele).on("click", function(){
            var id = ele.attr("data-id");
            if(window.confirm("确认备份该接口？")){
                copyInterface(id);
            }
        });
    }

    /**
     * 进入借口详情
     * @param id
     */
    function linkToInterface(id){
        window.location.href = "/interface/info?id="+id+"&_="+new Date().getTime();
    }

    /**
     * 删除接口
     * @param id
     * @param ele
     */
    function deleteInterface(id, ele){
        if(window.confirm("确认删除该接口?")){
            ajaxData("/interface/deleteById",{id: id}, function(ret){
                if(ret.success){
                    showTipDialog("删除成功");
                    ele.remove();
                }else{
                    showTipDialog("删除失败");
                }
            });
        }
    }

    /**
     * 备份接口
     * @param id
     */
    function copyInterface(id){
        ajaxData("/interface/copy", {id: id}, function(inter){
            if(inter){
                showTipDialog("拷贝成功");
                appendInterface(inter);
            }else{
                showTipDialog("拷贝失败");
            }
        });
    }
})();