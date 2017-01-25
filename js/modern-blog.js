'use strict';

/**
 * Demo.
 */
var demo = (function (window) {

    /**
     * Enum of CSS selectors.
     */
    var SELECTORS = {
        pattern: '.pattern',
        card: '.card',
        cardImage: '.card__image',
        cardClose: '.card__btn-close'
    };

    /**
     * Enum of CSS classes.
     */
    var CLASSES = {
        patternHidden: 'pattern--hidden',
        polygon: 'polygon',
        polygonHidden: 'polygon--hidden'
    };

    var ATTRIBUTES = {
        index: 'data-index',
        id: 'data-id'
    };

    /**
     * Map of svg paths and points.
     */
    var polygonMap = {
        paths: null,
        points: null
    };

    /**
     * Container of Card instances.
     */
    var layout = {};

    /**
     * Initialise demo.
     */
    var init = function () {

        // For options see: https://github.com/qrohlf/Trianglify
        var pattern = Trianglify({
            width: window.innerWidth,
            height: window.innerHeight,
            cell_size: 90,
            variance: 1,
            stroke_width: 1,
            x_colors: 'random',
            y_colors: 'random'
        }).svg(); // Render as SVG.

        _mapPolygons(pattern);

        _bindCards();

        _bindHashChange();

        _triggerOpenCard('', _getHashFromURL(location.href));
    };

    /**
     * Store path elements, map coordinates and sizes.
     * @param {Element} pattern The SVG Element generated with Trianglify.
     * @private
     */
    var _mapPolygons = function (pattern) {

        // Append SVG to pattern container.
        $(SELECTORS.pattern).append(pattern);

        // Convert nodelist to array,
        // Used `.childNodes` because IE doesn't support `.children` on SVG.
        polygonMap.paths = [].slice.call(pattern.childNodes);

        polygonMap.points = [];

        polygonMap.paths.forEach(function (polygon) {

            // Hide polygons by adding CSS classes to each svg path (used attrs because of IE).
            $(polygon).attr('class', CLASSES.polygon);

            var rect = polygon.getBoundingClientRect();

            var point = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };

            polygonMap.points.push(point);
        });

        // All polygons are hidden now, display the pattern container.
        $(SELECTORS.pattern).removeClass(CLASSES.patternHidden);
    };

    /**
     * Bind Card elements.
     * @private
     */
    var _bindCards = function () {

        var elements = $(SELECTORS.card);

        $.each(elements, function (card, i) {

            var instance = new Card(i, card);

            layout[i] = {
                card: instance
            };

            var $card = $(card);
            $card.attr(ATTRIBUTES.index, i + '');

            var cardImage = $card.find(SELECTORS.cardImage);
            var cardClose = $card.find(SELECTORS.cardClose);

            $(cardImage).on('click', function () {
                location.hash = $card.attr(ATTRIBUTES.id);
            });
            $(cardClose).on('click', function () {
                location.hash = '';
            });
        });
    };

    /**
     * Create a sequence for the open or close animation and play.
     * @param {boolean} isOpenClick Flag to detect when it's a click to open.
     * @param {number} id The id of the clicked card.
     * @private
     *
     */
    var _playSequence = function (isOpenClick, id) {

        var card = layout[id].card;

        // Prevent when card already open and user click on image.
        if (card.isOpen && isOpenClick) {
            return;
        }

        // Create timeline for the whole sequence.
        var sequence = new TimelineLite({paused: true});

        var tweenOtherCards = _showHideOtherCards(id);

        if (!card.isOpen) {
            // Open sequence.

            _setPatternBgImg($(this).find(SELECTORS.cardImage).find('image'));

            sequence.add(tweenOtherCards);
            sequence.add(card.openCard(_onCardMove), 0);

        } else {
            // Close sequence.

            var closeCard = card.closeCard();
            var position = closeCard.duration() * 0.8; // 80% of close card tween.

            sequence.add(closeCard);
            sequence.add(tweenOtherCards, position);
        }

        sequence.play();
    };

    /**
     * Show/Hide all other cards.
     * @param {number} id The id of the clcked card to be avoided.
     * @private
     */
    var _showHideOtherCards = function (id) {

        var TL = new TimelineLite;

        var selectedCard = layout[id].card;

        for (var i in layout) {

            if (layout.hasOwnProperty(i)) {
                var card = layout[i].card;

                // When called with `openCard`.
                if (card.id !== id && !selectedCard.isOpen) {
                    TL.add(card.hideCard(), 0);
                }

                // When called with `closeCard`.
                if (card.id !== id && selectedCard.isOpen) {
                    TL.add(card.showCard(), 0);
                }
            }
        }

        return TL;
    };

    /**
     * Add card image to pattern background.
     * @param {Element} image The clicked SVG Image Element.
     * @private
     */
    var _setPatternBgImg = function (image) {

        var imagePath = $(image).attr('xlink:href');

        $(SELECTORS.pattern).css('background-image', 'url(' + imagePath + ')');
    };

    /**
     * Callback to be executed on Tween update, whatever a polygon
     * falls into a circular area defined by the card width the path's
     * CSS class will change accordingly.
     * @param {Object} track The card sizes and position during the floating.
     * @private
     */
    var _onCardMove = function (track) {

        var radius = track.width / 2;

        var center = {
            x: track.x,
            y: track.y
        };

        polygonMap.points.forEach(function (point, i) {

            if (_detectPointInCircle(point, radius, center)) {
                $(polygonMap.paths[i]).attr('class', CLASSES.polygon + ' ' + CLASSES.polygonHidden);
            } else {
                $(polygonMap.paths[i]).attr('class', CLASSES.polygon);
            }
        });
    };

    /**
     * Detect if a point is inside a circle area.
     * @private
     */
    var _detectPointInCircle = function (point, radius, center) {

        var xp = point.x;
        var yp = point.y;

        var xc = center.x;
        var yc = center.y;

        var d = radius * radius;

        return Math.pow(xp - xc, 2) + Math.pow(yp - yc, 2) <= d;
    };

    /**
     * initialize page view according to hash
     * @private
     */
    var _triggerOpenCard = function (fromId, toId) {
        var getIndex = function (card) {
            var index = $(card).attr(ATTRIBUTES.index);
            return parseInt(index, 10);
        };
        if (fromId) {
            var fromBlogCard = $('[' + ATTRIBUTES.id + '="' + fromId + '"]')[0];
            if (fromBlogCard) {
                _playSequence.call(fromBlogCard, false, getIndex(fromBlogCard));
            }
        }
        if (toId) {
            var toBlogCard = $('[' + ATTRIBUTES.id + '="' + toId + '"]')[0];
            if (toBlogCard) {
                _playSequence.call(toBlogCard, true, getIndex(toBlogCard));
            }
        }
    };

    var _getHashFromURL = function (url) {
        var a = document.createElement('a');
        a.href = url;
        return a.hash.slice(1);
    };

    var _bindHashChange = function () {
        window.addEventListener('hashchange', function (e) {
            var newHash = _getHashFromURL(e.newURL);
            var oldHash = _getHashFromURL(e.oldURL);
            _triggerOpenCard(oldHash, newHash);
        });
    };

    // Expose methods.
    return {
        init: init
    };

})(window);

// Kickstart Demo.
window.onload = demo.init;
