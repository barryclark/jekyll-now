/*
Last Updated: 2016年6月10日 11:07:03

COTA
http://cota.jp
*/
/*!

Name: Reading Time
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 14, 2013
Date Updated: June 10, 2014
Licensed under the MIT license

*/
(function(a){a.fn.readingTime=function(r){if(!this.length){return this}var h={readingTimeTarget:".eta",wordCountTarget:null,wordsPerMinute:270,round:true,lang:"en",lessThanAMinuteString:"",prependTimeString:"",prependWordString:"",remotePath:null,remoteTarget:null};var i=this;var c=a(this);i.settings=a.extend({},h,r);var e=i.settings.readingTimeTarget;var d=i.settings.wordCountTarget;var k=i.settings.wordsPerMinute;var p=i.settings.round;var b=i.settings.lang;var l=i.settings.lessThanAMinuteString;var o=i.settings.prependTimeString;var f=i.settings.prependWordString;var g=i.settings.remotePath;var n=i.settings.remoteTarget;if(b=="it"){var m=l||"Meno di un minuto";var q="min"}else{if(b=="fr"){var m=l||"Moins d'une minute";var q="min"}else{if(b=="de"){var m=l||"Weniger als eine Minute";var q="min"}else{if(b=="es"){var m=l||"Menos de un minuto";var q="min"}else{if(b=="nl"){var m=l||"Minder dan een minuut";var q="min"}else{var m=l||"Less than a minute";var q="min"}}}}}var j=function(y){var v=y.trim().split(/\s+/g).length;var u=k/60;var s=v/u;if(p===true){var x=Math.round(s/60)}else{var x=Math.floor(s/60)}var w=Math.round(s-x*60);if(p===true){if(x>0){a(e).text(o+x+" "+q)}else{a(e).text(o+m)}}else{var t=x+":"+w;a(e).text(o+t)}if(d!==""&&d!==undefined){a(d).text(f+v)}};c.each(function(){if(g!=null&&n!=null){a.get(g,function(s){j(a("<div>").html(s).find(n).text())})}else{j(c.text())}})}})(jQuery);