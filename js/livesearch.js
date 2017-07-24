/*
	Livesearch Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.livesearch = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'livesearch', {});
			$.data(this, 'livesearch', Livesearch(this, options));
		});

	};

	// Initialization
	function Livesearch(el, options)
	{
		return new Livesearch.prototype.init(el, options);
	}

	$.Livesearch = Livesearch;
	$.Livesearch.NAME = 'livesearch';
	$.Livesearch.VERSION = '1.0';
	$.Livesearch.opts = {

		// settings
		url: false,
		target: false,
		min: 2,
		params: false,
		appendForms: false
	};

	// Functionality
	Livesearch.fn = $.Livesearch.prototype = {

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
				$.extend(true, {}, $.Livesearch.opts),
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
					if (namespace == 'tools.' + $.Livesearch.NAME || namespace == $.Livesearch.NAME + '.tools')
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
			this.$box = $('<span class="livesearch-box" />');

			this.$element.after(this.$box);
			this.$box.append(this.$element);

			this.$element.off('keyup.tools.livesearch');
			this.$element.on('keyup.tools.livesearch', $.proxy(this.load, this));

			this.$icon = $('<span class="livesearch-icon" />');
			this.$box.append(this.$icon);

			this.$close = $('<span class="close" />').hide();
			this.$box.append(this.$close);

			this.$close.off('click.tools.livesearch');
			this.$close.on('click.tools.livesearch', $.proxy(function()
			{
				this.search();
				this.$element.val('').focus();
				this.$close.hide();

			}, this));

		},
		toggleClose: function(length)
		{
			if (length === 0) this.$close.hide();
			else this.$close.show();
		},
		load: function()
		{
			var value = this.$element.val();
			var data = '';

			if (value.length > this.opts.min)
			{
				var name = 'q';
				if (typeof this.$element.attr('name') != 'undefined') name = this.$element.attr('name');

				data += '&' + name + '=' + value;
				data = this.appendForms(data);

				var str = '';
				if (this.opts.params)
				{
					this.opts.params = $.trim(this.opts.params.replace('{', '').replace('}', ''))
					var properties = this.opts.params.split(',');
					var obj = {};
					$.each(properties, function(k, v)
					{
					    var tup = v.split(':');
					    obj[$.trim(tup[0])] = $.trim(tup[1]);
					});

					str = [];
					$.each(obj, $.proxy(function(k, v)
					{
						str.push(k + "=" + v);

					}, this));

					str = str.join("&");

					data += '&' + str;
				}
			}

			this.toggleClose(value.length);
			this.search(data);

		},
		appendForms: function(data)
		{
			if (!this.opts.appendForms) return data;

			$.each(this.opts.appendForms, function(i, s)
			{
				data += '&' + $(s).serialize();
			});

			return data;
		},
		search: function(data)
		{
			$.ajax({
				url: this.opts.url,
				type: 'post',
				data: data,
				success: $.proxy(function(result)
				{
					$(this.opts.target).html(result);
					this.setCallback('result', result);

				}, this)
			});
		}
	};

	$(window).on('load.tools.livesearch', function()
	{
		$('[data-tools="livesearch"]').livesearch();
	});

	// constructor
	Livesearch.prototype.init.prototype = Livesearch.prototype;


})(jQuery);
