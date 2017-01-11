/*
	Autocomplete Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.autocomplete = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'autocomplete', {});
			$.data(this, 'autocomplete', Autocomplete(this, options));
		});

	};

	// Initialization
	function Autocomplete(el, options)
	{
		return new Autocomplete.prototype.init(el, options);
	}

	$.Autocomplete = Autocomplete;
	$.Autocomplete.NAME = 'autocomplete';
	$.Autocomplete.VERSION = '1.0';
	$.Autocomplete.opts = {

		url: false,
		min: 2,
		set: 'value' // value or id

	};

	// Functionality
	Autocomplete.fn = $.Autocomplete.prototype = {

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
				$.extend(true, {}, $.Autocomplete.opts),
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
					if (namespace == 'tools.' + $.Autocomplete.NAME || namespace == $.Autocomplete.NAME + '.tools')
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
			this.result = $('<ul class="autocomplete">').hide();

			this.pos = this.$element.offset();
			this.elementHeight = this.$element.innerHeight();

			$('body').append(this.result);

			this.placement = (($(document).height() - (this.pos.top + this.elementHeight)) < this.result.height()) ? 'top' : 'bottom';
			$(document).on('click', $.proxy(this.hide, this));

			this.$element.on('keyup', $.proxy(function(e)
			{
				var value = this.$element.val();
				if (value.length >= this.opts.min)
				{
					this.$element.addClass('autocomplete-in');
					this.result.addClass('autocomplete-open');

					this.listen(e);
				}
				else
				{
					this.hide();
				}

			}, this));
		},
		lookup: function()
		{
			$.ajax({
				url: this.opts.url,
				type: 'post',
				data: this.$element.attr('name') + '=' + this.$element.val(),
				success: $.proxy(function(json)
				{
					var data = $.parseJSON(json);

					this.result.html('');

					$.each(data, $.proxy(function(i,s)
					{
						var li = $('<li>');
						var a = $('<a href="#" rel="' + s.id + '">').html(s.value).on('click', $.proxy(this.set, this));

						li.append(a);
						this.result.append(li);

					}, this));

					var top = (this.placement === 'top') ? (this.pos.top - this.result.height() - this.elementHeight) : (this.pos.top + this.elementHeight);

					this.result.css({ top: top + 'px', left: this.pos.left + 'px' });
					this.result.show();
					this.active = false;

				}, this)
			});

		},
		listen: function(e)
		{
			if (!this.$element.hasClass('autocomplete-in')) return;

			e.stopPropagation();
			e.preventDefault();

			switch(e.keyCode)
			{
				case 40: // down arrow
					this.select('next');
				break;

				case 38: // up arrow
					this.select('prev');
				break;

				case 13: // enter
					this.set();
				break;

				case 27: // escape
					this.hide();
				break;

				default:
					this.lookup();
				break;
			}

		},
		select: function(type)
		{
			var $links = this.result.find('a');
			var size = $links.size();

			var $active = this.result.find('a.active');
			$active.removeClass('active');

			var $item = (type === 'next') ? $active.parent().next().children('a') : $active.parent().prev().children('a');
			if ($item.size() === 0)
			{
				$item = (type === 'next') ? $links.eq(0) : $links.eq(size-1);
			}

			$item.addClass('active');
			this.active = $item;
		},
		set: function(e)
		{
			var $el = $(this.active);
			if (e)
			{
				e.preventDefault();
				$el = $(e.target);
			}

			var id = $el.attr('rel');
			var value = $el.html();

			if (this.opts.set == 'value')
			{
				this.$element.val(value);
			}
			else
			{
				this.$element.val(id);
			}

			this.setCallback('set', id, value);


			this.hide();
		},
		hide: function(e)
		{
			if (e && ($(e.target).hasClass('autocomplete-in') || $(e.target).hasClass('autocomplete-open') || $(e.target).parents().hasClass('autocomplete-open')))
			{
				return;
			}

			this.$element.removeClass('autocomplete-in');
			this.result.removeClass('autocomplete-open');
			this.result.hide();
		}
	};

	$(window).on('load.tools.autocomplete', function()
	{
		$('[data-tools="autocomplete"]').autocomplete();
	});

	// constructor
	Autocomplete.prototype.init.prototype = Autocomplete.prototype;


})(jQuery);