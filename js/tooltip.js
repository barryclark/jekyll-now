/*
	Tooltip Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.tooltip = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'tooltip', {});
			$.data(this, 'tooltip', Tooltip(this, options));
		});
	};

	// Initialization
	function Tooltip(el, options)
	{
		return new Tooltip.prototype.init(el, options);
	}

	$.Tooltip = Tooltip;
	$.Tooltip.NAME = 'tooltip';
	$.Tooltip.VERSION = '1.0';
	$.Tooltip.opts = {

		theme: false

	};

	// Functionality
	Tooltip.fn = $.Tooltip.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;

			this.loadOptions(options);

			this.$element.on('mouseover', $.proxy(this.show, this));
			this.$element.on('mouseout', $.proxy(this.hide, this));
		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Tooltip.opts),
				this.$element.data(),
				options
			);
		},
		show: function()
		{
			$('.tooltip').hide();

			var text = this.$element.attr('title');
			this.$element.data('cached-title', text);
			this.$element.attr('title', '');

			this.tooltip = $('<div class="tooltip" />').html(text).hide();

			if (this.opts.theme !== false)
			{
				this.tooltip.addClass('tooltip-theme-' + this.opts.theme);
			}

			this.tooltip.css({
				top: (this.$element.offset().top + this.$element.innerHeight()) + 'px',
				left: this.$element.offset().left + 'px'
			});

			$('body').append(this.tooltip);

			this.tooltip.show();

		},
		hide: function()
		{
			this.tooltip.fadeOut('fast', $.proxy(function()
			{
				this.tooltip.remove();

			}, this));

			this.$element.attr('title', this.$element.data('cached-title'));
			this.$element.data('cached-title', '');
		}
	};

	// Constructor
	Tooltip.prototype.init.prototype = Tooltip.prototype;

	$(function()
	{
		$('[data-tools="tooltip"]').tooltip();
	});

})(jQuery);
