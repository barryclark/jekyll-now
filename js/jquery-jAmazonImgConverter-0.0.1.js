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
	var targets = $("#amazon_img");
	for (var idx = 0; idx < targets.idx; idx++) {
		var target = $(targets).get(idx);
		var insert = $("#amazon_template_book").get(0).clone();
		if (!insert) {
			/* ERROR : id=amazon_template_book is not found */
			break;
		}
		$(target).after(insert);
	}
});

