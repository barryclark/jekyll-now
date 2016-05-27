---
layout: post
title: 项目总结_tp_判断session是否被设置
---
###点击按钮,通过ajax获取后台session值是否被设置，根据返回标志值判断是否显示模态框
```html
<!--前台按钮设置-->
<a href="javascript:void(0)" onclick="if(modelShow()) return;window.iframeRight.location.href='{:U('Home/ObservationSystem/ObservationSystem')}'" class="btn btn-lg btn-default " style="border-width: 1px 1px 6px 2px"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>&nbsp;观测系统评估</a>
```
```javascritp
   /*判断session是否为空*/
        function modelShow(){
		    $.ajax({
				type: "POST",
				url: "{:U('Home/Index/session_is_null')}",
				datatype: "json",
				success: function (data) {
					//alert(data);
					if(data=="1"){
						$('#show-model').modal('show');
						$('#show-model').addClass("model-localtion");
						return true;
					}
				
				}
			});
		}
```
