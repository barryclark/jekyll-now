// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { Observable, of } from 'rxjs';

// HACK: Temporary MS Edge fix
// TODO: Move rx-element into separate file or module
export { getScrollHeight, getScrollLeft, getScrollTop } from '@hydecorp/component/lib/util';
export { fromMediaQuery, fetchRx } from '@hydecorp/component/lib/creators';
export { subscribeWhen, filterWhen } from '@hydecorp/component/lib/operators';
export { createIntersectionObservable } from '@hydecorp/component/lib/observers';

const style = getComputedStyle(document.documentElement);

export const BREAK_POINT_3 = `(min-width: ${style.getPropertyValue('--break-point-3')})`;
export const BREAK_POINT_DYNAMIC = `(min-width: ${style.getPropertyValue('--break-point-dynamic')})`;
export const CONTENT_WIDTH_5 = parseFloat(style.getPropertyValue('--content-width-5'));
export const CONTENT_MARGIN_5 = parseFloat(style.getPropertyValue('--content-margin-5'));
export const DRAWER_WIDTH = parseFloat(style.getPropertyValue('--sidebar-width'));
export const HALF_CONTENT = parseFloat(style.getPropertyValue('--half-content'));

// Check the user agent for Safari and iOS Safari, to give them some special treatment...
const ua = navigator.userAgent.toLowerCase();
export const isSafari = ua.indexOf('safari') > 0 && ua.indexOf('chrome') < 0;
export const isMobile = ua.indexOf('mobile') > 0;
export const isMobileSafari = isSafari && isMobile;
export const isUCBrowser = ua.indexOf('ucbrowser') > 0;
export const isFirefox = ua.indexOf('firefox') > 0;
export const isFirefoxIOS = ua.indexOf('fxios') > 0 && ua.indexOf('safari') > 0;

export const hasCSSOM = 'attributeStyleMap' in Element.prototype && 'CSS' in window && CSS.number;

export const webComponentsReady = new Promise((res) => {
  if ('customElements' in window) res(true);
  else document.addEventListener('WebComponentsReady', res);
});

// FIXME: Replace with something more robust!?
export const stylesheetReady = new Promise(function checkCSS(res, rej, retries = 30) {
  const drawerEl = document.querySelector('hy-drawer');
  if (!drawerEl) res(true);
  else if (getComputedStyle(drawerEl).getPropertyValue('--hy-drawer-width')) res(true);
  else if (retries <= 0) rej(Error('Stylesheet not loaded within 10 seconds'));
  else setTimeout(() => checkCSS(res, rej, retries - 1), 1000 / 3);
});

export const once = (el, eventName) => new Promise((res) => el.addEventListener(eventName, res, { once: true }));
export const timeout = (t) => new Promise((res) => setTimeout(res, t));

// Takes an array of Modernizr feature tests and makes sure they all pass.
export function hasFeatures(features) {
  if (!window.Modernizr) return true;
  return [...features].every((feature) => {
    const hasFeature = window.Modernizr[feature];
    if (!hasFeature && process.env.DEBUG) console.warn(`Feature '${feature}' missing!`);
    return hasFeature;
  });
}

// Some functions to hide and show content.
export function show() {
  this.style.display = 'block';
  this.style.visibility = 'visible';
}

export function hide() {
  this.style.display = 'none';
  this.style.visibility = 'hidden';
}

export function unshow() {
  this.style.display = '';
  this.style.visibility = '';
}

export const unhide = unshow;

// Same as `el.innerHTML = ''`, but not quite so hacky.
export function empty() {
  while (this?.firstChild) this.removeChild(this.firstChild);
}

/**
 * An observable wrapper for the WebAnimations API.
 * Will return an observable that emits once when the animation finishes.
 * @param {HTMLElement|null} el
 * @param {AnimationKeyFrame | AnimationKeyFrame[] | null} effect
 * @param {number|AnimationEffectTiming} timing
 * @returns {Observable<Event>}
 */
export function animate(el, effect, timing) {
  if (!el) return of(new CustomEvent('finish'));

  return Observable.create((observer) => {
    const anim = el.animate(effect, timing);

    anim.addEventListener('finish', (e) => {
      observer.next(e);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => observer.complete());
      });
    });

    return () => {
      if (anim.playState !== 'finished') anim.cancel();
    };
  });
}

/**
 * @param {string} templateId
 * @returns {HTMLElement|null}
 */
export function importTemplate(templateId) {
  const template = document.getElementById(templateId);
  return template && document.importNode(template.content, true);
}

export const body = document.body || document.documentElement;
export const rem = (units) => units * parseFloat(getComputedStyle(body).fontSize);
export const getViewWidth = () => window.innerWidth || body.clientWidth;
export const getViewHeight = () => window.innerHeight || body.clientHeight;

/**
 * @template Q
 * @template S
 * @param {Worker} worker
 * @param {Q} message
 * @returns {Promise<S>}
 */
export function postMessage(worker, message) {
  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };
    worker.postMessage(message, [messageChannel.port2]);
  });
}

const promisifyLoad = (loadFn) => (href) => new Promise((r) => loadFn(href).addEventListener('load', r));

/** @type {(href: string) => Promise<Event>} */
export const loadJS = promisifyLoad(window.loadJS);

/** @type {(href: string) => Promise<Event>} */
export const loadCSS = promisifyLoad(window.loadCSS);

/**
 * @param {ArrayLike<Element>} els
 * @param {IntersectionObserverInit} [options]
 * @returns {Promise<IntersectionObserverEntry>}
 */
export function intersectOnce(els, options) {
  return new Promise((res) => {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((x) => x.isIntersecting)) {
        els.forEach((el) => io.unobserve(el));
        res(entries.find((x) => x.isIntersecting));
      }
    }, options);
    els.forEach((el) => io.observe(el));
  });
}
