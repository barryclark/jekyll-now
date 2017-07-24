/*
	Tabs Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.message = function(options)
	{
		var val = [];
		var args = Array.prototype.slice.call(arguments, 1);

		if (typeof options === 'string')
		{
			this.each(function()
			{
				var instance = $.data(this, 'message');
				if (typeof instance !== 'undefined' && $.isFunction(instance[options]))
				{
					var methodVal = instance[options].apply(instance, args);
					if (methodVal !== undefined && methodVal !== instance) val.push(methodVal);
				}
				else return $.error('No such method "' + options + '" for Message');
			});
		}
		else
		{
			this.each(function()
			{
				$.data(this, 'message', {});
				$.data(this, 'message', Message(this, options));
			});
		}

		if (val.length === 0) return this;
		else if (val.length === 1) return val[0];
		else return val;
	};

	// Initialization
	function Message(el, options)
	{
		return new Message.prototype.init(el, options);
	}

	$.Message = Message;
	$.Message.NAME = 'message';
	$.Message.VERSION = '1.0';
	$.Message.opts = {

		target: false,
		delay: 10 // message delay - seconds or false

	};

	// Functionality
	Message.fn = $.Message.prototype = {

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
				$.extend(true, {}, $.Message.opts),
				this.$element.data(),
				options
			);
		},
		setCallback: function(type, e, data)
		{
			var events = $._data(this.$message[0], 'events');
			if (events && typeof events[type] != 'undefined')
			{
				var value = [];
				var len = events[type].length;
				for (var i = 0; i < len; i++)
				{
					var namespace = events[type][i].namespace;
					if (namespace == 'tools.' + $.Message.NAME || namespace == $.Message.NAME + '.tools')
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

			if (!this.opts.target)
			{
				this.$message = this.$element;
				this.show();
			}
			else
			{
				this.$message = $(this.opts.target);

				this.$message.data('message', '');
				this.$message.data('message', this);

				this.$element.on('click', $.proxy(this.show, this));
			}
		},
		show: function()
		{
			if (this.$message.hasClass('open'))
			{
				this.hide();
				return;
			}

			$('.tools-message').hide().removeClass('open');
			this.$message.addClass('open').fadeIn('fast').on('click.tools.message', $.proxy(this.hide, this));

			$(document).on('keyup.tools.message', $.proxy(this.hideHandler, this));

			if (this.opts.delay)
			{
				setTimeout($.proxy(this.hide, this), this.opts.delay * 1000);
			}

			this.setCallback('opened');
		},
		hideHandler: function(e)
		{
			if (e.which != 27) return;

			this.hide();
		},
		hide: function()
		{
			if (!this.$message.hasClass('open')) return;

			this.$message.off('click.tools.message');
			$(document).off('keyup.tools.message');
			this.$message.fadeOut('fast', $.proxy(function()
			{
				this.$message.removeClass('open');
				this.setCallback('closed');

			}, this));
		}
	};

	// Constructor
	Message.prototype.init.prototype = Message.prototype;

	$(function()
	{
		$('[data-tools="message"]').message();
	});

})(jQuery);

