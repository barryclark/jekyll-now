// # src / drawer.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
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

// ## Includes
// First, we patch the environment with some ES6+ functions we intend to use.
import 'core-js/fn/function/bind';

// We include our main component, hy-drawer,
// in both the vanilla JS and the WebComponent version (will decide later which one to use).
// Since they share most of their code, it's not a big deal in terms of file size.
import { HyDrawer, VANILLA_FEATURE_TESTS, Set } from 'hy-drawer/src/vanilla';
import { HyDrawerElement } from 'hy-drawer/src/webcomponent';
import 'hy-drawer/src/style.css';

// Next, we include `Observable` and the RxJS functions we inted to use on it.
import { fromEvent } from 'rxjs';

// And some of our own helper functions/constants.
import { hasFeatures, isSafari, isMobileSafari, isUCBrowser } from './common';

// A list of Modernizr tests that are required for the drawer to work.
const REQUIREMENTS = new Set([
  ...VANILLA_FEATURE_TESTS,
  'cssremunit',
  'classlist',
  'eventlistener',
  'matchmedia',
]);

// HACK: hard-coded SCSS break-point.
const MEDIA_QUERY = '(min-width: 64em)';

// ## Functions
// TODO
function resizeCallback() {
  const isDesktop = window.matchMedia(MEDIA_QUERY).matches;
  if (window._isDesktop !== isDesktop) {
    window._isDesktop = isDesktop;
    window._drawer.persistent = isDesktop;
    window._drawer.opened = isDesktop;
  }
}

// Callback for clicking the menu btton. Will toggle the drawer when on mobile.
function menuClickClallback(e) {
  if (!window._isDesktop) {
    e.preventDefault();
    window._drawer.toggle();
  }
}

// Determins the range from which to draw the drawer in pixels, counted from the left edge.
// It depends on the browser, e.g. Safari has a native guesture when sliding form the side,
// so we ignore the first 35 pixels (roughly the range for the native guesture).
function getRange() {
  if (isMobileSafari && !navigator.standalone) {
    return [35, 135];
  }
  return [0, 150];
}

// This function sets y-drawer up as a WebComponent.
// First it sets the options as HTML attributes, then it `define`s the WebComponent.
function setupWebComponent(drawerEl) {
  if (window._isDesktop) drawerEl.setAttribute('opened', '');
  if (window._isDesktop) drawerEl.setAttribute('persistent', '');
  drawerEl.setAttribute('align', 'left');
  drawerEl.setAttribute('range', getRange().join(','));
  drawerEl.setAttribute('threshold', isSafari ? 0 : 10);
  drawerEl.setAttribute('prevent-default', '');

  customElements.define('hy-drawer', HyDrawerElement);
  return drawerEl;
}

// This function sets y-drawer up as a vanilla JS class.
function setupVanilla(drawerEl) {
  return new HyDrawer(drawerEl, {
    opened: window._isDesktop,
    persistent: window._isDesktop,
    align: 'left',
    range: getRange(),
    threshold: isSafari ? 0 : 10,
    preventDefault: true,
  });
}

// ## Main
// First, we determine if the drawer is enabled,
// and whether the current user agent meets our requirements.
// UC Browser has even more invasive native swipe guestures than iOS Safari,
// (that ignore `preventDefault` on top of that...),
// so we disable the component alltogether. UC Mini is fine though.
if (!window._noDrawer && hasFeatures(REQUIREMENTS) && !isUCBrowser) {
  // Now we get a hold of some DOM elements
  const drawerEl = document.getElementsByTagName('hy-drawer')[0];
  const menuEl = document.getElementById('_menu');

  // We check the media query to determine wheter the drawer is active or not
  window._isDesktop = window.matchMedia(MEDIA_QUERY).matches;

  // Now we create the component.
  // If we have Custom Elements and ShadowDOM (v1) we use the WebComponent.
  window._drawer = 'customElements' in window && 'attachShadow' in Element.prototype ?
    setupWebComponent(drawerEl) :
    setupVanilla(drawerEl);

  // Some styles change when the drawer is loaded.
  // TODO: Check if we still need this. Also, maybe make this part of the component itself?
  drawerEl.classList.add('loaded');

  // You can uncomment the code below to lock document scrolling while sliding.
  // However, it's not as good as `preventDefault`,
  // as it won't prevent most mobile browsers from showing/hiding their addressbar,
  // causing expensive reflows/repaints...
  // NOTE: iOS Safari ignores this completely.
  /*
  if (!isSafari) {
    drawerEl.addEventListener('hy-drawer-slidestart', () => {
      document.body.style.overflowY = 'hidden';
    });

    drawerEl.addEventListener('hy-drawer-slideend', () => {
      document.body.style.overflowY = '';
    });
  }
  */

  // Adding the click callback to the menu button.
  menuEl.addEventListener('click', menuClickClallback);

  // Adding the resize callback to the resize event, but with a small delay.
  fromEvent(window, 'resize', { passive: true })
    .subscribe(resizeCallback);
}
