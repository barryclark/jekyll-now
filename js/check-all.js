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