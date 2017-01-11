/*
	Progress Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	$.progress = {
		show: function()
		{
			if ($('#tools-progress').length !== 0)
			{
				$('#tools-progress').fadeIn();
			}
			else
			{
				var $progress = $('<div id="tools-progress"><span></span></div>').hide();
				$(document.body).append($progress);
				$('#tools-progress').fadeIn();
			}
		},
		update: function(value)
		{
			this.show();
			$('#tools-progress').find('span').css('width', value + '%');
		},
		hide: function()
		{
			$('#tools-progress').fadeOut(1500);
		}
	};


})(jQuery);
