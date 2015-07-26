/*

	siteHeader.js
	-> assets/sass/partials/components/_nav.scss
	-> includes/components/siteHeader.html

*/

window.COM = window.COM || {};
window.COM.SiteHeader = window.COM.SiteHeader || {

	init: function() {
		var pagetype = $('body').data('pagetype');
		if(pagetype == 'homepage') {
			this.checkIfShouldShowSiteHeader();
			window.addEventListener('scroll', debounce(this.checkIfShouldShowSiteHeader, 50));
		} else {
			this.showSiteHeader();
		}
	},

	checkIfShouldShowSiteHeader: function(e) {
		if (window.scrollY > $(window).height()) {
			COM.SiteHeader.showSiteHeader();
		} else {
			COM.SiteHeader.hideSiteHeader();
		}
	},

	showSiteHeader: function() {
		$('.nav--topnav').css('top', '0');
	},

	hideSiteHeader: function() {
		$('.nav--topnav').css('top', '-100%');
	}

};

$(document).ready(function(){
	COM.SiteHeader.init();
});
