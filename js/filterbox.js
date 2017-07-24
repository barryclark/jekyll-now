/*
	FilterBox Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.filterbox = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'filterbox', {});
			$.data(this, 'filterbox', Filterbox(this, options));
		});
	};

	// Initialization
	function Filterbox(el, options)
	{
		return new Filterbox.prototype.init(el, options);
	}

	$.Filterbox = Filterbox;
	$.Filterbox.NAME = 'filterbox';
	$.Filterbox.VERSION = '1.0';
	$.Filterbox.opts = {

		// settings
		placeholder: false
	};

	// Functionality
	Filterbox.fn = $.Filterbox.prototype = {

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
				$.extend(true, {}, $.Filterbox.opts),
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
					if (namespace == 'tools.' + $.Filterbox.NAME || namespace == $.Filterbox.NAME + '.tools')
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
			this.$sourceBox = $('<div class="filterbox" />');
			this.$sourceSelect = $('<span class="filterbox-toggle" />');
			this.$sourceLayer = $('<ul class="filterbox-list hide" />');
			this.$source = $('<input type="text" id="' + this.$element.attr('id') + '-input" class="' + this.$element.attr('class') + '" />');

			this.$sourceBox.append(this.$source);
			this.$sourceBox.append(this.$sourceSelect);
			this.$sourceBox.append(this.$sourceLayer);

			this.setPlaceholder();

			this.$element.hide().after(this.$sourceBox);
			this.$element.find('option').each($.proxy(this.buildListItemsFromOptions, this));

			this.$source.on('keyup', $.proxy(this.clearSelected, this));
			this.$sourceSelect.on('click', $.proxy(this.load, this));

			this.preventBodyScroll();

		},
		load: function(e)
		{
			e.preventDefault();

			if (this.$sourceLayer.hasClass('open'))
			{
				this.close();
				return;
			}

			var value = this.$element.val();

			this.$sourceLayer.addClass('open').show();

			var items = this.$sourceLayer.find('li').removeClass('active');
			this.setSelectedItem(items, value);

			$(document).on('click.tools.filterbox', $.proxy(this.close, this));
			$(document).on('keydown.tools.filterbox', $.proxy(function(e)
			{
			   var key = e.which;
			   var $el;
			   var item;

			   if (key === 38) // up
			   {
				   e.preventDefault();

				   if (items.hasClass('active'))
				   {
					   	item = items.filter('li.active');
				   		item.removeClass('active');

				   		var prev = item.prev();
				   		$el = (prev.size() !== 0) ? $el = prev : items.last();
				   }
				   else
				   {
				   		$el = items.last();
				   }

				   $el.addClass('active');
				   this.setScrollTop($el);
			   }
			   else if (key === 40) // down
			   {
				   e.preventDefault();

				   if (items.hasClass('active'))
				   {
				   		item = items.filter('li.active');
				   		item.removeClass('active');

				   		var next = item.next();
				   		$el = (next.size() !== 0) ? next : items.first();
				   }
				   else
				   {
					    $el = items.first();
				   }

				   $el.addClass('active');
				   this.setScrollTop($el);

			   }
			   else if (key === 13) // enter
			   {
			   		if (!items.hasClass('active')) return;

				   	item = items.filter('li.active');
					this.onItemClick(e, item);
			   }
			   else if (key === 27) // esc
			   {
				   this.close();
			   }

			}, this));

		},
		clearSelected: function()
		{
			if (this.$source.val().length === 0) this.$element.val(0);
		},
		setSelectedItem: function(items, value)
		{
			var selectEl = items.filter('[rel=' + value + ']');
			if (selectEl.size() === 0)
			{
				selectEl = false;

				// if user typed value
				var sourceValue = this.$source.val();
				$.each(items, function(i,s)
				{
					var $s = $(s);
					if ($s.text() == sourceValue)
					{
						selectEl = $s;
					}
				});

				if (selectEl === false) return;
			}

			selectEl.addClass('active');
			this.setScrollTop(selectEl);
		},
		setScrollTop: function($el)
		{
			this.$sourceLayer.scrollTop(this.$sourceLayer.scrollTop() + $el.position().top - 40);
		},
		buildListItemsFromOptions: function(i,s)
		{
			var $el = $(s);
			var val = $el.val();
			if (val === 0) return;

			var item = $('<li />');

			item.attr('rel', val).text($el.html());
			item.on('click', $.proxy(this.onItemClick, this));

			this.$sourceLayer.append(item);
		},
		onItemClick: function(e, item)
		{
			e.preventDefault();

			var $el = $(item || e.target);
			var rel = $el.attr('rel');
			var text = $el.text();

			this.$source.val(text);
			this.$element.val(rel);

			this.close();

			this.setCallback('select', { id: rel, value: text });
		},
		preventBodyScroll: function()
		{
			this.$sourceLayer.on('mouseover', function() { $('html').css('overflow', 'hidden'); });
			this.$sourceLayer.on('mouseout', function() { $('html').css('overflow', ''); });
		},
		setPlaceholder: function()
		{
			if (!this.opts.placeholder) return;
			this.$source.attr('placeholder', this.opts.placeholder);
		},
		close: function(e)
		{
			if (e && ($(e.target).hasClass('filterbox-toggle') || $(e.target).closest('div.filterbox').size() == 1))
			{
				return;
			}

			this.$sourceLayer.removeClass('open').hide();
			$(document).off('.tools.filterbox');
		}
	};

	$(window).on('load.tools.filterbox', function()
	{
		$('[data-tools="filterbox"]').filterbox();
	});

	// constructor
	Filterbox.prototype.init.prototype = Filterbox.prototype;


})(jQuery);