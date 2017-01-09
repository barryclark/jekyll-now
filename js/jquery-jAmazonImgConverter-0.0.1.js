/**
 * jQuery "Amazon Image Converter" Plugin
 * 
 * @name jquery-jAmazonImgConverter-0.0.1.js
 * @author Shinobu HUYUGIRI - http://xinolinx.net/
 * @version 0.0.1
 * @date Dec 31, 2016
 * @category jQuery Plugin Widget
 * @copyright (c) 2016 Shinobu HUYUGIRI (xinolinx.net)
 * @license GNU - GENERAL PUBLIC LICENSE - https://github.com/jquery/jquery/blob/master/GPL-LICENSE.txt
 * @info (none)
**/
$(document).ready(function(){
	var tag_template_id = "amazon_template_book";
	var targets = $(".amazon_img");

	for (var idx = 0; idx < targets.length; idx++) {
		var target = $(targets).get(idx);
		var asincode = $(target).text();
		if (!asincode) {
			/* WARNING : ASIN code is not exist. */
			continue;
		}
		var template = $("#" + tag_template_id + ":first").get(0);
		if (!template) {
			/* ERROR : id=amazon_template_book is not found */
			break;
		}
		$(target).after($(template).clone());
		var insert = $(target).next();
		var setimg = $(insert).find("img:first").get(0);
		var imgurl = $(setimg).attr("src");
		String(imgurl).replace("__AMAZON_ASIN__", asincode);
		$(setimg).attr("src", imgurl);
		$(setimg).attr("alt", asincode + "." + "000");
		var setlink = $(insert).find("a:first").get(0);
		var linkurl = $(setlink).attr("href");
		String(linkurl).replace("__AMAZON_ASIN__", asincode);
		$(setlink).attr("href", linkurl);
		$(insert).css("display", "initial");
	}
});

