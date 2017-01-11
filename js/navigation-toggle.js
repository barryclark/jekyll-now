/*
	Navigation Toggle Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.navigationToggle = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'navigationToggle', {});
			$.data(this, 'navigationToggle', NavigationToggle(this, options));
		});

	};

	// Initialization
	function NavigationToggle(el, options)
	{
		return new NavigationToggle.prototype.init(el, options);
	}

	$.NavigationToggle = NavigationToggle;
	$.NavigationToggle.NAME = 'navigation-toggle';
	$.NavigationToggle.VERSION = '1.0';
	$.NavigationToggle.opts = {

		target: false

	};

	// Functionality
	NavigationToggle.fn = $.NavigationToggle.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.$target = $(this.opts.target);

			this.$toggle = this.$element.find('span');
			this.$toggle.on('click', $.proxy(this.onClick, this));

		    this.build();
		    $(window).resize($.proxy(this.build, this));

		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.NavigationToggle.opts),
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
					if (namespace == 'tools.' + $.NavigationToggle.NAME || namespace == $.NavigationToggle.NAME + '.tools')
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
			var mq = window.matchMedia("(max-width: 767px)");
			if (mq.matches)
			{
				// hide
				if (!this.$target.hasClass('navigation-target-show'))
				{
					this.$element.addClass('navigation-toggle-show').show();
					this.$target.addClass('navigation-target-show').hide();
				}

			}
			else
			{
				// show
				this.$element.removeClass('navigation-toggle-show').hide();
				this.$target.removeClass('navigation-target-show').show();
			}
		},
		onClick: function(e)
		{
			e.stopPropagation();
			e.preventDefault();

			if (this.isTargetHide())
			{
				this.$element.addClass('navigation-toggle-show');
				this.$target.show();
				this.setCallback('show', this.$target);
			}
			else
			{
				this.$element.removeClass('navigation-toggle-show');
				this.$target.hide();
				this.setCallback('hide', this.$target);
			}
		},
		isTargetHide: function()
		{
			return (this.$target[0].style.display == 'none') ? true : false;
		}
	};

	$(window).on('load.tools.navigation-toggle', function()
	{
		$('[data-tools="navigation-toggle"]').navigationToggle();
	});

	// constructor
	NavigationToggle.prototype.init.prototype = NavigationToggle.prototype;


})(jQuery);