/**
 * jQuery "W3C Checker" Plugin
 * 
 * @name jquery-jW3CChecker-0.0.1.js
 * @author Shinobu HUYUGIRI - http://xinolinx.net/
 * @version 0.0.1
 * @date Dec 31, 2016
 * @category jQuery Plugin Widget
 * @copyright (c) 2016 Shinobu HUYUGIRI (xinolinx.net)
 * @license GNU - GENERAL PUBLIC LICENSE - https://github.com/jquery/jquery/blob/master/GPL-LICENSE.txt
 * @info (none)
**/
$(document).ready(function(){
	var w3curl = "https://validator.w3.org/nu/?doc="
		+ encodeURIComponent(location.href);
	var offset = 10;
	var iconsize = 20;

	var imgdir = "https://xinolinx.github.io/images/";
	var img_on_url = imgdir + "check.png";
	var img_off_url = imgdir + "blank.png";

	tag = "<div class=\"w3ccheck_div\">"
		+ "<a class=\"w3ccheck_link\""
		+ " href=\"" + w3curl + "\">"
		+ "<img"
		+ " src=\"" + img_off_url + "\""
		+ " alt=\"on_jW3CChecker\""
		+ " />"
		+ "</a>"
		+ "</div>";

	var icon_pos_l = document.documentElement.clientWidth 
		- iconsize - offset;
	var icon_pos_t = offset;

	$("body").append(tag);
	var target = $("body").children(":last");
	$(target).css("z-index", "100");
	$(target).css("position", "fixed");
	$(target).css("top", icon_pos_t);
	$(target).css("left", icon_pos_l);

	$(".w3ccheck_link").css("background-color", "initial");

	$(target).mouseover(function(e) {
		$(this).find("img").attr("src", img_on_url);
	});
	$(target).mouseout(function(e) {
		$(this).find("img").attr("src", img_off_url);
	});

});

$(window).resize(function(){
	var offset = 10;
	var iconsize = 20;
	var icon_pos_l = document.documentElement.clientWidth 
		- iconsize - offset;
	var icon_pos_t = offset;
	$(".w3ccheck_div").css("top", icon_pos_t);
	$(".w3ccheck_div").css("left", icon_pos_l);
});
