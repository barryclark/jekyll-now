/*
	Validate Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.validate = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'validate', {});
			$.data(this, 'validate', Validate(this, options));
		});
	};

	// Initialization
	function Validate(el, options)
	{
		return new Validate.prototype.init(el, options);
	}

	$.Validate = Validate;
	$.Validate.NAME = 'validate';
	$.Validate.VERSION = '1.0';
	$.Validate.opts = {

		url: false,
		tooltip: false,
		trigger: false,
		delay: 10, // message delay - seconds or false
		errorClassName: 'input-error',
		spanClassName: 'error'

	};

	// Functionality
	Validate.fn = $.Validate.prototype = {

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
				$.extend(true, {}, $.Validate.opts),
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
					if (namespace == 'tools.' + $.Validate.NAME || namespace == $.Validate.NAME + '.tools')
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
			// disable html5 validation
			this.$element.attr('novalidate', 'novalidate');

			if (this.opts.trigger === false)
			{
				// submit
				this.$element.submit($.proxy(function()
				{
					this.send();
					return false;

				}, this));
			}
			else
			{
				// trigger
				this.$element.submit(function() { return false; });
				$(this.opts.trigger).off('click.tools.validate');
				$(this.opts.trigger).on('click.tools.validate', $.proxy(this.send, this));
			}
		},
		send: function()
		{
			$.ajax({
				url: this.opts.url,
				type: 'post',
				data: this.$element.serialize(),
				success: $.proxy(this.parse, this)
			});
		},
		parse: function(jsonString)
		{
			this.clear();

			var obj = {};
			if (jsonString !== '')
			{
				jsonString = jsonString.replace(/^\[/, '');
				jsonString = jsonString.replace(/\]$/, '');
				obj = $.parseJSON(jsonString);
			}

			if (obj.type === 'error')
			{
				$.each(obj.errors, $.proxy(function(name, text)
				{
					var $el = $(this.$element.find('[name=' + name + ']'));
					$el.addClass(this.opts.errorClassName);

					if (text !== '')
					{
						if (this.opts.tooltip) this.showTooltip($el, text);
						else this.showError($el, name, text);
					}

				}, this));

				this.setCallback('error', obj.errors);
			}
			else
			{
				if (obj.type === 'html')
				{
					$.each(obj.data, $.proxy(function(i, s)
					{
						$(i).html(this.stripslashes(this.urldecode(s)));

					}, this));
				}
				else if (obj.type === 'location')
				{
					top.location.href = obj.data;
				}
				else if (obj.type === 'message')
				{
					this.showMessage(obj);
				}

				this.setCallback('success');
			}
		},
		showMessage: function(obj)
		{
			var text = '';
			if ($.isArray(obj.data))
			{
				text = '<ul>';
				var len = obj.data.length;
				for (var i = 0; i < len; i++)
				{
					text += '<li>' + obj.data[i] + '</li>';
				}
				text += '</ul>';
			}
			else
			{
				text = obj.data;
			}

			var theme = '';
			if (typeof obj.theme != 'undefined')
			{
				theme = ' tools-message-' + obj.theme;
			}

			var message = $('<div class="tools-message' + theme + '" />').html(text);
			$('body').append(message);
			message.on('click.tools.validate', function()
			{
				message.remove();
				message.off('click.tools.validate');
			});

			if (this.opts.delay)
			{
				setTimeout(function()
				{
					message.fadeOut();

				}, this.opts.delay * 1000);
			}
		},
		showError: function($el, name, text)
		{
			$('#' + name + '-error').addClass(this.opts.spanClassName).html(text).show();

			var eventName = 'keyup';
			var tag = $el.prop('tagName');
			var type = $el.prop('type');

			if (tag == 'SELECT' || type == 'checkbox' || type == 'radio')
			{
				eventName = 'change';
			}

			$el.on(eventName + '.tools.validate', $.proxy(function()
			{
				$el.removeClass(this.opts.errorClassName);
				$('#' + name + '-error').removeClass('validate-error').html('').hide();
				$el.off(eventName + '.tools.validate');

			}, this));
		},
		showTooltip: function($el, text)
		{
			var size = $el.size();
			if (size !== 0)
			{
				if (size > 1)
				{
					$el = $el.last();
				}

				var tooltip = $('<div class="validate-tooltip tooltip tooltip-theme-red" />').html(text);
				tooltip.css({ top: ($el.offset().top + $el.innerHeight() + 2) + 'px', left: $el.offset().left + 'px' });
				$('body').append(tooltip);

				var eventName = 'keyup';
				var tag = $el.prop('tagName');
				var type = $el.prop('type');

				if (tag == 'SELECT' || type == 'checkbox' || type == 'radio')
				{
					eventName = 'change';
				}

				$el.on(eventName + '.tools.validate', function()
				{
					tooltip.remove();
					$el.off(eventName + '.tools.validate');
				});
			}
		},
		clear: function()
		{
			this.$element.find('.' + this.opts.errorClassName).removeClass(this.opts.errorClassName);
			$('.validate-error').removeClass('validate-error').html('').hide();
			$('.validate-tooltip').remove();
			$('.tools-message').remove();
		},
		urldecode: function(str)
		{
			return decodeURIComponent(str.replace(/\+/g, '%20'));
		},
		stripslashes: function(str)
		{
			return (str+'').replace(/\0/g, '0').replace(/\\([\\'"])/g, '$1');
		}
	};

	$(window).on('load.tools.validate', function()
	{
		$('[data-tools="validate"]').validate();
	});

	// constructor
	Validate.prototype.init.prototype = Validate.prototype;


})(jQuery);