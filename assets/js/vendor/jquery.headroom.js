/*
Last Updated: 2016年6月10日 11:07:02

COTA
http://cota.jp
*/
/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
!function(b){b&&(b.fn.headroom=function(a){return this.each(function(){var h=b(this),g=h.data("headroom"),f="object"==typeof a&&a;f=b.extend(!0,{},Headroom.options,f),g||(g=new Headroom(this,f),g.init(),h.data("headroom",g)),"string"==typeof a&&g[a]()})},b("[data-headroom]").each(function(){var a=b(this);a.headroom(a.data())}))}(window.Zepto||window.jQuery);