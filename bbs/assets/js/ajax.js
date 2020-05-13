$.fn._serialize = function () {
        var da = this.serializeArray();
        var $elrc = $('input[type=checkbox]', this);
        $.each($elrc, function() {
                if ($("input[name='" + this.name + "']:checked").length == 0) {
                    da.push({name: this.name, value:0});
				} 
        });  
		return jQuery.param(da);
}

function ckradd(e,f){
  var val=$("#"+e+"pcontent").val();
  if(val.length<5 || val.length>200){
	errmsg("评论内容必须在5-200字之间！");
   $("#"+e+"pcontent").focus();
   return false;  	  
  }
  var code=$("#pcode").val();
  if (f=='1'&&code==''){	
      errmsg("请正确输入右侧答案！");$("#pcode").focus();return false; 
 } 
 return true
} 

function errmsg(s,el){ 
   if(!arguments[1]) el = "";
   $(el+'#errmsg').show().text(s).fadeOut(2000);
}
function myalert(str){
    layer.open({
    content: str
    ,btn: '确定'
    });
}  
function mymsg(str){
    layer.open({
    content: str
    ,skin: 'msg'
    ,time: 2 //2秒后自动关闭
  });
}
 
function StopButton(id,s){
	$("#"+id).attr("disabled",true);　
	$("#"+id).text("提交("+s+")");
	if(--s>0){
		 setTimeout("StopButton('"+id+"',"+s+")",1000);
	}
	if(s<=0){
		$("#"+id).text(' 提 交 ');
	    $("#"+id).removeAttr("disabled");
	} 
} 
function addpl(id,f){	
	var ck = ckradd('',f);
	if (ck ===false)
	{
		return ck;
	}
	 //var npname = $("#pname").val(),npurl = $("#purl").val(),nplog = $("#plog").val(),pmail = $("#pmail").val(),nscode=$("#pcode").val();
	 var pldata = $("#formpl").serialize();
	 //console.log(pldata);
	 StopButton('add',9);
	 $.post("./app/class/ajax.php?act=addpl&id="+id, pldata , function(data) {	 
     if(data.result == '200')
	 {	
		 pldata += "&r="+encodeURIComponent(window.location.href);
		 $.post("./app/class/ajax.php?act=pltz&d=addpl&id="+id,pldata);
		 $(".comment_list").append(data.message);$("#pcontent").val('');$("#pcode").val('');reloadcode();
		 errmsg('');	 	 
	 }else{
	     errmsg(data.message);$("#pcode").val('');reloadcode();$("#pcode").focus();
	 }											 
	},'json');		
}
function repl(pid,cid,pmail){
	var ore = $('#Ctext-'+pid).find('.re span').text();
	var x = 1;
	if (ore == ""){x=0;}
    var rebox = '<div class="rebox"><textarea required="required" placeholder="请输入回复内容..." name="rlog" rows="3" id="rlog" class="input_narrow relog">'+ore+'</textarea> <button name="re" id="re" class="btn" onclick="plsave('+cid+','+pid+','+x+',\''+pmail+'\')"> 回 复 </button> <button onclick="capl()" class="btn"> 取 消 </button></div>';
	$('.rebox').remove();
	$('#Ctext-'+pid).append(rebox);
}
function capl(){
	$('.rebox').remove();
}
function plsave(id,pid,x,pmail){	
	var rlog = $("#rlog").val();
	if(rlog==''){
		$("#rlog").focus();
		return false;
	}
	$.post("./app/class/ajax.php?act=plsave&id=" + pid + "&cid=" + id, {
		rcontent: rlog
	}, function(data) {
        capl();
		if (data.result == '200') {
			if(x==1){
				$('#Ctext-'+pid).find('.re span').text(rlog);
			}else{
				$('#Ctext-'+pid).append('<p class="re">&nbsp;&nbsp;<strong style="color:#C00">回复</strong>：<span>'+rlog+'</span></p>');
			}
			$.post("./app/class/ajax.php?act=pltz&d=plsave&id="+pid,{rcontent:rlog,pmail:pmail,r:window.location.href});			 
		} else {
			myalert(data.message);
		}
	}, 'json');}

function ckpass(id){	
	var ps= $("#password").val();
	if (ps!=''){
	$.post("./app/class/ajax.php?act=ckpass&id="+id, {ps:ps}, function(data) {if(data.result=='200'){ $("#article .text").html(data.message)}else{myalert(data.message);}},'json');}else{
	$("#password").focus();
	}	
}

function DotRoll(elm) {
    $("body,html").animate({ scrollTop: $("a[name='" + elm + "']").offset().top }, 500);
}

function reloadcode(){$('#codeimg').attr('src','./app/class/codes.php?t='+Math.random());}

$(document).ready(function () {

$('.textPost').on("click",function(e){	
   window.location.href = $(this).data('url');
});

$('#menu_toggle').on("click",function(e){
   e.preventDefault();
   $('#menu').toggleClass('close');
   $('.collapse').slideToggle();
});

$('#pcontent').on("focus",function(e){    
   $('#pl_other').fadeIn();   
});
 
/*$(window).resize(function(){
	 var w = $(window).width();
	 if(w>650) {$('#nav').show();}else{
       $('#menu').removeClass('close');
	   $('.collapse').hide();
	 } 
});
*/
var url = String(window.location);
var last = url.charAt(url.length - 1);
$("#nav li a").each(function(e){         
        if(last=='/'){
		   $(this).addClass("on");
		   return false;
		}
		else if(url==$(this)[0].href){
		   $(this).addClass("on");
		   return false;
		}
          
});
})