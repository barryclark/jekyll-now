/*
	Accordion Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.accordion = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'accordion', {});
			$.data(this, 'accordion', Accordion(this, options));
		});

	};

	// Initialization
	function Accordion(el, options)
	{
		return new Accordion.prototype.init(el, options);
	}

	$.Accordion = Accordion;
	$.Accordion.NAME = 'accordion';
	$.Accordion.VERSION = '1.0';
	$.Accordion.opts = {

		scroll: false,
		collapse: true,
		toggle: true,
		titleClass: '.accordion-title',
		panelClass: '.accordion-panel'

	};

	// Functionality
	Accordion.fn = $.Accordion.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.build();

			if (this.opts.collapse)
			{
				this.closeAll();
			}
			else
			{
				this.openAll();
			}

			this.loadFromHash();
		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Accordion.opts),
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
					if (namespace == 'tools.' + $.Accordion.NAME || namespace == $.Accordion.NAME + '.tools')
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
		getTitles: function()
		{
			this.titles = this.$element.find(this.opts.titleClass);
			this.titles.append($('<span />').addClass('accordion-toggle'));
			this.titles.each(function()
			{
				var $el = $(this);
				$el.attr('rel',  $el.attr('href'));
			});

		},
		getPanels: function()
		{
			this.panels = this.$element.find(this.opts.panelClass);
		},
		build: function()
		{
			this.getTitles();
			this.getPanels();

			this.titles.on('click', $.proxy(this.toggle, this));
		},
		loadFromHash: function()
		{
			if (top.location.hash === '') return;
			if (!this.opts.scroll) return;
			if (this.$element.find('[rel=' + top.location.hash +']').size() === 0) return;

			this.open(top.location.hash);
			this.scrollTo(top.location.hash);
		},
		toggle: function(e)
		{
			e.preventDefault();
			e.stopPropagation();

			var hash = $(e.target).attr('rel');

			if (this.opts.toggle)
			{
				var $target = $(e.target);
				var $title = $target.closest(this.opts.titleClass);
				var opened = $title.hasClass('accordion-title-opened');

				this.closeAll();

				if (!opened) this.open(hash);
			}
			else
			{
				if ($('[rel=' + hash + ']').hasClass('accordion-title-opened'))
				{
					this.close(hash);
				}
				else
				{
					this.open(hash);
				}
			}
		},
		open: function(hash)
		{
			this.$title = $('[rel=' + hash + ']');
			this.$panel = $(hash);

			top.location.hash = hash;

			this.setStatus('open');
			this.$panel.show();

			this.setCallback('opened', this.$title, this.$panel);
		},
		close: function(hash)
		{
			this.$title = $('[rel=' + hash + ']');
			this.$panel = $(hash);

			this.setStatus('close');
			this.$panel.hide();

			this.setCallback('closed', this.$title, this.$panel);
		},
		setStatus: function(command)
		{
			var items = { toggle: this.$title.find('span.accordion-toggle'), title: this.$title, panel: this.$panel };

			$.each(items, function(i, s)
			{
				if (command == 'close')
				{
					s.removeClass('accordion-' + i + '-opened').addClass('accordion-' + i + '-closed');
				}
				else
				{
					s.removeClass('accordion-' + i + '-closed').addClass('accordion-' + i + '-opened');
				}
			});
		},
		openAll: function()
		{
			this.titles.each($.proxy(function(i, s)
			{
				this.open($(s).attr('rel'));

			}, this));
		},
		closeAll: function()
		{
			this.titles.each($.proxy(function(i, s)
			{
				this.close($(s).attr('rel'));

			}, this));
		},
		scrollTo: function(id)
		{
			$('html, body').animate(
			{
				scrollTop: $(id).offset().top - 50

			}, 500);
		}
	};

	$(window).on('load.tools.accordion', function()
	{
		$('[data-tools="accordion"]').accordion();
	});

	// constructor
	Accordion.prototype.init.prototype = Accordion.prototype;


})(jQuery);