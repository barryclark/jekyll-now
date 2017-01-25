'use strict';

/**
 * Card.
 */
var Card = (function (window) {

    /**
     * Enum of CSS selectors.
     */
    var SELECTORS = {
        container: '.card__container',
        content: '.card__content',
        clip: '.clip'
    };

    /**
     * Enum of CSS classes.
     */
    var CLASSES = {
        containerClosed: 'card__container--closed',
        bodyHidden: 'body--hidden'
    };

    /**
     * Card.
     */
    var Card = function (id, el) {

        this.id = id;

        this._el = el;

        // Get elements.
        this._container = $(this._el).find(SELECTORS.container)[0];
        this._clip = $(this._el).find(SELECTORS.clip)[0];
        this._content = $(this._el).find(SELECTORS.content)[0];

        this.isOpen = false;

        this._TL = null;
    };

    /**
     * Open card.
     * @param {Function} callback The callback `onCardMove`.
     */
    Card.prototype.openCard = function (callback) {

        this._TL = new TimelineLite;

        var slideContentDown = this._slideContentDown();
        var clipImageIn = this._clipImageIn();
        var floatContainer = this._floatContainer(callback);
        var clipImageOut = this._clipImageOut();
        var slideContentUp = this._slideContentUp();

        // Compose sequence and use duration to overlap tweens.
        this._TL.add(slideContentDown);
        this._TL.add(clipImageIn, 0);
        this._TL.add(floatContainer, '-=' + clipImageIn.duration() * 0.6);
        // this._TL.add(clipImageOut, '-=' + floatContainer.duration() * 0.3);
        this._TL.add(slideContentUp/*, '-=' + clipImageOut.duration() * 0.6*/);

        this.isOpen = true;

        return this._TL;
    };

    /**
     * Slide content down.
     * @private
     */
    Card.prototype._slideContentDown = function () {

        var tween = TweenLite.to(this._content, 0.8, {
            y: window.innerHeight,
            ease: Expo.easeInOut
        });

        return tween;
    };

    /**
     * Clip image in.
     * @private
     */
    Card.prototype._clipImageIn = function () {

        // Polygon.
        var TL = new TimelineLite;

        var start = [
            [0, 1200],
            [0, 0],
            [1920, 0],
            [1920, 1200]
        ];

        var end = [
            [916, 430],
            [1125, 643],
            [960, 607],
            [793, 570]
        ];

        var points = [];

        // Create a tween for each point.
        start.forEach(function (point, i) {

            var tween = TweenLite.to(point, 1.5, end[i]);

            end[i].onUpdate = function () {

                points.push(point.join());

                // Every 4 point update clip-path.
                if (points.length === end.length) {
                    $(this._clip).attr('points', points.join(' '));
                    // Reset.
                    points = [];
                }

            }.bind(this);

            tween.vars.ease = Expo.easeInOut;

            // Add at position 0.
            TL.add(tween, 0);

        }, this);

        return TL;
    };

    /**
     * Float card to final position.
     * @param {Function} callback The callback `onCardMove`.
     * @private
     */
    Card.prototype._floatContainer = function (callback) {

        $(document.body).addClass(CLASSES.bodyHidden);

        var TL = new TimelineLite;

        var rect = this._container.getBoundingClientRect();
        var windowW = window.innerWidth;

        var track = {
            width: 0,
            x: rect.left + (rect.width / 2),
            y: rect.top + (rect.height / 2)
        };

        TL.set(this._container, {
            width: rect.width,
            height: rect.height,
            x: rect.left,
            y: rect.top,
            position: 'fixed',
            overflow: 'hidden'
        });

        TL.to([this._container, track], 2, {
            width: windowW,
            height: '100%',
            x: windowW / 2,
            y: 0,
            xPercent: -50,
            ease: Expo.easeInOut,
            clearProps: 'all',
            className: '-=' + CLASSES.containerClosed,
            onUpdate: callback.bind(this, track),
            // Fix IE: if the image is set to fixed when CLASSES.containerClosed
            // is removed IE doesn't follow the tween, fix by setting
            // the image position to fixed when tween is completed.
            onComplete: function () {
                $(this._container).addClass('card__container--fix-image');
            }.bind(this)
        });

        return TL;
    };

    /**
     * Clip image out.
     * @private
     */
    Card.prototype._clipImageOut = function () {

        var tween = this._clipImageIn();

        tween.reverse();

        return tween;
    };

    /**
     * Slide content up.
     * @private
     */
    Card.prototype._slideContentUp = function () {

        var tween = TweenLite.to(this._content, 1, {
            y: 0,
            clearProps: 'all',
            ease: Expo.easeInOut
        });

        return tween;
    };

    /**
     * Close card.
     */
    Card.prototype.closeCard = function () {

        TweenLite.to(this._container, 0.4, {
            scrollTo: {
                y: 0
            },
            onComplete: function () {
                $(this._container).css('overflow', 'hidden');
            }.bind(this),
            ease: Power2.easeOut
        });

        this._TL.eventCallback('onReverseComplete', function () {

            TweenLite.set([this._container, this._content], {
                clearProps: 'all'
            });

            $(document.body).removeClass(CLASSES.bodyHidden);

            this.isOpen = false;

        }.bind(this));

        return this._TL.reverse();
    };

    /**
     * Hide card, called for all cards except the selected one.
     */
    Card.prototype.hideCard = function () {

        var tween = TweenLite.to(this._el, 0.4, {
            scale: 0.8,
            autoAlpha: 0,
            transformOrigin: 'center bottom',
            ease: Expo.easeInOut
        });

        return tween;
    };

    /**
     * Show card, called for all cards except the selected one.
     */
    Card.prototype.showCard = function () {

        var tween = TweenLite.to(this._el, 0.5, {
            scale: 1,
            autoAlpha: 1,
            clearProps: 'all',
            ease: Expo.easeInOut
        });

        return tween;
    };

    return Card;

})(window);
