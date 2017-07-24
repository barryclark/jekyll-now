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