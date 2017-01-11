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
/*
	Buttons Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.buttons = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'buttons', {});
			$.data(this, 'buttons', Buttons(this, options));
		});

	};

	// Initialization
	function Buttons(el, options)
	{
		return new Buttons.prototype.init(el, options);
	}

	$.Buttons = Buttons;
	$.Buttons.NAME = 'buttons';
	$.Buttons.VERSION = '1.0';
	$.Buttons.opts = {

		className: 'btn',
		activeClassName: 'btn-active',
		target: false,
		type: 'switch' // switch, toggle, segmented

	};

	// Functionality
	Buttons.fn = $.Buttons.prototype = {

		// Initialization
		init: function(el, options)
		{

			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.buttons = this.getButtons();
			this.value = this.getValue();

			this.buttons.each($.proxy(function(i,s)
			{
				var $s = $(s);

				this.setDefault($s);

				$s.click($.proxy(function(e)
				{
					e.preventDefault();

					if (this.opts.type === 'segmented') this.setSegmented($s);
					else if (this.opts.type === 'toggle') this.setToggle($s);
					else this.setBasic($s);

				}, this));

			}, this));
		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Buttons.opts),
				this.$element.data(),
				options
			);
		},
		getButtons: function()
		{
			return (this.opts.type === 'toggle') ? this.$element : this.$element.find('.' + this.opts.className);
		},
		getValue: function()
		{
			return (this.opts.type === 'segmented') ? $(this.opts.target).val().split(',') : $(this.opts.target).val();
		},
		setDefault: function($el)
		{
			if (this.opts.type === 'segmented' && $.inArray($el.val(), this.value) !== -1)
			{
				this.setActive($el);
			}
			else if ((this.opts.type === 'toggle' && this.value === 1) || this.value === $el.val())
			{
				this.setActive($el);
			}
		},
		setBasic: function($el)
		{
			this.setInActive(this.buttons);
			this.setActive($el);
			$(this.opts.target).val($el.val());
		},
		setSegmented: function($el)
		{
			var $target = $(this.opts.target);
			this.value = $target.val().split(',');

			if (!$el.hasClass(this.opts.activeClassName))
			{
				this.setActive($el);
				this.value.push($el.val());
			}
			else
			{
				this.setInActive($el);
				this.value.splice(this.value.indexOf($el.val()), 1);
			}

			$target.val(this.value.join(',').replace(/^,/, ''));
		},
		setToggle: function($el)
		{
			if ($el.hasClass(this.opts.activeClassName))
			{
				this.setInActive($el);
				$(this.opts.target).val(0);
			}
			else
			{
				this.setActive($el);
				$(this.opts.target).val(1);
			}
		},
		setActive: function($el)
		{
			$el.addClass(this.opts.activeClassName);
		},
		setInActive: function($el)
		{
			$el.removeClass(this.opts.activeClassName);
		}
	};

	$(window).on('load.tools.buttons', function()
	{
		$('[data-tools="buttons"]').buttons();
	});

	// constructor
	Buttons.prototype.init.prototype = Buttons.prototype;


})(jQuery);
/*
	CheckAll Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.checkAll = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'checkAll', {});
			$.data(this, 'checkAll', CheckAll(this, options));
		});

	};

	// Initialization
	function CheckAll(el, options)
	{
		return new CheckAll.prototype.init(el, options);
	}

	$.CheckAll = CheckAll;
	$.CheckAll.opts = {

		classname: false,
		parent: false,
		highlight: 'highlight',
		target: false

	};

	// Functionality
	CheckAll.fn = $.CheckAll.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.$elements = $('.' + this.opts.classname);
			this.$target = $(this.opts.target);

			// load
			this.$element.on('click', $.proxy(this.load, this));

			this.setter = (this.opts.target) ? this.$target.val().split(',') : [];
			this.$elements.each($.proxy(this.setOnStart, this));
		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.CheckAll.opts),
				this.$element.data(),
				options
			);
		},
		load: function()
		{
			if (this.$element.prop('checked'))
			{
				this.$elements.prop('checked', true);

				if (this.opts.parent || this.opts.target)
				{
					this.$elements.each($.proxy(function(i,s)
					{
						var $s = $(s);
						this.setHighlight($s);
						this.setValue($s.val());

					}, this));
				}
			}
			else
			{
				this.$elements.prop('checked', false);
				if (this.opts.parent) this.$elements.each($.proxy(this.removeHighlight, this));
				if (this.opts.target) this.$target.val('');
			}
		},
		setOnStart: function(i, el)
		{
			var $el = $(el);
			if (this.$element.prop('checked') || (this.setter && ($.inArray($el.val(), this.setter) !== -1)))
			{
				$el.prop('checked', true);
				this.setHighlight($el);
			}

			$el.on('click', $.proxy(function()
			{
				var checkedSize = this.$elements.filter(':checked').size();

				if ($el.prop('checked'))
				{
					this.setValue($el.val());
					this.setHighlight($el);
				}
				else
				{
					this.removeValue($el.val());
					this.removeHighlight($el);
				}

				var prop = (checkedSize !== this.$elements.size()) ? false : true;
				this.$element.prop('checked', prop);


			}, this));
		},
		setHighlight: function($el)
		{
			if (!this.opts.parent) return;

			$el.closest(this.opts.parent).addClass(this.opts.highlight);
		},
		removeHighlight: function(i, $el)
		{
			if (!this.opts.parent) return;

			$($el).closest(this.opts.parent).removeClass(this.opts.highlight);
		},
		setValue: function(value)
		{
			if (!this.opts.target) return;

			var str = this.$target.val();
			var arr = str.split(',');
			arr.push(value);

			if (str === '')
			{
				arr = [value];
			}

			this.$target.val(arr.join(','));
		},
		removeValue: function(value)
		{
			if (!this.opts.target) return;

			var arr = this.$target.val().split(',');

			var index = arr.indexOf(value);
			arr.splice(index, 1);

			this.$target.val(arr.join(','));
		}
	};


	$(window).on('load.tools.buttons', function()
	{
		$('[data-tools="check-all"]').checkAll();
	});

	// constructor
	CheckAll.prototype.init.prototype = CheckAll.prototype;


})(jQuery);
/*
	Dropdown Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{

	// Plugin
	$.fn.dropdown = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'dropdown', {});
			$.data(this, 'dropdown', Dropdown(this, options));
		});

	};


	// Initialization
	function Dropdown(el, options)
	{
		return new Dropdown.prototype.init(el, options);
	}

	$.Dropdown = Dropdown;
	$.Dropdown.NAME = 'dropdown';
	$.Dropdown.VERSION = '1.0';
	$.Dropdown.opts = {

		target: false,
		targetClose: false,
		height: false, // number
		width: false // number

	};

	// Functionality
	Dropdown.fn = $.Dropdown.prototype = {

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
				$.extend(true, {}, $.Dropdown.opts),
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
					if (namespace == 'tools.' + $.Dropdown.NAME || namespace == $.Dropdown.NAME + '.tools')
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
			this.$dropdown = $(this.opts.target);
			this.$dropdown.hide();

			this.$caret = $('<b class="caret"></b>');
			this.$element.append(this.$caret);

			this.setCaretUp();
			this.preventBodyScroll();

			this.$element.click($.proxy(this.toggle, this));
		},
		setCaretUp: function()
		{
			var height =  this.$element.offset().top + this.$element.innerHeight() + this.$dropdown.innerHeight();
			if ($(document).height() > height) return;

			this.$caret.addClass('caret-up');
		},
		toggle: function(e)
		{
			e.preventDefault();
			if (this.$element.hasClass('dropdown-in'))
			{
				this.hide();
			}
			else
			{
				this.show();
			}
		},
		getPlacement: function(height)
		{
			return ($(document).height() < height) ? 'top' : 'bottom';
		},
		getPosition: function()
		{
			return (this.$element.closest('.navigation-fixed').size() !== 0) ? 'fixed' : 'absolute';
		},
		setPosition: function()
		{
			var pos =  this.$element.position();
			var elementHeight = this.$element.innerHeight();
			var elementWidth = this.$element.innerWidth();
			var height = this.$dropdown.innerHeight();
			var width = this.$dropdown.innerWidth();

			var position = this.getPosition();
			var placement = this.getPlacement(pos.top + height + elementHeight);

			var leftFix = 0;
			if ($(window).width() < (pos.left + width))
			{
				leftFix = (width - elementWidth);
			}

			var top;
			var	left = pos.left - leftFix;
			if (placement == 'bottom')
			{
				this.$caret.removeClass('caret-up');
				top = (position == 'fixed') ? elementHeight : pos.top + elementHeight;
			}
			else
			{
				this.$caret.addClass('caret-up');
				top = (position == 'fixed') ? height : pos.top - height;
			}

			this.$dropdown.css({ position: position, top: top + 'px', left: left + 'px' });
		},
		show: function()
		{
			$('.dropdown-in').removeClass('dropdown-in');
			$('.dropdown').removeClass('dropdown-open').hide();

			if (this.opts.height) this.$dropdown.css('min-height', this.opts.height + 'px');
			if (this.opts.width) this.$dropdown.width(this.opts.width);

			this.setPosition();

			this.$dropdown.addClass('dropdown-open').show();
			this.$element.addClass('dropdown-in');

			$(document).on('scroll.tools.dropdown', $.proxy(this.setPosition, this));
			$(window).on('resize.tools.dropdown', $.proxy(this.setPosition, this));
			$(document).on('click.tools.dropdown touchstart.tools.dropdown', $.proxy(this.hide, this));

			if (this.opts.targetClose)
			{
				$(this.opts.targetClose).on('click.tools.dropdown', $.proxy(function(e)
				{
					e.preventDefault();

					this.hide(false);

				}, this));
			}

			$(document).on('keydown.tools.dropdown', $.proxy(function(e)
			{
				// esc
			   if (e.which === 27) this.hide();

			}, this));

			this.setCallback('opened', this.$dropdown, this.$element);

		},
		preventBodyScroll: function()
		{
			this.$dropdown.on('mouseover', function() { $('html').css('overflow', 'hidden'); });
			this.$dropdown.on('mouseout', function() { $('html').css('overflow', ''); });
		},
		hide: function(e)
		{
			if (e)
			{
				e = e.originalEvent || e;

				var $target = $(e.target);
				if ($target.hasClass('caret') || $target.hasClass('dropdown-in') || $target.closest('.dropdown-open').size() !== 0)
				{
					return;
				}
			}

			this.$dropdown.removeClass('dropdown-open').hide();
			this.$element.removeClass('dropdown-in');

			$(document).off('.tools.dropdown');
			$(window).off('.tools.dropdown');

			this.setCallback('closed', this.$dropdown, this.$element);
		}
	};

	$(window).on('load.tools.dropdown', function()
	{
		$('[data-tools="dropdown"]').dropdown();
	});

	// constructor
	Dropdown.prototype.init.prototype = Dropdown.prototype;


})(jQuery);
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


/*
	Navigation Fixed Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.navigationFixed = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'navigationFixed', {});
			$.data(this, 'navigationFixed', NavigationFixed(this, options));
		});

	};

	// Initialization
	function NavigationFixed(el, options)
	{
		return new NavigationFixed.prototype.init(el, options);
	}

	$.NavigationFixed = NavigationFixed;
	$.NavigationFixed.NAME = 'navigation-fixed';
	$.NavigationFixed.VERSION = '1.0';
	$.NavigationFixed.opts = {

		// settings

	};

	// Functionality
	NavigationFixed.fn = $.NavigationFixed.prototype = {

		// Initialization
		init: function(el, options)
		{
			var mq = window.matchMedia("(max-width: 767px)");
			if (mq.matches) return;

			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

		    this.navBoxOffsetTop = this.$element.offset().top;

		    this.build();
		    $(window).scroll($.proxy(this.build, this));

		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.NavigationFixed.opts),
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
					if (namespace == 'tools.' + $.NavigationFixed.NAME || namespace == $.NavigationFixed.NAME + '.tools')
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
			if ($(window).scrollTop() > this.navBoxOffsetTop)
			{
				this.$element.addClass('navigation-fixed');
				this.setCallback('fixed');
			}
			else
			{
				this.$element.removeClass('navigation-fixed');
				this.setCallback('unfixed');
			}


		}
	};

	$(window).on('load.tools.navigation-fixed', function()
	{
		$('[data-tools="navigation-fixed"]').navigationFixed();
	});

	// constructor
	NavigationFixed.prototype.init.prototype = NavigationFixed.prototype;


})(jQuery);
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
/*
	Progress Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	$.progress = {
		show: function()
		{
			if ($('#tools-progress').length !== 0)
			{
				$('#tools-progress').fadeIn();
			}
			else
			{
				var $progress = $('<div id="tools-progress"><span></span></div>').hide();
				$(document.body).append($progress);
				$('#tools-progress').fadeIn();
			}
		},
		update: function(value)
		{
			this.show();
			$('#tools-progress').find('span').css('width', value + '%');
		},
		hide: function()
		{
			$('#tools-progress').fadeOut(1500);
		}
	};


})(jQuery);

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


/*
	TextFit Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.textfit = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'textfit', {});
			$.data(this, 'textfit', Textfit(this, options));
		});

	};

	// Initialization
	function Textfit(el, options)
	{
		return new Textfit.prototype.init(el, options);
	}

	$.Textfit = Textfit;
	$.Textfit.NAME = 'textfit';
	$.Textfit.VERSION = '1.0';
	$.Textfit.opts = {

		min: '10px',
		max: '100px',
		compressor: 1

	};

	// Functionality
	Textfit.fn = $.Textfit.prototype = {

		// Initialization
		init: function(el, options)
		{

			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.$element.css('font-size', Math.max(Math.min(this.$element.width() / (this.opts.compressor*10), parseFloat(this.opts.max)), parseFloat(this.opts.min)));

		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Textfit.opts),
				this.$element.data(),
				options
			);
		}
	};

	$(window).on('load.tools.textfit', function()
	{
		$('[data-tools="textfit"]').textfit();
	});

	// constructor
	Textfit.prototype.init.prototype = Textfit.prototype;


})(jQuery);
/*
	Tooltip Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.tooltip = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'tooltip', {});
			$.data(this, 'tooltip', Tooltip(this, options));
		});
	};

	// Initialization
	function Tooltip(el, options)
	{
		return new Tooltip.prototype.init(el, options);
	}

	$.Tooltip = Tooltip;
	$.Tooltip.NAME = 'tooltip';
	$.Tooltip.VERSION = '1.0';
	$.Tooltip.opts = {

		theme: false

	};

	// Functionality
	Tooltip.fn = $.Tooltip.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;

			this.loadOptions(options);

			this.$element.on('mouseover', $.proxy(this.show, this));
			this.$element.on('mouseout', $.proxy(this.hide, this));
		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Tooltip.opts),
				this.$element.data(),
				options
			);
		},
		show: function()
		{
			$('.tooltip').hide();

			var text = this.$element.attr('title');
			this.$element.data('cached-title', text);
			this.$element.attr('title', '');

			this.tooltip = $('<div class="tooltip" />').html(text).hide();

			if (this.opts.theme !== false)
			{
				this.tooltip.addClass('tooltip-theme-' + this.opts.theme);
			}

			this.tooltip.css({
				top: (this.$element.offset().top + this.$element.innerHeight()) + 'px',
				left: this.$element.offset().left + 'px'
			});

			$('body').append(this.tooltip);

			this.tooltip.show();

		},
		hide: function()
		{
			this.tooltip.fadeOut('fast', $.proxy(function()
			{
				this.tooltip.remove();

			}, this));

			this.$element.attr('title', this.$element.data('cached-title'));
			this.$element.data('cached-title', '');
		}
	};

	// Constructor
	Tooltip.prototype.init.prototype = Tooltip.prototype;

	$(function()
	{
		$('[data-tools="tooltip"]').tooltip();
	});

})(jQuery);

/*
	Upload Tool

	http://imperavi.com/kube/

	Copyright (c) 2009-2014, Imperavi LLC.
*/
(function($)
{
	// Plugin
	$.fn.upload = function(options)
	{
		return this.each(function()
		{
			$.data(this, 'upload', {});
			$.data(this, 'upload', Upload(this, options));
		});
	};

	// Initialization
	function Upload(el, options)
	{
		return new Upload.prototype.init(el, options);
	}

	$.Upload = Upload;
	$.Upload.NAME = 'upload';
	$.Upload.VERSION = '1.0';
	$.Upload.opts = {

		url: false,
		placeholder: 'Drop file here or ',
		param: 'file'

	};

	// Functionality
	Upload.fn = $.Upload.prototype = {

		// Initialization
		init: function(el, options)
		{
			this.$element = el !== false ? $(el) : false;
			this.loadOptions(options);

			this.load();
		},
		loadOptions: function(options)
		{
			this.opts = $.extend(
				{},
				$.extend(true, {}, $.Upload.opts),
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
					if (namespace == 'tools.' + $.Upload.NAME || namespace == $.Upload.NAME + '.tools')
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
			this.$droparea = $('<div class="tools-droparea" />');
			this.$placeholdler = $('<div class="tools-droparea-placeholder" />').text(this.opts.placeholder);

			this.$droparea.append(this.$placeholdler);
			this.$element.after(this.$droparea);
			this.$placeholdler.append(this.$element);

			this.$droparea.off('.tools.upload');
			this.$element.off('.tools.upload');

			this.$droparea.on('dragover.tools.upload', $.proxy(this.onDrag, this));
			this.$droparea.on('dragleave.tools.upload', $.proxy(this.onDragLeave, this));

			// change
			this.$element.on('change.tools.upload', $.proxy(function(e)
			{
				e = e.originalEvent || e;
				this.traverseFile(this.$element[0].files[0], e);
			}, this));

			// drop
			this.$droparea.on('drop.tools.upload', $.proxy(function(e)
			{
				e.preventDefault();

				this.$droparea.removeClass('drag-hover').addClass('drag-drop');
				this.onDrop(e);

			}, this));
		},
		onDrop: function(e)
		{
			e = e.originalEvent || e;
			var files = e.dataTransfer.files;

			this.traverseFile(files[0], e);
		},
		traverseFile: function(file, e)
		{
			var formData = !!window.FormData ? new FormData() : null;
			if (window.FormData)
			{
				formData.append(this.opts.param, file);
			}

			if ($.progress) $.progress.show();
			this.sendData(formData, e);
		},
		sendData: function(formData, e)
		{
			var xhr = new XMLHttpRequest();
			xhr.open('POST', this.opts.url);

			// complete
			xhr.onreadystatechange = $.proxy(function()
			{
			    if (xhr.readyState == 4)
			    {
			        var data = xhr.responseText;

					data = data.replace(/^\[/, '');
					data = data.replace(/\]$/, '');

					var json = (typeof data === 'string' ? $.parseJSON(data) : data);

					if ($.progress) $.progress.hide();

					this.$droparea.removeClass('drag-drop');
					this.setCallback('success', json);
			    }
			}, this);

			xhr.send(formData);
		},
		onDrag: function(e)
		{
			e.preventDefault();
			this.$droparea.addClass('drag-hover');
		},
		onDragLeave: function(e)
		{
			e.preventDefault();
			this.$droparea.removeClass('drag-hover');
		}

	};

	// Constructor
	Upload.prototype.init.prototype = Upload.prototype;

	$(function()
	{
		$('[data-tools="upload"]').upload();
	});

})(jQuery);


