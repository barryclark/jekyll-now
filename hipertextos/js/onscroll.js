/**
 * -------------------------------------------------------------------
 * onscroll-effect
 * A tiny JavaScript library to enable CSS animations when user scrolls.
 *
 * @author Matthieu Bué <https://twikito.com>
 * @version v1.1.3
 * @link https://twikito.github.io/onscroll-effect/
 * @license MIT
 * -------------------------------------------------------------------
 */

(() => {
	const
		INSIDE_VP = new Event("insideViewport"),
		OUTSIDE_VP = new Event("outsideViewport"),
		PREFIX = document.documentElement.getAttribute("data-onscroll-effect-custom-prefix") || "scroll";

	let warn = false;

	// Debounce function: https://davidwalsh.name/javascript-debounce-function
	const debounce = (func, wait, immediate) => {
		let timeout;
		return function () {
			const
				args = arguments,
				context = this;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				timeout = null;
				if (!immediate) Reflect.apply(func, context, args);
			}, wait);
			if (immediate && !timeout) Reflect.apply(func, context, args);
		};
	};

	const isUndefined = v => typeof v === "undefined";

	const scrollEffect = () => {
		const nodeList = [...document.querySelectorAll(`[data-${PREFIX}]`)];

		if (!warn && nodeList.length === 0) {
			warn = true;
			return console.warn(`onScroll Effect is not used: there's no element with 'data-${PREFIX}' attribute.`);
		}
		warn = false;

		nodeList.filter(node => isUndefined(node.isRepeating) || node.isRepeating).forEach(node => {
			const
				config = {
					className: node.dataset[PREFIX],
					repeat: node.dataset[PREFIX + "Repeat"],
					offset: Number(node.dataset[PREFIX + "Offset"]),
					count: Number(node.dataset[PREFIX + "Count"])
				},
				nodeRect = node.getBoundingClientRect(),
				scrollClass = config.className || "is-outside",
				scrollInfiniteRepeat = config.repeat === "true",
				scrollOffset = isNaN(config.offset) ? 0 : config.offset,
				scrollRepeat = isNaN(Number(config.repeat)) ? 1 : Number(config.repeat);

			node.repeatCount = isUndefined(node.repeatCount) ? 0 : node.repeatCount;
			node.isRepeating = isUndefined(node.isRepeating) ? true : node.isRepeating;

			// if ( has the class AND viewport bottom >= top of object + offset AND viewport top <= bottom of object - offset )
			if (
				node.classList.contains(scrollClass) &&
				nodeRect.top + scrollOffset <= window.innerHeight &&
				nodeRect.bottom - scrollOffset >= 0
			) {
				node.classList.remove(scrollClass);
				node.repeatCount += 1;
				node.isInViewport = true;
				node.dispatchEvent(INSIDE_VP);
				if (!scrollInfiniteRepeat && node.repeatCount >= scrollRepeat) {
					node.isRepeating = false;
				}
				return node.isInViewport;
			}

			// if ( first scroll OR ( ( infinite OR less that max ) AND ( has not the class AND ouside of viewport ) ) )
			if (
				(!node.classList.contains(scrollClass) && node.repeatCount === 0) ||
				((scrollInfiniteRepeat || node.repeatCount < scrollRepeat) &&
					(!node.classList.contains(scrollClass) &&
						(nodeRect.top > window.innerHeight || nodeRect.bottom < 0)))
			) {
				node.classList.add(scrollClass);
				node.isInViewport = false;
				node.dispatchEvent(OUTSIDE_VP);
				return node.isInViewport;
			}
		});
	};

	/*
	 * Trigger two times – on each readystatechange – to animate elements already in viewport:
	 * First, add the class, then remove it, so you can see the animation
	 */
	const initHandler = () => {
		scrollEffect();
		if (document.readyState === "complete") {
			document.removeEventListener("readystatechange", initHandler);
		}
	};
	document.addEventListener("readystatechange", initHandler);

	window.addEventListener("scroll", debounce(scrollEffect, 10), true);

	window.initOnScrollEffect = () => {
		scrollEffect();
		scrollEffect();
	};
})();