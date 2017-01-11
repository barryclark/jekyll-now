/*
	Tabs Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.tabs = function(options)
	{
		var val = [];
		var args = Array.prototype.slice.call(arguments, 1);

		if (typeof options === 'string')
		{
			this.each(function()
			{
				var instance = $.data(this, 'tabs');
				if (typeof instance !== 'undefined' && $.isFunction(instance[options]))
				{
					var methodVal = instance[options].apply(instance, args);
					if (methodVal !== undefined && methodVal !== instance) val.push(methodVal);
				}
				else return $.error('No such method "' + options + '" for Tabs');
			});
		}
		else
		{
			this.each(function()
			{
				$.data(this, 'tabs', {});
				$.data(this, 'tabs', Tabs(this, options));
			});
		}

		if (val.length === 0) return this;
		else if (val.length === 1) return val[0];
		else return val;
	};

	// Initialization
	function Tabs(el, options)
	{
		return new Tabs.prototype.init(el, options);
	}

	$.Tabs = Tabs;
	$.Tabs.NAME = 'tabs';
	$.Tabs.VERSION = '1.0';
	$.Tabs.opts = {

		equals: false,
		active: false

	};

	// Functionality
	Tabs.fn = $.Tabs.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;

			this.loadOptions(options);

			this.links = this.$element.find('a');
			this.tabs = [];

			this.links.each($.proxy(this.load, this));

			this.setEquals();
			this.setCallback('init');
		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Tabs.opts),
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
					if (namespace == 'tools.' + $.Tabs.NAME || namespace == $.Tabs.NAME + '.tools')
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
		load: function(i, el)
		{
			var $el = $(el);
			var hash = $el.attr('href');
			$el.attr('rel', hash);

			this.tabs.push($(hash));

			if (!$el.parent().hasClass('active'))
			{
				$(hash).hide();
			}

			// is hash in url
			this.readLocationHash(hash);

			// is active
			if (this.opts.active !== false && this.opts.active === hash)
			{
				this.show(hash);
			}

			$el.on('click', $.proxy(this.onClick, this));
		},
		onClick: function(e)
		{
			e.preventDefault();

			var hash = $(e.target).attr('rel');
			top.location.hash = hash;
			this.show(hash);
		},
		readLocationHash: function(hash)
		{
			if (top.location.hash === '' || top.location.hash != hash) return;

			this.opts.active = top.location.hash;
		},
		setActive: function(hash)
		{
			this.activeHash = hash;
			this.activeTab = $('[rel=' + hash + ']');

			this.links.parent().removeClass('active');
			this.activeTab.parent().addClass('active');
		},
		getActiveHash: function()
		{
			return this.activeHash;
		},
		getActiveTab: function()
		{
			return this.activeTab;
		},
		show: function(hash)
		{
			this.hideAll();
			$(hash).show();
			this.setActive(hash);

			this.setCallback('show', $('[rel=' + hash + ']'), hash);
		},
		hideAll: function()
		{
			$.each(this.tabs, function()
			{
				$(this).hide();
			});
		},
		setEquals: function()
		{
			if (!this.opts.equals) return;

			this.setMaxHeight(this.getMaxHeight());
		},
		setMaxHeight: function(height)
		{
			$.each(this.tabs, function()
			{
				$(this).css('min-height', height + 'px');
			});
		},
		getMaxHeight: function()
		{
			var max = 0;
			$.each(this.tabs, function()
			{
				var h = $(this).height();
				max = h > max ? h : max;
			});

			return max;
		}
	};

	$(window).on('load.tools.tabs', function()
	{
		$('[data-tools="tabs"]').tabs();
	});

	// constructor
	Tabs.prototype.init.prototype = Tabs.prototype;

})(jQuery);

