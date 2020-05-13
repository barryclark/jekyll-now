var upic = '',pics='',pic_arr='',editor='';
var apic = 0;
function saveset(){
    var data = $("#formset")._serialize();
    $.post("./app/class/ajax.php?act=saveset",data , function(data) {
		errmsg(data.message)
	}, 'json');

}
function savewid(id){
   var el = $("#formwid"+id+" input[name='title']")
   var data = $("#formwid"+id).serialize();
   if(el.val()=='') { 
	   el.focus();
	   errmsg("标题不能为空！","#formwid"+id+" ");
	   return false
   }; 
   $.post("./app/class/ajax.php?act=savewid&id="+id,data , function(data) {
		errmsg(data.message,"#formwid"+id+" ")
	}, 'json');
 
}
function delwid(id){
 layer.open({
    content: '您确定要删除吗？'
    ,btn: ['确定', '取消']
    ,yes: function(index){
		$.get("./app/class/ajax.php?act=delwid&id="+id,function(data){if(data.result=='200'){ window.location.reload();}else{myalert(data.message);}},'json');
      }
  });  
}

function fplug(){
 layer.open({
    type: 1
    ,content: '<div class="s_e"><strong>文件名:</strong><input type="text" id="fplug" class="input_narrow w100" /></div><div class="s_s"><button name="save" type="button" class="btn" onclick="aplug()"> 保存 </button> <button class="btn" onclick="layer.closeAll()" type="button">取消</button></div>'
    ,anim: 'up'
    ,style: 'width:300px;padding:10px; border:none;'
  });	 
 }
 function dplug(id){
     layer.open({
    content: '您确定要删除吗？'
    ,btn: ['确定', '取消']
    ,yes: function(index){
		$.get("./app/class/ajax.php?act=dplug&id="+id,function(data){if(data.result=='200'){ layer.close(index);$('#plug'+id).remove();}else{myalert(data.message);}},'json');
      }
  });  
}
function kgplug(id){
   //var that = this;
   // console.log(that)
   var kgtxt = $('#kg'+id).text();
   var d = kgtxt=='开启'?1:0;
   $.get("./app/class/ajax.php?act=kgplug&id="+id+"&d="+d, function(data) {
	    //layer.closeAll();
		$('#kg'+id).text(data.message);
		mymsg(data.message+'成功');
		
	}, 'json'); 
}
function aplug(){
   var f = $("#fplug").val();
   $.get("./app/class/ajax.php?act=aplug&d="+f, function(data) {
	   if(data.result=='200'){ 
	      window.location.reload();
	   }else{
	      myalert(data.message);
	   }
	}, 'json'); 
}
function splug(id){
   var arg = $("#eplug"+id).serialize();
   $.post("./app/class/ajax.php?act=splug&id="+id, arg , function(data) {
	    layer.closeAll();
		mymsg(data.message);
	}, 'json'); 
}
function eplug(id){
	   $.get("./app/class/ajax.php?act=eplug&id="+id,function(data){		   
    layer.open({
    type: 1
    ,content: data.message
    ,anim: 'up'
    ,style: 'width:300px;padding:10px; border:none;'
  });
	},'json');
	 
}

 function upCache(){
   $.get("./app/class/ajax.php?act=upcache",function(data){mymsg(data.message);},'json');
}

function savelog() {
   var data = $("#post").serializeArray();
   var pic = upic,
	   pics = pic_arr.join(','),
	   log = editor.$txt.html();
	   log = log.replace(/<p>[<br>]*<\/p>/g,''),
	   hide = $('#hide').prop("checked")?1:0,
	   lock = $('#lock').prop("checked")?1:0;
  data.push({name: 'pic', value: upic},{name: 'pics', value:pics},{name:'content', value: log},{name:'hide', value: hide},{name:'lock', value: lock});
  if(log =="" && pic =="" ){
    errmsg("写点什么吧！");   
    $("#log").focus();
    return false;
  }
	$.post("./app/class/ajax.php?act=savelog", $.param(data), function(data) {
		errmsg(data.message);
		if (data.result == '200') {		
		  window.location.href = 'index.php?act=pl&id='+data.id;
		}
	}, 'json');

}

