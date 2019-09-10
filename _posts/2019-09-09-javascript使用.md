### js创建json对象
直接创建map或者数组就行。

	// 创建map的json对象。
	var obj = {};
	obj.bindMail = $('#regAccount').val();
	obj.username = obj.bindMail;
	obj.password = $('#regPassword').val();
	//创建数组格式的json对象
	var obj2 = [{a:"c",b:"2"},{a:"3",b:"4"}];
	obj2.push({a:"5",b:"6"})


### 前端js使用post请求时遇到的问题

若请求的接口接受的是json格式数据，那么jquery中的请求方法，不要选择$.post，因为里面无法选择contentType，应使用$.ajax，并指定contentType为"contentType : 'application/json' "

例：

		$.ajax({
		url : "api/regist",
		data : obj,
		type : "post",
		contentType : "application/json",
		success : function(result) {
			if (result.code == 0) {
				$("#validateRegMsg").hide();
				location.href = "regSuccess";
			} else {
				$("#validateRegMsg").show();
				$("#validateRegMsg").text(result.msg);
			}
		}
		});

另，对于json对象，请求时应先将其转换为json字符串：
例：

	var obj = {a:1,b:2};
	obj = JSON.stringify(obj);
