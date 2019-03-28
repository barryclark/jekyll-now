jQuery(function(t){function e(e){"resize"===e.type&&(t(h.BODY).removeClass(a.DROPDOWN_OPEN),t(h.BASE).removeClass(a.OPENED).find(h.TOGGLER).each(function(){t(t(this).attr("data-target")).removeClass(a.IN).add(this).attr("aria-expanded","false")}))
var r=t(this).scrollTop()
t(h.BASE).each(function(){t(this).is(h.FIXED_TOP)&&(t(this).is(h.TRANSPARENT)&&!t(this).hasClass(a.OPENED)&&(r>0?t(this).removeClass(a.BG_COLOR):t(this).addClass(a.BG_COLOR)),r>0?t(this).addClass(a.SHORT):t(this).removeClass(a.SHORT))})}var r,n="bs.navbar-dropdown",s="."+n,i=".data-api",o={COLLAPSE:"collapse"+s,CLICK_DATA_API:"click"+s+i,SCROLL_DATA_API:"scroll"+s+i,RESIZE_DATA_API:"resize"+s+i,COLLAPSE_SHOW:"show.bs.collapse",COLLAPSE_HIDE:"hide.bs.collapse",DROPDOWN_COLLAPSE:"collapse.bs.nav-dropdown"},a={IN:"in",OPENED:"opened",BG_COLOR:"bg-color",DROPDOWN_OPEN:"navbar-dropdown-open",SHORT:"navbar-short"},h={BODY:"body",BASE:".navbar-dropdown",TOGGLER:'.navbar-toggler[aria-expanded="true"]',TRANSPARENT:".transparent",FIXED_TOP:".navbar-fixed-top"}
t(window).on(o.SCROLL_DATA_API+" "+o.RESIZE_DATA_API,function(t){clearTimeout(r),r=setTimeout(function(){e(t)},10)}).trigger(o.SCROLL_DATA_API),t(document).on(o.CLICK_DATA_API,h.BASE,function(t){t.targetWrapper=this}).on(o.COLLAPSE_SHOW+" "+o.COLLAPSE_HIDE,function(e){t(e.target).closest(h.BASE).each(function(){"show"==e.type?(t(h.BODY).addClass(a.DROPDOWN_OPEN),t(this).addClass(a.OPENED)):(t(h.BODY).removeClass(a.DROPDOWN_OPEN),t(this).removeClass(a.OPENED),t(window).trigger(o.SCROLL_DATA_API),t(this).trigger(o.COLLAPSE))})}).on(o.DROPDOWN_COLLAPSE,function(e){t(e.relatedTarget).closest(h.BASE).find(h.TOGGLER).trigger("click")})}),function(t){var e="navDropdown",r="bs.nav-dropdown",n="."+r,s=".data-api",i=t.fn[e],o={HIDE:"hide"+n,HIDDEN:"hidden"+n,SHOW:"show"+n,SHOWN:"shown"+n,CLICK:"click"+n,READY:"ready"+n,COLLAPSE:"collapse"+n,LOAD_DATA_API:"load"+n+s,CLICK_DATA_API:"click"+n+s,RESIZE_DATA_API:"resize"+n+s,KEYDOWN_DATA_API:"keydown"+n+s,NAVBAR_COLLAPSE:"collapse.bs.navbar-dropdown"},a={ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40},h={XS:544,SM:768,MD:992,LG:1200,XL:1/0},p={BACKDROP:"dropdown-backdrop",DISABLED:"disabled",OPEN:"open",SM:"nav-dropdown-sm"},l={BASE:".nav-dropdown",DROPDOWN:".dropdown",DROPDOWN_MENU:".dropdown-menu",BACKDROP:"."+p.BACKDROP,DATA_BUTTON:"[data-button]",DATA_TOGGLE:'[data-toggle="dropdown-submenu"]',FORM_CHILD:".dropdown form"},c=function(){function e(e,r){"length"in e||(e=[e]),this.props={},this.length=e.length,r&&(this.prevItem=r,t.extend(this.props,r.props))
for(var n=0;n<e.length;n++)this[n]=e[n]}return e.prototype.eq=function(t){return new e(this[t]?this[t]:[],this)},e.prototype.parent=function(){return new e(t(this).map(function(){var r=new e(this)
return r.is(":upper")?null:t(r.is(":toggle")?this.parentNode.parentNode:this).closest(l.DROPDOWN).find(">"+l.DATA_TOGGLE)[0]}),this)},e.prototype.parents=function(r){var n=t(this).map(function(){return new e(this).is(":toggle")?this.parentNode:this}).parentsUntil(l.BASE,l.DROPDOWN)
return":upper"===r&&(n=n.last()),n=n.find(">"+l.DATA_TOGGLE),new e(n,this)},e.prototype.children=function(r){var n=[]
return t(this).each(function(){var s,i,o=new e(this)
if(o.is(":root"))s=t(this)
else{if(!o.is(":toggle"))return
s=t(this).parent().find(">"+l.DROPDOWN_MENU)}i=r?s.find("a"):o.is(":root")?s.find(">li>a"):s.find(">a, >"+l.DROPDOWN+">a"),i.each(function(){r&&!this.offsetWidth&&!this.offsetHeight||this.disabled||t(this).is(l.DATA_BUTTON)||t(this).hasClass(p.DISABLED)||~t.inArray(this,n)||n.push(this)})}),new e(n,this)},e.prototype.root=function(){return new e(t(this).closest(l.BASE),this)},e.prototype.jump=function(r){if(r=r||"next",!this.length)return new e([],this)
var n,s=this.eq(0)
n=this.is(":flat")||s.is(":upper")?s.root().children(this.is(":flat")):s.parent().children()
var i=t.inArray(this[0],n)
if(!n.length||!~i)return new e([],this)
if("next"==r){if(i+=1,i<n.length)return new e(n[i],this)
r="first"}else if("prev"==r){if(i-=1,i>=0)return new e(n[i],this)
r="last"}return"first"==r?new e(n[0],this):"last"==r?new e(n[n.length-1],this):new e([],this)},e.prototype.next=function(){return this.jump("next")},e.prototype.prev=function(){return this.jump("prev")},e.prototype.first=function(){return this.jump("first")},e.prototype.last=function(){return this.jump("last")},e.prototype.prop=function(e,r){return arguments.length?arguments.length>1?(this.props[e]=r,this):"object"==typeof arguments[0]?(t.extend(this.props,arguments[0]),this):e in this.props?this.props[e]:null:t.extend({},this.props)},e.prototype.removeProp=function(t){return delete this.props[t],this},e.prototype.is=function(e){for(var r=t(this),n=(e||"").split(/(?=[*#.\[:\s])/);e=n.pop();)switch(e){case":root":if(!r.is(l.BASE))return!1
break
case":upper":if(!r.parent().parent().is(l.BASE))return!1
break
case":opened":case":closed":if(":opened"==e!=r.parent().hasClass(p.OPEN))return!1
case":toggle":if(!r.is(l.DATA_TOGGLE))return!1
break
default:if(!this.props[e])return!1}return!0},e.prototype.open=function(){return this.is(":closed")&&this.click(),this},e.prototype.close=function(){return this.is(":opened")&&this.click(),this},e.prototype.focus=function(){return this.length&&this[0].focus(),this},e.prototype.click=function(){return this.length&&t(this[0]).trigger("click"),this},function(t){return new e(t)}}(),d=function(e){this._element=e,t(this._element).on(o.CLICK,this.toggle)}
d.prototype.toggle=function(e){if(this.disabled||t(this).hasClass(p.DISABLED))return!1
var r=t(this.parentNode),n=r.hasClass(p.OPEN),s=d._isCollapsed(t(this).closest(l.BASE))
if(d._clearMenus(t.Event("click",{target:this,data:{toggles:s?[this]:null}})),n)return!1
if("ontouchstart"in document.documentElement&&!r.closest(l.DROPDOWN+"."+p.OPEN).length){var i=document.createElement("div")
i.className=p.BACKDROP,t(i).insertBefore(t(this).closest(l.BASE)),t(i).on("click",d._clearMenus)}var a={relatedTarget:this},h=t.Event(o.SHOW,a)
return r.trigger(h),h.isDefaultPrevented()?!1:(this.focus(),this.setAttribute("aria-expanded","true"),r.toggleClass(p.OPEN),r.trigger(t.Event(o.SHOWN,a)),!1)},d.prototype.dispose=function(){t.removeData(this._element,r),t(this._element).off(n),this._element=null},d._clearMenus=function(e){if(e=e||{},3!==e.which){var r,n=function(){return!1}
if(e.target){if(this===document)if(t(e.target).is("a:not([disabled], ."+p.DISABLED+")"))r=t.Event(o.COLLAPSE,{relatedTarget:e.target})
else{var s=e.targetWrapper&&t(e.targetWrapper).find(l.BASE)||t(e.target).closest(l.BASE)
if(d._isCollapsed(s))return}else if(t(e.target).hasClass(p.BACKDROP)){var i=t(e.target).next()
if(i.is(l.BASE)&&d._isCollapsed(i))return}t(e.target).is(l.DATA_TOGGLE)?n=t(e.target.parentNode).parents(l.DROPDOWN).find(">"+l.DATA_TOGGLE):t(l.BACKDROP).remove()}for(var a=e.data&&e.data.toggles&&t(e.data.toggles).parent().find(l.DATA_TOGGLE)||t.makeArray(t(l.DATA_TOGGLE).not(n)),h=0;h<a.length;h++){var c=a[h].parentNode,u={relatedTarget:a[h]}
if(t(c).hasClass(p.OPEN)&&("click"!==e.type||!/input|textarea/i.test(e.target.tagName)||!t.contains(c,e.target))){var f=t.Event(o.HIDE,u)
t(c).trigger(f),f.isDefaultPrevented()||(a[h].setAttribute("aria-expanded","false"),t(c).removeClass(p.OPEN).trigger(t.Event(o.HIDDEN,u)))}}r&&t(document).trigger(r)}},d._dataApiKeydownHandler=function(e){if(!/input|textarea/i.test(e.target.tagName)){var r
for(var n in a)if(r=a[n]===e.which)break
if(r){if(e.preventDefault(),e.stopPropagation(),e.which==a.ESC){if(d._isCollapsed(this))return
var s=t(e.target).parents(l.DROPDOWN+"."+p.OPEN).last().find(">"+l.DATA_TOGGLE)
return d._clearMenus(),void s.trigger("focus")}if("A"==e.target.tagName){var i=c(e.target)
if(i.prop(":flat",d._isCollapsed(i.root())),i.is(":flat"))e.which===a.DOWN||e.which===a.UP?i[e.which===a.UP?"prev":"next"]().focus():e.which===a.LEFT?i.is(":opened")?i.close():i.parent().close().focus():e.which===a.RIGHT&&i.is(":toggle")&&i.open()
else if(i.is(":upper"))e.which===a.LEFT||e.which===a.RIGHT?(i[e.which===a.LEFT?"prev":"next"]().focus().open(),i.is(":toggle")&&i.close()):e.which!==a.DOWN&&e.which!==a.UP||!i.is(":toggle")||i.children()[e.which===a.DOWN?"first":"last"]().focus()
else if(e.which===a.LEFT){var o=i.parent()
o.is(":upper")?o.close().prev().focus().open():o.focus().close()}else if(e.which===a.RIGHT){var h=i.children()
h.length?(i.open(),h.first().focus()):i.parents(":upper").close().next().focus().open()}else(e.which===a.DOWN||e.which===a.UP)&&i[e.which===a.UP?"prev":"next"]().focus()}}}},d._isCollapsed=function(t){var e
return t.length&&(t=t[0]),t&&(e=/navbar-toggleable-(xs|sm|md|lg|xl)/.exec(t.className))&&window.innerWidth<h[e[1].toUpperCase()]},d._dataApiResizeHandler=function(){t(l.BASE).each(function(){var e=d._isCollapsed(this)
t(this).find(l.DROPDOWN).removeClass(p.OPEN),t(this).find('[aria-expanded="true"]').attr("aria-expanded","false")
var r=t(l.BACKDROP)[0]
r&&r.parentNode.removeChild(r),e!=t(this).hasClass(p.SM)&&(e?t(this).addClass(p.SM):t(this).removeClass(p.SM))})},t.fn[e]=function(e){return this.each(function(){var n=t(this).data(r)
if(n||t(this).data(r,n=new d(this)),"string"==typeof e){if(void 0===n[e])throw new Error('No method named "'+e+'"')
n[e].call(this)}})},t.fn[e].noConflict=function(){return t.fn[e]=i,this},t.fn[e].Constructor=d,t.fn[e].$$=c,t(window).on(o.RESIZE_DATA_API+" "+o.LOAD_DATA_API,d._dataApiResizeHandler),t(document).on(o.KEYDOWN_DATA_API,l.BASE,d._dataApiKeydownHandler).on(o.NAVBAR_COLLAPSE,d._clearMenus).on(o.CLICK_DATA_API,d._clearMenus).on(o.CLICK_DATA_API,l.DATA_TOGGLE,d.prototype.toggle).on(o.CLICK_DATA_API,l.FORM_CHILD,function(t){t.stopPropagation()}),t(window).trigger(o.READY)}(jQuery)
