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
	var tag_asin_template = "__AMAZON_ASIN__";
	var tag_template_id = "amazon_template_book";
	var targets = $(".amazon_img");

	for (var idx = 0; idx < targets.length; idx++) {
		var target = $(targets).get(idx);
		var asincode = $(target).text();
		if (!asincode) {
			/* WARNING : ASIN code is not exist. */
			continue;
		}
		var insert = $("#" + tag_template_id).get(0).clone();
		if (!insert) {
			/* ERROR : id=amazon_template_book is not found */
			break;
		}
		$(target).after(insert);
		var setimg = $(insert).children("img");
		var imgurl = $(setimg).get(0).attr("src");
		imgurl.replace(tag_asin_template, asincode);
		$(setimg).get(0).attr("src", imgurl);
		$(setimg).get(0).attr("alt", asincode + "." + "000");
		var setlink = $(insert).children("a");
		var linkurl = $(setlink).get(0).attr("href");
		linkurl.replace(tag_asin_template, asincode);
		$(setlink).get(0).attr("href", linkurl);
	}
});

