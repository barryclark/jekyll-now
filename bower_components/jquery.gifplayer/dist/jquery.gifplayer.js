/*
* Gifplayer v0.3.4
* Customizable jquery plugin to play and stop animated gifs. Similar to 9gag's
* (c)2014 Rubén Torres - rubentdlh@gmail.com
* Released under the MIT license
*/

(function (factory) {
  if(typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(function($) {

	function GifPlayer(preview, options){
		this.previewElement = preview;
		this.options = options;
		this.animationLoaded = false;
	}

	GifPlayer.scopes = new Array();

	GifPlayer.prototype = {

		supportedFormats: ['gif', 'jpeg', 'jpg', 'png'],

		activate: function(){
			var self = this;
			if(this.previewElement.width() === 0){
				setTimeout(function(){
					self.activate();
				}, 100);
			}else{
				self.mode = self.getOption('mode');
				self.wrap();
				self.addSpinner();
				self.addControl();
				self.addEvents();
			}
		},

		wrap: function(){
			this.previewElement.addClass('gifplayer-ready');
			this.wrapper = this.previewElement.wrap("<div class='gifplayer-wrapper'></div>").parent();
			this.wrapper.css('width', this.previewElement.width());
			this.wrapper.css('height', this.previewElement.height());
			this.previewElement.css('cursor','pointer');
		},

		addSpinner: function(){
			this.spinnerElement = $("<div class = 'spinner'></div>");
			this.wrapper.append(this.spinnerElement);
			this.spinnerElement.hide();
		},

		getOption: function(option){
			var dataOption = this.previewElement.data(option.toLowerCase());
			if(dataOption != undefined && dataOption != ''){
				return dataOption;
			}else{
				return this.options[option];
			}
		},

		addControl: function(){
			var label = this.getOption('label');
			this.playElement = $("<ins class='play-gif'>" + label + "</ins>");
			this.wrapper.append(this.playElement);
			this.playElement.css('top', this.previewElement.height()/2 - this.playElement.height()/2);
			this.playElement.css('left', this.previewElement.width()/2 - this.playElement.width()/2);
		},

		addEvents: function(){
			var gp = this;
			var playOn = this.getOption('playOn');

			switch(playOn){
				case 'click':
					gp.playElement.on( 'click', function(e){
						gp.previewElement.trigger('click');
					});
					gp.previewElement.on( 'click', function(e){
						gp.loadAnimation();
						e.preventDefault();
						e.stopPropagation();
					});
					break;
				case 'hover':
					gp.previewElement.on( 'click mouseover', function(e){
						gp.loadAnimation();
						e.preventDefault();
						e.stopPropagation();
					});
					break;
				case 'auto':
					console.log('auto not implemented yet');
					break;
				default:
					console.log(playOn + ' is not accepted as playOn value.');
			}
		},

		processScope: function(){
			var scope = this.getOption('scope');
			if( scope ){
				if(GifPlayer.scopes[scope]){
					GifPlayer.scopes[scope].stopGif();
				}
				GifPlayer.scopes[scope] = this;
			}
		},

		loadAnimation: function(){
			this.processScope();

			this.spinnerElement.show();

			if( this.mode == 'gif'){
				this.loadGif();
			}else if(this.mode == 'video'){
				if(!this.videoLoaded){
					this.loadVideo();
				}else{
					this.playVideo();
				}

			}
			// Fire event onPlay
			this.getOption('onPlay').call(this.previewElement);
		},

		stopGif: function(){
			this.gifElement.hide();
			this.previewElement.show();
			this.playElement.show();
			this.resetEvents();
			this.getOption('onStop').call(this.previewElement);
		},

		getFile: function( ext ){
			// Obtain the resource default path
			var gif = this.getOption(ext);
			if(gif != undefined && gif != ''){
				return gif;
			}else{
				replaceString = this.previewElement.attr('src');

				for (i = 0; i < this.supportedFormats.length; i++) {
					pattrn = new RegExp( this.supportedFormats[i]+'$', 'i' );
					replaceString = replaceString.replace( pattrn, ext );
				}

				return replaceString;
			}
		},

		loadGif: function(){
			var gp = this;

			gp.playElement.hide();

			if(!this.animationLoaded){
				this.enableAbort();
			}
			var gifSrc = this.getFile('gif');
			var gifWidth = this.previewElement.width();
			var gifHeight = this.previewElement.height();

			this.gifElement=$("<img class='gp-gif-element' width='"+ gifWidth + "' height=' "+ gifHeight +" '/>");

			var wait = this.getOption('wait');
			if(wait){
				//Wait until gif loads
				this.gifElement.load( function(){
					gp.animationLoaded = true;
					gp.resetEvents();
					gp.previewElement.hide();
					gp.wrapper.append(gp.gifElement);
					gp.spinnerElement.hide();
					gp.getOption('onLoadComplete').call(gp.previewElement);
				});
			}else{
				//Try to show gif instantly
				gp.animationLoaded = true;
				gp.resetEvents();
				gp.previewElement.hide();
				gp.wrapper.append(gp.gifElement);
				gp.spinnerElement.hide();
			}
			this.gifElement.css('cursor','pointer');
			this.gifElement.css('position','absolute');
			this.gifElement.css('top','0');
			this.gifElement.css('left','0');
			this.gifElement.attr('src', gifSrc);
			this.gifElement.click( function(e){
				$(this).remove();
				gp.stopGif();
				e.preventDefault();
				e.stopPropagation();
			});
			gp.getOption('onLoad').call(gp.previewElement);

		},

		loadVideo: function(){
			this.videoLoaded = true;

			var videoSrcMp4 = this.getFile('mp4');
			var videoSrcWebm = this.getFile('webm');
			var videoWidth = this.previewElement.width();
			var videoHeight = this.previewElement.height();

			this.videoElement = $('<video class="gp-video-element" width="' +
				videoWidth + 'px" height="' + videoHeight + '" style="margin:0 auto;width:' +
				videoWidth + 'px;height:' + videoHeight + 'px;" autoplay="autoplay" loop="loop" muted="muted" poster="' +
				this.previewElement.attr('src') + '"><source type="video/mp4" src="' +
				videoSrcMp4 + '"><source type="video/webm" src="' + videoSrcWebm + '"></video>');

			var gp = this;

			var checkLoad = function(){
				if(gp.videoElement[0].readyState === 4){
					gp.playVideo();
					gp.animationLoaded = true;
				}else{
					setTimeout(checkLoad, 100);
				}
			};

			var wait = this.getOption('wait');
			if(wait){
				checkLoad();
			}else{
				this.playVideo();
			}

			this.videoElement.on('click', function(){
				if(gp.videoPaused){
					gp.resumeVideo();
				}else{
					gp.pauseVideo();
				}
			});
		},

		playVideo: function(){
			this.spinnerElement.hide();
			this.previewElement.hide();
			this.playElement.hide();

			this.gifLoaded = true;
			this.previewElement.hide();
			this.wrapper.append(this.videoElement);
			this.videoPaused = false;
			this.videoElement[0].play();
			this.getOption('onPlay').call(this.previewElement);
		},

		pauseVideo: function(){
			this.videoPaused = true;
			this.videoElement[0].pause();
			this.playElement.show();
			this.mouseoverEnabled = false;
			this.getOption('onStop').call(this.previewElement);
		},

		resumeVideo: function(){
			this.videoPaused = false;
			this.videoElement[0].play();
			this.playElement.hide();
			this.getOption('onPlay').call(this.previewElement);
		},

		enableAbort: function(){
			var gp = this;
			this.previewElement.click( function(e){
				gp.abortLoading(e);
			});
			this.spinnerElement.click( function(e){
				gp.abortLoading(e);
			});
		},

		abortLoading: function(e){
			this.spinnerElement.hide();
			this.playElement.show();
			e.preventDefault();
			e.stopPropagation();
			this.gifElement.off('load').on( 'load', function(ev){
				ev.preventDefault();
				ev.stopPropagation();
			});
			this.resetEvents();
			this.getOption('onStop').call(this.previewElement);
		},

		resetEvents: function(){
			this.previewElement.off('click');
			this.previewElement.off('mouseover');
			this.playElement.off('click');
			this.spinnerElement.off('click');
			this.addEvents();
		}

	};

	$.fn.gifplayer = function(options) {

		// Check if we should operate with some method
		if (/^(play|stop)$/i.test(options)) {

			return this.each( function(){
				// Normalize method's name
				options = options.toLowerCase();
				if($(this).hasClass('gifplayer-ready')){
					//Setup gifplayer object
					var gp = new GifPlayer($(this), null);
					gp.options = {};
					gp.options = $.extend({}, $.fn.gifplayer.defaults, gp.options);
					gp.wrapper = $(this).parent();
					gp.spinnerElement = gp.wrapper.find('.spinner');
					gp.playElement = gp.wrapper.find('.play-gif');
					gp.gifElement = gp.wrapper.find('.gp-gif-element');
					gp.videoElement = gp.wrapper.find('.gp-video-element');
					gp.mode = gp.getOption('mode');

					switch(options){
						case 'play':
							gp.playElement.trigger('click');
							break;
						case 'stop':
							if(!gp.playElement.is(':visible')){
								if(gp.mode == 'gif'){
									gp.stopGif();
								}else if( gp.mode == 'video'){
									gp.videoElement.trigger('click');
								}
							}
							break;
					}
				}
			});

		}else{ //Create instance
			return this.each(function(){
				options = $.extend({}, $.fn.gifplayer.defaults, options);
				var gifplayer = new GifPlayer($(this), options);
				gifplayer.activate();
			});
		}
	};

	$.fn.gifplayer.defaults = {
		label: 'GIF',
		playOn: 'click',
		mode: 'gif',
		gif: '',
		mp4: '',
		webm: '',
		wait: false,
		scope: false,
		onPlay: function(){},
		onStop: function(){},
		onLoad: function(){},
		onLoadComplete: function(){}
	};

	return GifPlayer;

}));
