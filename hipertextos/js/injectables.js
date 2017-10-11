// hipertextos Injectables: jQuery & CSS basics
// by Acozar [www.hipertextos.net]

$(function() {

	var url = document.URL;
	
	// Sharing-list 
	
	$('.sharing-list').html('<ul>'+
		'<li><a href="http://www.facebook.com/sharer.php?u='+ url +'&t=title" target="blank" title="Share now">Share on Facebook</a></li>'+
		'<li><a href="https://plusone.google.com/_/+1/confirm?hl=en&url='+ url +'" target="blank" title="Share now">Share on Google +</a></li>'+
		'<li><a href="http://twitter.com/?status='+ url +'" target="blank" title="Tweet now">Share on Twitter</a></li>'+
	'</ul>');
	
	// Social-buttons 
	
	$('.sharing-buttons').html('<div>'+
		'<a href="http://www.facebook.com/sharer.php?u='+ url +'&t=title" class="button flat blue" target="blank" title="Share now">Share on Facebook</a>'+
		'<a href="https://plusone.google.com/_/+1/confirm?hl=en&url='+ url +'" class="button flat soft-red" target="blank" title="Share now">Share on Google +</a>'+
		'<a href="http://twitter.com/?status='+ url +'" class="button flat soft-blue" target="blank" title="Tweet now">Share on Twitter</a>'+
	'</div>');
	
	// Translating list 

	$('.translating-list').html('<ul>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=ca&u='+ url +'" target="blank" title="Translate with Google Translate">Catalan</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=de&u='+ url +'" target="blank" title="Translate with Google Translate">Deutsch</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=en&u='+ url +'" target="blank" title="Translate with Google Translate">English</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=fr&u='+ url +'" target="blank" title="Translate with Google Translate">French</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=it&u='+ url +'" target="blank" title="Translate with Google Translate">Italian</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=pt&u='+ url +'" target="blank" title="Translate with Google Translate">Portuguese</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=es&u='+ url +'" target="blank" title="Translate with Google Translate">Spanish</a></li>'+
	'</ul>');
	
	// Translating buttons 

	$('.translating-buttons').html('<div>'+
		'<a href="http://translate.google.es/translate?hl=es&sl=auto&tl=ca&u='+ url +'" class="button" target="blank" title="Translate with Google Translate">Catalan</a>'+
		'<a href="http://translate.google.es/translate?hl=es&sl=auto&tl=de&u='+ url +'" class="button" target="blank" title="Translate with Google Translate">Deutsch</a>'+
		'<a href="http://translate.google.es/translate?hl=es&sl=auto&tl=en&u='+ url +'" class="button" target="blank" title="Translate with Google Translate">English</a>'+
		'<a href="http://translate.google.es/translate?hl=es&sl=auto&tl=fr&u='+ url +'" class="button" target="blank" title="Translate with Google Translate">French</a>'+
		'<a href="http://translate.google.es/translate?hl=es&sl=auto&tl=it&u='+ url +'" class="button" target="blank" title="Translate with Google Translate">Italian</a>'+
		'<a href="http://translate.google.es/translate?hl=es&sl=auto&tl=pt&u='+ url +'" class="button" target="blank" title="Translate with Google Translate">Portuguese</a>'+
		'<a href="http://translate.google.es/translate?hl=es&sl=auto&tl=es&u='+ url +'" class="button" target="blank" title="Translate with Google Translate">Spanish</a>'+
	'</div>');
	
});