function dellog(id,v){
 layer.open({
    content: '您确定要删除吗？'
    ,btn: ['确定', '取消']
    ,yes: function(index){
      $.get("./app/class/ajax.php?act=dellog&id="+id,function(data){if(data.result=='200'){ layer.close(index);if(v=='1'){location.href="./";}else{$("#log-"+id).fadeOut();} }else{myalert(data.message);}},'json');
      }
  });     
}
function delpl(id,pid){
 layer.open({
    content: '您确定要删除吗？'
    ,btn: ['确定', '取消']
    ,yes: function(index){
	 $.get("./app/class/ajax.php?act=delpl&id="+id+"&cid="+pid,function(data){if(data.result=='200'){layer.close(index);$("#Com-"+id).fadeOut();}else{myalert(data.message);}},'json');
    }
  }); 	 
}
function shpl(id){
		$.get("./app/class/ajax.php?act=shpl&id="+id,function(data){if(data.result=='200'){$("#sh-"+id).fadeOut();}else{myalert(data.message);}},'json');
}
function zdlog(id){
	var zdobj=$("#zd-"+id);
	var xval=0;
	if(zdobj.text()=='置顶'){xval=1};
	$.get("./app/class/ajax.php?act=zdlog&id="+id+"&d="+xval,function(data){if(data.result=='200'){zdobj.text(data.message);}else{myalert(data.message);}},'json');
}

function showImg(input) {
		 var fd = new FormData();
        fd.append("picture",input.files[0]);
		$.ajax({
            url: 'app/class/upload.php?act=thum',
            type: 'post',
			dataType:'json',
            processData: false,
            contentType: false,
            data: fd,
            success: function (ret) {
				delpic($("#pic"));
                upic = ret.url;
				apic++;
				console.log(upic);
                $("#pic").attr("src",upic).show();
			    $('#delpic').show();
            }
        }) 
}

function delpic(e){
   var p = e.attr('src');
   $.post("app/class/ajax.php?act=delpic", {pic: p}, function(ret){}, 'json');
}

function getUrlParam(name)
{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r!=null) return unescape(r[2]); return null;
} 

function tab(act){
  var  num = sessionStorage.getItem("tabLiNum")||0;
  if(act=='wid') num = 0;
  $('.tabtitle li').eq(num).addClass('on');
  $('.tabcontent').eq(num).show().siblings('.tabcontent').hide();
  $('.tabtitle li').click(function () {
  var index = $(this).index();
    $(this).addClass('on').siblings('li').removeClass('on');
    $('.tabcontent').eq(index).show().siblings('.tabcontent').hide();
    if(act=='set') sessionStorage.setItem("tabLiNum",index);
  })
}

$(document).ready(function() {
    var act = getUrlParam('act');
    if (act == 'set' || act == 'wid') {
        tab(act);
    } else if (act == 'add' || act == 'edit') {
        if (act == 'edit') laydate.render({
            elem: '#atime',
            type: 'datetime'
        });

        pics = $('#post').data("pics");
        pic_arr = pics == '' ? [] : pics.split(',');
        upic = $('#post').data("pic");
        if (upic != '') {
            $("#pic").attr("src", upic).show();$('#delpic').show()
        }
        editor = new wangEditor('log');
        editor.config.menuFixed = false;
        editor.config.menus = ['source', 'bold', 'strikethrough', 'eraser', 'forecolor', 'quote', 'alignleft', 'aligncenter', 'alignright', 'link', 'unlink', 'img', 'video', 'insertcode', ];
        editor.config.uploadImgUrl = 'app/class/upload.php';
        editor.config.uploadImgFileName = 'picture';
		editor.config.uploadImgFns.onload = function(resultText, xhr) {
            var obj = JSON.parse(resultText);
            if (obj.error == 0) {
                pic_arr.push(obj.url);
                if (upic == '' && apic == 0) {
                    $.get("./app/class/ajax.php?act=thum&d=" + obj.url,
                    function(data) {
                        if (data.result == '200') {
                            upic = data.message;
                            $("#pic").attr("src", upic).show();
                            $('#delpic').show();
                        } else {
                            myalert(data.message);
                        }
                    },
                    'json');
                }
                apic++;
                editor.command(null, 'insertHtml', '<img src="' + obj.url + '" style="max-width:100%;"/>');
            } else {
                myalert(obj.message);
            }
        };
        editor.create();
        $('#delpic').on('click',
        function() {
            delpic($("#pic"));
            upic = '';
            $("#pic").attr("src", '').hide();
            $('#delpic').hide()
        })
    }
})