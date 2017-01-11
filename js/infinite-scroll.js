/*
	Infinity Scroll Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.infinityScroll = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'infinity-scroll', {});
			$.data(this, 'infinity-scroll', InfinityScroll(this, options));
		});
	};

	// Initialization
	function InfinityScroll(el, options)
	{
		return new InfinityScroll.prototype.init(el, options);
	}

	$.InfinityScroll = InfinityScroll;
	$.InfinityScroll.NAME = 'infinity-scroll';
	$.InfinityScroll.VERSION = '1.0';
	$.InfinityScroll.opts = {

		url: false,
		offset: 0,
		limit: 20,
		tolerance: 50,
		pagination: false

	};

	// Functionality
	InfinityScroll.fn = $.InfinityScroll.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.hidePagination();
			this.build();
		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.InfinityScroll.opts),
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
					if (namespace == 'tools.' + $.InfinityScroll.NAME || namespace == $.InfinityScroll.NAME + '.tools')
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
			$(window).on('DOMContentLoaded.tools.infinite-scroll load.tools.infinite-scroll resize.tools.infinite-scroll scroll.tools.infinite-scroll', $.proxy(function()
			{
				var $last = this.$element.children().last();
				if (this.isElementInViewport($last[0]))
				{
					this.getData();
				}

			}, this));
		},
		getData: function()
		{
			$.ajax({
				url: this.opts.url,
				type: 'post',
				data:  'limit=' + this.opts.limit + '&offset=' + this.opts.offset,
				success: $.proxy(function(data)
				{
					if (data === '')
					{
						$(window).off('.tools.infinite-scroll');
						return;
					}

					this.opts.offset = this.opts.offset + this.opts.limit;
					this.$element.append(data);

					this.setCallback('loaded', data);

				}, this)
			});
		},
		hidePagination: function()
		{
			if (!this.opts.pagination) return;

			$(this.opts.pagination).hide();
		},
		isElementInViewport: function(el)
		{
		    var rect = el.getBoundingClientRect();
		    return (
		        rect.top >= 0 &&
		        rect.left >= 0 &&
		        rect.bottom <= $(window).height() + this.opts.tolerance &&
		        rect.right <= $(window).width()
		    );
		}
	};

	$(window).on('load.tools.infinity-scroll', function()
	{
		$('[data-tools="infinity-scroll"]').infinityScroll();
	});

	// constructor
	InfinityScroll.prototype.init.prototype = InfinityScroll.prototype;

})(jQuery);

