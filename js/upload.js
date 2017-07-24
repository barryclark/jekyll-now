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

