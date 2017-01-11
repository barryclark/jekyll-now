/*
	TextFit Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.textfit = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'textfit', {});
			$.data(this, 'textfit', Textfit(this, options));
		});

	};

	// Initialization
	function Textfit(el, options)
	{
		return new Textfit.prototype.init(el, options);
	}

	$.Textfit = Textfit;
	$.Textfit.NAME = 'textfit';
	$.Textfit.VERSION = '1.0';
	$.Textfit.opts = {

		min: '10px',
		max: '100px',
		compressor: 1

	};

	// Functionality
	Textfit.fn = $.Textfit.prototype = {

		// Initialization
		init: function(el, options)
		{

			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.$element.css('font-size', Math.max(Math.min(this.$element.width() / (this.opts.compressor*10), parseFloat(this.opts.max)), parseFloat(this.opts.min)));

		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Textfit.opts),
				this.$element.data(),
				options
			);
		}
	};

	$(window).on('load.tools.textfit', function()
	{
		$('[data-tools="textfit"]').textfit();
	});

	// constructor
	Textfit.prototype.init.prototype = Textfit.prototype;


})(jQuery);