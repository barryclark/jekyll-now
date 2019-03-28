(function() {
    'use strict';

    // youtube or vimeo
    function checkPlayerName(url) {
        if (url === 'false') return false;

        var result = url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/);

        if (result && /youtube/g.test(result[3])) {
            return 'youtube';
        } else if (result && /vimeo/g.test(result[3])) {
            return 'vimeo';
        }

        return false;
    }

    // youtube or vimeo
    function getVideoId(url) {
        if (url === 'false') return false;

        var result = url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/);

        return result ? result[6] : false;
    }

    function getYTPreviewUrl(videoId, quality) {
        return 'https://img.youtube.com/vi/' + videoId + '/' +
            (quality || '') + 'default.jpg';
    }

    function getVimeoPreviewUrl(vimeoId, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://vimeo.com/api/v2/video/' + vimeoId + '.json', true);
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    var response = JSON.parse(this.responseText);

                    callback(response[0].thumbnail_large);
                }
            }
        };
        request.send();
        request = null;
    }

    var getYTPreviewUrlWithBestQuality = (function() {
        var cache = {};

        return function(id) {
            var def = $.Deferred();
            if (id in cache) {
                if (cache[id]) {
                    def.resolve(cache[id]);
                } else {
                    def.reject('Preview image not found.');
                }
            } else {
                $('<img>').on('load', function() {
                    if (120 === (this.naturalWidth || this.width)) {
                        // selection of preview in the best quality
                        var file = this.src.split('/').pop();
                        switch (file) {
                            case 'maxresdefault.jpg':
                                this.src = this.src.replace(file, 'sddefault.jpg');
                                break;
                            case 'sddefault.jpg':
                                this.src = this.src.replace(file, 'hqdefault.jpg');
                                break;
                            case 'hqdefault.jpg':
                                this.src = this.src.replace(file, 'default.jpg');
                                break;
                            default:
                                cache[id] = null;
                                def.reject('Preview image not found.');
                                break;
                        }
                    } else {
                        def.resolve(cache[id] = this.src);
                    }
                }).attr('src', getYTPreviewUrl(id, 'maxres'));
            }

            return def;
        };
    })();

    /*
     * check for youtube/vimeo video section and
     * load videopreview from youtube/vimeo on 'add' event and enable YTPlayer/vimeo_player
     * */
    if (!$('html').hasClass('is-builder')) {
        $(document).on('add.cards', function(event) {
            if (!$(event.target).hasClass('carousel')) return;
            var isDesktop = $('html').hasClass('desktop');

            $(event.target).outerFind('[data-bg-video-slide]').each(function() {
                var videoId = getVideoId($(this).attr('data-bg-video-slide'));
                if (!videoId) return;

                var $preview = $('<div class="mbr-background-video-preview"></div>').css({
                    display: 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                });

                $('.container-slide', this).before($preview);
                var playerName = checkPlayerName($(this).attr('data-bg-video-slide'));
                var $overlay = $(this).find('.mbr-overlay');

                if (playerName === 'youtube') {
                    getYTPreviewUrlWithBestQuality(videoId).done(function(url) {
                        $preview.css('background-image', 'url("' + url + '")').show();
                    });

                    if (isDesktop && $.fn.YTPlayer && !$(this).find('.playerBox').length) {
                        $('.container-slide', this)
                            .before('<div class="mbr-background-video"></div>').prev()
                            .YTPlayer({
                                videoURL: videoId,
                                containment: 'self',
                                showControls: false,
                                mute: true
                            });

                        if ($overlay.length) {
                            $('.YTPOverlay', this).css({
                                opacity: $overlay.css('opacity'),
                                backgroundColor: $overlay.css('background-color')
                            });
                        }

                        $(this).find('.image_wrapper img').css('opacity', '0');
                        $(this).find('.image_wrapper .mbr-overlay').css('opacity', '0');
                    }
                } else {
                    getVimeoPreviewUrl(videoId, function(url) {
                        $preview.css('background-image', 'url("' + url + '")').show();
                    });

                    if (isDesktop && $.fn.vimeo_player && !$(this).find('.playerBox').length) {
                        $('.container-slide', this)
                            .before('<div class="mbr-background-video"></div>').prev()
                            .vimeo_player({
                                videoURL: videoId,
                                containment: 'self',
                                showControls: false,
                                mute: true
                            });

                        if ($overlay.length) {
                            $('.vimeo_player_overlay', this).css({
                                opacity: $overlay.css('opacity'),
                                backgroundColor: $overlay.css('background-color')
                            });
                        }
                    }
                }
            });

            $(event.target).find('.carousel-item iframe').css({
                transitionProperty: 'opacity',
                transitionDuration: '1000ms'
            });

            // pause YTPlayer/vimeo_player in hidden slides, apply some css rules
            $(this).on('slide.bs.carousel', 'section.carousel', function(event) {
                $(event.target).find('.carousel-item.active .mb_YTPlayer').each(function() {
                    $(this).YTPPause();
                });

                $(event.target).find('.carousel-item.active .vimeo_player').each(function() {
                    $(this).v_pause();
                });

                $(event.target).find('.carousel-item:not(.active) iframe').css('opacity', 0);
            });

            // start YTPPlayer in active slides, apply some css rules
            $(this).on('slid.bs.carousel', 'section.carousel', function(event) {
                $(event.target).find('.carousel-item.active .mb_YTPlayer').each(function() {
                    $(this).YTPPlay();
                });

                $(event.target).find('.carousel-item.active .vimeo_player').each(function() {
                    $(this).v_play();
                });

                $(event.target).find('.carousel-item.active iframe').resize().css('opacity', 1);
            });
        });
    }
})();
