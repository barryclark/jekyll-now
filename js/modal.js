/*
	Modal Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.modal = function(options)
	{
		var val = [];
		var args = Array.prototype.slice.call(arguments, 1);

		if (typeof options === 'string')
		{
			this.each(function()
			{
				var instance = $.data(this, 'modal');
				if (typeof instance !== 'undefined' && $.isFunction(instance[options]))
				{
					var methodVal = instance[options].apply(instance, args);
					if (methodVal !== undefined && methodVal !== instance) val.push(methodVal);
				}
				else return $.error('No such method "' + options + '" for Modal');
			});
		}
		else
		{
			this.each(function()
			{
				$.data(this, 'modal', {});
				$.data(this, 'modal', Modal(this, options));
			});
		}

		if (val.length === 0) return this;
		else if (val.length === 1) return val[0];
		else return val;
	};

	// Initialization
	function Modal(el, options)
	{
		return new Modal.prototype.init(el, options);
	}

	$.Modal = Modal;
	$.Modal.NAME = 'modal';
	$.Modal.VERSION = '1.0';
	$.Modal.opts = {

		title: '',
		width: 500,
		blur: false

	};

	// Functionality
	Modal.fn = $.Modal.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.$element.on('click.tools.modal', $.proxy(this.load, this));

		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Modal.opts),
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
					if (namespace == 'tools.' + $.Modal.NAME || namespace == $.Modal.NAME + '.tools')
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
		load: function()
		{
			this.build();
			this.enableEvents();
			this.setTitle();
			this.setDraggable();
			this.setContent();
		},
		build: function()
		{
			this.buildOverlay();

			this.$modalBox = $('<div class="modal-box" />').hide();
			this.$modal = $('<div class="modal" />');
			this.$modalHeader = $('<header />');
			this.$modalClose = $('<span class="modal-close" />').html('&times;');
			this.$modalBody = $('<section />');
			this.$modalFooter = $('<footer />');

			this.$modal.append(this.$modalHeader);
			this.$modal.append(this.$modalClose);
			this.$modal.append(this.$modalBody);
			this.$modal.append(this.$modalFooter);
			this.$modalBox.append(this.$modal);
			this.$modalBox.appendTo(document.body);
		},
		buildOverlay: function()
		{
			this.$modalOverlay = $('<div id="modal-overlay">').hide();
			$('body').prepend(this.$modalOverlay);

			if (this.opts.blur)
			{
				this.blurredElements = $('body').children('div, section, header, article, pre, aside, table').not('.modal, .modal-box, #modal-overlay');
				this.blurredElements.addClass('modal-blur');
			}
		},
		show: function()
		{
			// modal loading callback
			this.setCallback('loading', this.$modal);

			this.bodyOveflow = $(document.body).css('overflow');
			$(document.body).css('overflow', 'hidden');

			if (this.isMobile())
			{
				this.showOnMobile();
			}
			else
			{
				this.showOnDesktop();
			}

			this.$modalOverlay.show();
			this.$modalBox.show();

			this.setButtonsWidth();

			// resize
			if (!this.isMobile())
			{
				setTimeout($.proxy(this.showOnDesktop, this), 0);
				$(window).on('resize.tools.modal', $.proxy(this.resize, this));
			}

			// modal shown callback
			this.setCallback('opened', this.$modal);

			// fix bootstrap modal focus
			$(document).off('focusin.modal');

		},
		showOnDesktop: function()
		{
			var height = this.$modal.outerHeight();
			var windowHeight = $(window).height();
			var windowWidth = $(window).width();

			if (this.opts.width > windowWidth)
			{
				this.$modal.css({
					width: '96%',
					marginTop: (windowHeight/2 - height/2) + 'px'
				});
				return;
			}

			if (height > windowHeight)
			{
				this.$modal.css({
					width: this.opts.width + 'px',
					marginTop: '20px'
				});
			}
			else
			{
				this.$modal.css({
					width: this.opts.width + 'px',
					marginTop: (windowHeight/2 - height/2) + 'px'
				});
			}
		},
		showOnMobile: function()
		{
			this.$modal.css({
				width: '96%',
				marginTop: '2%'
			});

		},
		resize: function()
		{
			if (this.isMobile())
			{
				this.showOnMobile();
			}
			else
			{
				this.showOnDesktop();
			}
		},
		setTitle: function()
		{
			this.$modalHeader.html(this.opts.title);
		},
		setContent: function()
		{
			if (typeof this.opts.content == 'object' || this.opts.content.search('#') === 0)
			{
				this.type = 'html';

				this.$modalBody.html($(this.opts.content).html());
				this.show();
			}
			else
			{
				$.ajax({
					url: this.opts.content,
					cache: false,
					success: $.proxy(function(data)
					{
						this.$modalBody.html(data);
						this.show();

					}, this)
				});
			}

		},
		setDraggable: function()
		{
			if (typeof $.fn.draggable === 'undefined') return;

			this.$modal.draggable({ handle: this.$modalHeader });
			this.$modalHeader.css('cursor', 'move');
		},
		createCancelButton: function(label)
		{
			if (typeof label == 'undefined') label = 'Cancel';

			var button = $('<button>').addClass('btn modal-close-btn').html(label);
			button.on('click', $.proxy(this.close, this));

			this.$modalFooter.append(button);
		},
		createDeleteButton: function(label)
		{
			if (typeof label == 'undefined') label = 'Delete';

			return this.createButton(label, 'red');
		},
		createActionButton: function(label)
		{
			if (typeof label == 'undefined') label = 'Ok';

			return this.createButton(label, 'blue');
		},
		createButton: function(label, className)
		{
			var button = $('<button>').addClass('btn').addClass('btn-' + className).html(label);
			this.$modalFooter.append(button);

			return button;
		},
		setButtonsWidth: function()
		{
			var buttons = this.$modalFooter.find('button');
			var buttonsSize = buttons.size();
			if (buttonsSize === 0) return;

			buttons.css('width', (100/buttonsSize) + '%');
		},
		enableEvents: function()
		{
			this.$modalClose.on('click.tools.modal', $.proxy(this.close, this));
			$(document).on('keyup.tools.modal', $.proxy(this.closeHandler, this));
			this.$modalBox.on('click.tools.modal', $.proxy(this.close, this));
		},
		disableEvents: function()
		{
			this.$modalClose.off('click.tools.modal');
			$(document).off('keyup.tools.modal');
			this.$modalBox.off('click.tools.modal');
			$(window).off('resize.tools.modal');
		},
		closeHandler: function(e)
		{
			if (e.which != 27) return;

			this.close();
		},
		close: function(e)
		{
			if (e)
			{
				if (!$(e.target).hasClass('modal-close-btn') && e.target != this.$modalClose[0] && e.target != this.$modalBox[0])
				{
					return;
				}

				e.preventDefault();
			}

			if (!this.$modalBox) return;

			this.disableEvents();

			this.$modalOverlay.remove();
			this.$modalBox.fadeOut('fast', $.proxy(function()
			{
				this.$modalBox.remove();

				$(document.body).css('overflow', this.bodyOveflow);

				// remove blur
				if (this.opts.blur && typeof this.blurredElements != 'undefined')
				{
					this.blurredElements.removeClass('modal-blur');
				}

				this.setCallback('closed');

			}, this));
		},
		isMobile: function()
		{
			var mq = window.matchMedia("(max-width: 767px)");
			return (mq.matches) ? true : false;
		}
	};

	$(window).on('load.tools.modal', function()
	{
		$('[data-tools="modal"]').modal();
	});

	// constructor
	Modal.prototype.init.prototype = Modal.prototype;

})(jQuery);

