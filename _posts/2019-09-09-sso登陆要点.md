sso登陆

原理：使用cookie中保存认证信息。使用cookie验证登录信息。
* 校验cookie步骤：在验证权限时，验证对应的cookie参数
	1. 有对应的cookie，检查cookie
		1. 若检验通过，则当作已登陆
		1. 校验失败，重定向至登陆页面。
	2. 没有对应的cookie，重定向至登陆页面。
* sso的弊端：使用了cookie，cookie的安全性尤为重要。

建议使用uuid为cookie值。

同域、同父域、跨域三种情况下的sso登陆的注意点：
1. 同域sso登陆：
	* **将cookie放置在域顶层：** path设置为"/"
2. 同父域sso登陆：
	* **将cookie放置在域顶层：** path设置为"/"
	* **将cookie放置在父域下面:** domain设置为:.domain.com
3. 跨域sso：
	* **将cookie放置在域顶层：** path设置为"/"
	* 验证完成后，请求其他域的地址，设置cookie，想到的请求方法：
		* 前提保障:在每个需要单点登录的目标域暴露一个接口：传入参数为已验证的cookie对应的uuid，访问时从认证中心获取对应的cookie，写入response。
		* 登陆接口增加返回字段，增加需要单点登录的服务器的登陆url的list，url中带有获取cookie的uuid。其中个的url的list应该从认证中心中获取。
		* 验证成功后，遍历请求登陆接口中返回的设置cookie的url的list。跨域遍历方式：
			* 使用pjson
			* 使用iframe，对于iframe跨域请求，这篇博文中有提到：http://www.cnblogs.com/Music/archive/2013/04/28/sso-idea.html
			> 作者：音乐让我说（自由的生活 - 博客园）
			> 出处：http://music.cnblogs.com/
			> 文章版权归本人所有，欢迎转载，但未经作者同意必须保留此段声明，且在文章页面明显位置给出原文连接，否则保留追究法律责任的权利。
			> Sohu使用了在同一个域名登录后通过再次请求这个域名下某个链接后，得到要登录站点的请求Url，通过javascript使隐藏的iframe请求要 登录站点的Url，服务器端接到请求Redirect到要登录站点，然后通过Response写入Cookie，完成跨域名写Cookie的操作。这种写 Cookie的方式，需要在跳转时对请求的QueryString进行加密。接受方需要对QueryString进行解密。
			
			> 这种做法在服务器端不需要特别的处理。只要写好相应Post操作 WriteCookie操作 Redirect操作就可以了。在FireFox下就可以正常工作了。但是在IE下写Cookie的操作还不行，总是写不进去Cookie。需要在 Response中加入一段特别的Header. P3P: CP="CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR"
			
			> 这个Http Header 是P3P安全的要求。P3P的详解 http://www.oreilly.com.cn/book.php?bn=7-302-07170-5 微软对这个的解释：http://support.microsoft.com/default.aspx?scid=KB;EN-US;Q323752 