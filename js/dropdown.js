/*
	Dropdown Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{

	// Plugin
	$.fn.dropdown = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'dropdown', {});
			$.data(this, 'dropdown', Dropdown(this, options));
		});

	};


	// Initialization
	function Dropdown(el, options)
	{
		return new Dropdown.prototype.init(el, options);
	}

	$.Dropdown = Dropdown;
	$.Dropdown.NAME = 'dropdown';
	$.Dropdown.VERSION = '1.0';
	$.Dropdown.opts = {

		target: false,
		targetClose: false,
		height: false, // number
		width: false // number

	};

	// Functionality
	Dropdown.fn = $.Dropdown.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.build();
		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Dropdown.opts),
				this.$element.data(),
				options
			);
		},
		setCallback: function(type, e, data)
		{
			var events = $._data(this.$element[0], 'events');
			if (events && typeof events[type] != 'undefined')
			{
				var value = [];
				var len = events[type].length;
				for (var i = 0; i < len; i++)
				{
					var namespace = events[type][i].namespace;
					if (namespace == 'tools.' + $.Dropdown.NAME || namespace == $.Dropdown.NAME + '.tools')
					{
						var callback = events[type][i].handler;
						value.push((typeof data == 'undefined') ? callback.call(this, e) : callback.call(this, e, data));
					}
				}

				if (value.length == 1) return value[0];
				else return value;
			}

			return (typeof data == 'undefined') ? e : data;

		},
		build: function()
		{
			this.$dropdown = $(this.opts.target);
			this.$dropdown.hide();

			this.$caret = $('<b class="caret"></b>');
			this.$element.append(this.$caret);

			this.setCaretUp();
			this.preventBodyScroll();

			this.$element.click($.proxy(this.toggle, this));
		},
		setCaretUp: function()
		{
			var height =  this.$element.offset().top + this.$element.innerHeight() + this.$dropdown.innerHeight();
			if ($(document).height() > height) return;

			this.$caret.addClass('caret-up');
		},
		toggle: function(e)
		{
			e.preventDefault();
			if (this.$element.hasClass('dropdown-in'))
			{
				this.hide();
			}
			else
			{
				this.show();
			}
		},
		getPlacement: function(height)
		{
			return ($(document).height() < height) ? 'top' : 'bottom';
		},
		getPosition: function()
		{
			return (this.$element.closest('.navigation-fixed').size() !== 0) ? 'fixed' : 'absolute';
		},
		setPosition: function()
		{
			var pos =  this.$element.position();
			var elementHeight = this.$element.innerHeight();
			var elementWidth = this.$element.innerWidth();
			var height = this.$dropdown.innerHeight();
			var width = this.$dropdown.innerWidth();

			var position = this.getPosition();
			var placement = this.getPlacement(pos.top + height + elementHeight);

			var leftFix = 0;
			if ($(window).width() < (pos.left + width))
			{
				leftFix = (width - elementWidth);
			}

			var top;
			var	left = pos.left - leftFix;
			if (placement == 'bottom')
			{
				this.$caret.removeClass('caret-up');
				top = (position == 'fixed') ? elementHeight : pos.top + elementHeight;
			}
			else
			{
				this.$caret.addClass('caret-up');
				top = (position == 'fixed') ? height : pos.top - height;
			}

			this.$dropdown.css({ position: position, top: top + 'px', left: left + 'px' });
		},
		show: function()
		{
			$('.dropdown-in').removeClass('dropdown-in');
			$('.dropdown').removeClass('dropdown-open').hide();

			if (this.opts.height) this.$dropdown.css('min-height', this.opts.height + 'px');
			if (this.opts.width) this.$dropdown.width(this.opts.width);

			this.setPosition();

			this.$dropdown.addClass('dropdown-open').show();
			this.$element.addClass('dropdown-in');

			$(document).on('scroll.tools.dropdown', $.proxy(this.setPosition, this));
			$(window).on('resize.tools.dropdown', $.proxy(this.setPosition, this));
			$(document).on('click.tools.dropdown touchstart.tools.dropdown', $.proxy(this.hide, this));

			if (this.opts.targetClose)
			{
				$(this.opts.targetClose).on('click.tools.dropdown', $.proxy(function(e)
				{
					e.preventDefault();

					this.hide(false);

				}, this));
			}

			$(document).on('keydown.tools.dropdown', $.proxy(function(e)
			{
				// esc
			   if (e.which === 27) this.hide();

			}, this));

			this.setCallback('opened', this.$dropdown, this.$element);

		},
		preventBodyScroll: function()
		{
			this.$dropdown.on('mouseover', function() { $('html').css('overflow', 'hidden'); });
			this.$dropdown.on('mouseout', function() { $('html').css('overflow', ''); });
		},
		hide: function(e)
		{
			if (e)
			{
				e = e.originalEvent || e;

				var $target = $(e.target);
				if ($target.hasClass('caret') || $target.hasClass('dropdown-in') || $target.closest('.dropdown-open').size() !== 0)
				{
					return;
				}
			}

			this.$dropdown.removeClass('dropdown-open').hide();
			this.$element.removeClass('dropdown-in');

			$(document).off('.tools.dropdown');
			$(window).off('.tools.dropdown');

			this.setCallback('closed', this.$dropdown, this.$element);
		}
	};

	$(window).on('load.tools.dropdown', function()
	{
		$('[data-tools="dropdown"]').dropdown();
	});

	// constructor
	Dropdown.prototype.init.prototype = Dropdown.prototype;


})(jQuery);