// # src / push-state.js
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

// ## Overview
// This file sets up the hy-push-state component, which is responsible for dynimically changing
// the content when users click on internal links.
// However, the component only handles changing the content.
// Animating it, responding to errors and showing loading spinners is still up to us.

// ## Includes
// First, we patch the environment with some ES6+ functions we intend to use.
import 'core-js/fn/array/for-each';
import 'core-js/fn/function/bind';
import 'core-js/fn/object/assign';
import 'core-js/fn/string/includes';

// We include our main component, hy-push-state,
// in both the vanilla JS and the WebComponent version (will decide later which one to use).
// Since they share most of their code, it's not a big deal in terms of file size.
import { HyPushState, VANILLA_FEATURE_TESTS, Set } from 'hy-push-state/src/vanilla';
import { HyPushStateElement } from 'hy-push-state/src/webcomponent';

// Next, we include `Observable` and the RxJS functions we inted to use on it.
import { fromEvent, merge, of, timer, animationFrameScheduler } from 'rxjs';

import {
  tap,
  debounceTime,
  filter,
  map,
  mapTo,
  mergeMap,
  observeOn,
  pairwise,
  share,
  startWith,
  exhaustMap,
  switchMap,
  takeUntil,
  zip,
} from 'rxjs/operators';

// Some of our own helper functions and classes.
import { animate, empty, getResolvablePromise, hasFeatures, isSafari, isFirefoxIOS }
  from './common';
import CrossFader from './cross-fader';
import upgradeMathBlocks from './katex';
import loadDisqus from './disqus';
import setupFLIP from './flip';

// ## Constants
// A list of Modernizr feature tests that are required for the push state feature to work.
const REQUIREMENTS = new Set([
  ...VANILLA_FEATURE_TESTS,
  'classlist',
  'cssanimations',
  'cssremunit',
  'documentfragment',
  'eventlistener',
  'history',
  'matchmedia',
  'opacity',
  'queryselector',
  'requestanimationframe',
]);

const REPLACE_IDS = '_main';
const LINK_SELECTOR = 'a[href]:not(.external):not(.no-push-state)';
const SCRIPT_SELECTOR = 'script:not([type^="math/tex"])';
const HREF_REGEX = /^((?!(\/assets\/)).)*$/;
const DURATION = 250;

// Duration of cross-fading the sidebar background images.
const FADE_DURATION = 600;

// Time a user has to stay on the site before we send word to Google Analytics.
const GA_DELAY = 500;

// Details of the fade-out animation.
const FADE_OUT = [
  { opacity: 1 },
  { opacity: 0 },
];

// Details of the fade-in animation.
const FADE_IN = [
  { opacity: 0, transform: 'translateY(-3rem)' },
  { opacity: 1, transform: 'translateY(0)' },
];

// Settings as passed to the WebAnimations API.
const SETTINGS = {
  duration: DURATION,
  easing: 'cubic-bezier(0,0,0.32,1)',
};

// A CSS selector for headlines with ids.
const HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';

// We also setup some shorthands:
const { forEach } = Array.prototype;
const assign = Object.assign.bind(Object);

// ## Functions
// Takes a heading and adds a "#" link for permalinks:
function upgradeHeading(h) {
  const template = document.getElementById('_permalink-template');
  const df = document.importNode(template.content, true);
  const a = df.querySelector('.permalink');
  a.href = `#${h.id}`;
  h.appendChild(df);
}

// Set up the DOM elements:
function setupAnimationMain(pushStateEl) {
  const template = document.getElementById('_animation-template');
  const animationMain = document.importNode(template.content, true);
  pushStateEl.parentNode.insertBefore(animationMain, pushStateEl);
  return pushStateEl.previousElementSibling;
}

function setupLoading(navbarEl) {
  const template = document.getElementById('_loading-template');
  const loading = document.importNode(template.content, true);
  navbarEl.appendChild(loading);
  return navbarEl.lastElementChild;
}

function setupErrorPage(main, { pathname }) {
  const template = document.getElementById('_error-template');
  const error = document.importNode(template.content, true);
  const anchor = error.querySelector('.this-link');
  if (anchor) {
    anchor.href = pathname;
    anchor.textContent = pathname;
  }
  main.appendChild(error);
  return main.lastElementChild;
}

function setupButton(parent, templateId, clickFn) {
  const template = document.getElementById(templateId);
  const backButton = document.importNode(template.content, true);
  backButton.querySelector('.nav-btn').addEventListener('click', clickFn);
  parent.appendChild(backButton);
  return parent.lastElementChild;
}

// Get the FLIP type (currently 'title' or 'project') from an element.
function getFlipType(el) {
  if (!el || !el.classList) return null;
  if (el.classList.contains('flip-title')) return 'title';
  if (el.classList.contains('flip-project')) return 'project';
  return el.getAttribute && el.getAttribute('data-flip');
}

// Whether the content should be animated.
// Always for 'push' animations, only in 'standalone' mode for Safari (b/c it conflicts with
// the native forward/backward guestures).
function shouldAnimate(type) {
  return type === 'push' || navigator.standalone || !isSafari;
}

// Similar to `shouldAnimate`, whether we use scroll restoration depends on whether it conflicts
// with native guestures.
function shouldRestoreScroll() {
  if (isSafari) { return !!navigator.standalone; }
  return true;
}

function animateFadeOut({ type, main }) {
  return shouldAnimate(type) ?
    animate(main, FADE_OUT, SETTINGS).pipe(mapTo({ main })) :
    of({ main });
}

function animateFadeIn({ type, replaceEls: [main], flipType }) {
  return shouldAnimate(type) ?
    animate(main, FADE_IN, SETTINGS).pipe(mapTo({ main, flipType })) :
    of({ main, flipType });
}

// Before we register the WebComponent with the DOM, we set essential properties,
// some of which depend on browser, standalone mode, etc...
function setupWebComponent(pushStateEl) {
  pushStateEl.setAttribute('replace-ids', REPLACE_IDS);
  pushStateEl.setAttribute('link-selector', LINK_SELECTOR);
  pushStateEl.setAttribute('duration', DURATION);
  if (shouldRestoreScroll()) pushStateEl.setAttribute('scroll-restoration', '');
  pushStateEl.setAttribute('href-regex', HREF_REGEX);
  pushStateEl.setAttribute('script-selector', SCRIPT_SELECTOR);

  customElements.define('hy-push-state', HyPushStateElement);
  return pushStateEl;
}

// Setting up hy-push-state as vanilla JS class.
function setupVanilla(pushStateEl) {
  return new HyPushState(pushStateEl, {
    replaceIds: REPLACE_IDS.split(','),
    linkSelector: LINK_SELECTOR,
    duration: DURATION,
    scrollRestoration: shouldRestoreScroll(),
    hrefRegex: HREF_REGEX,
    scriptSelector: SCRIPT_SELECTOR,
  });
}

// ## Main
// First, we determine if push state is enabled,
// and if the current user agent meets our requirements.
if (!window._noPushState && hasFeatures(REQUIREMENTS) && !isFirefoxIOS) {
  // ### Setup
  // We save some variables and setup the DOM:
  const isStandalone =
    !!navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

  const pushStateEl = document.getElementsByTagName('hy-push-state')[0];
  const btnBarEl = document.querySelector('.navbar .content .nav-btn-bar');

  const animationMain = setupAnimationMain(pushStateEl);
  const loading = setupLoading(document.querySelector('.navbar .content'));

  // Show a back button when in standalone mode.
  if (isStandalone) {
    setupButton(btnBarEl, '_back-template', () => window.history.back());
  }

  // Upgrade headlines to include headline-level `#` links.
  const initialMain = document.getElementById('_main');
  forEach.call(initialMain.querySelectorAll(HEADING_SELECTOR), upgradeHeading);

  // Remove the CSS fade-in class (to avoid playing it again)
  initialMain.classList.remove('fade-in');

  // Setting up the basic event observables.
  // In case of a start event we also add the `flipType` to the context,
  // so that we can use filter based on it later.
  const start$ = fromEvent(pushStateEl, 'hy-push-state-start').pipe(
    map(({ detail }) => assign(detail, { flipType: getFlipType(detail.anchor) })),
    share(),
  );

  const ready$ = fromEvent(pushStateEl, 'hy-push-state-ready').pipe(
    map(({ detail }) => detail),
    share(),
  );

  const after$ = fromEvent(pushStateEl, 'hy-push-state-after').pipe(
    map(({ detail }) => detail),
    share(),
  );

  const progress$ = fromEvent(pushStateEl, 'hy-push-state-progress').pipe(
    map(({ detail }) => detail),
    share(),
  );

  const error$ = fromEvent(pushStateEl, 'hy-push-state-networkerror').pipe(
    map(({ detail }) => detail),
    share(),
  );

  // ### Fade main content out
  // A `start` occurs immediately after a user clicks on a link.
  // First we get a hold fo the current content.
  // TODO: Change hy-push-state to provide this as part of the event?
  const fadeOut$ = start$.pipe(
    map(context => assign(context, { main: document.getElementById('_main') })),

    // Next we have some side effects:
    // * Close the drawer if it's open (i.e. when clicking a link in the sidebar)
    // * Add the `active` class to the active entry in the sidebar (currently not in use)
    // * If we are going to animate the content, make some preparations.
    tap(({ type, main }) => {
      if (!window._isDesktop && window._drawer && window._drawer.opened) {
        window._drawer.close();
      }

      if (shouldAnimate(type)) {
        main.style.pointerEvents = 'none';
        main.style.opacity = 0;
      }

      /*
      document.querySelectorAll('.sidebar-nav-item')
        ::forEach((item) => {
          if (window.location.href.includes(item.href)) item.classList.add('active');
          else item.classList.remove('active');
        });
      */
    }),

    // We don't want new animations to cancel the one currently in progress, so we use `exhaustMap`.
    // If we don't animate (i.e. `popstate` event in Safari) we just return `main`.
    exhaustMap(animateFadeOut),

    // After the animation is complete, we empty the current content and scroll to the top.
    tap(({ main }) => {
      empty.call(main);
      window.scroll(window.pageXOffset, 0);
    }),
    share(),
  );

  // ### Show loading spinner
  // Show loading spinner --- but only when fetching takes longer than `DURATION`.
  progress$.subscribe(() => { loading.style.display = 'block'; });

  // ### Prepare showing the new content
  // The `ready` event occurs when we've received the content from the server
  // and it is parsed as a document fragment, but before we add it to the DOM.
  // This is were we can make some changes to the content without triggering repaints.
  ready$.subscribe(({ replaceEls: [main] }) => {
    loading.style.display = 'none';
    main.classList.remove('fade-in');
    forEach.call(main.querySelectorAll(HEADING_SELECTOR), upgradeHeading);
    main.style.pointerEvents = 'none';
  });

  // ### Fade new content in
  // `after` new content is added to the DOM, start animating it.
  const fadeIn$ = after$.pipe(
    switchMap(animateFadeIn),
    tap(({ main }) => { main.style.pointerEvents = ''; }),
    share(),
  );

  // In addition to fading the main content out,
  // there's also a FLIP animation playing when clicking certain links.
  // We set it up here because FLIP animation may do extra work after a `fadeIn` and/or cleanup
  // work when an error occurs.
  const flip$ = setupFLIP(start$, ready$, merge(fadeIn$, error$), {
    animationMain,
    settings: SETTINGS,
  }).pipe(share());

  start$.pipe(
    map((context) => {
      const promise = getResolvablePromise();
      context.waitUntil(promise);
      return promise;
    }),
    // Every click starts a timer that lasts as long
    // as it takes for the FLIP and fade-out animations to complete.
    switchMap(p => timer(DURATION).pipe(zip(fadeOut$, flip$, () => p))),
    // Once the animation have completed, we resolve the promise so that hy-push-state continues.
  )
    .subscribe(p => p.resolve());

  // TODO: meh, keeping permanent subscription? turn into hot observable?
  fadeOut$.subscribe();
  flip$.subscribe();

  // ### Cross-fade the sidebar image
  // The cross fader has some internal state, i.e. it keeps track of DOM nodes,
  // so it is implemented as a class.
  const crossFader = new CrossFader(FADE_DURATION);

  // There is no point in swapping out the image while it is still loading, so we only start
  // fetching the sidebar image `after` the new content was added to the DOM.
  // However, we also want to gurantee that we don't start cross-fading the image
  // while the fade-in animation is still playing, so we wait for `fadeIn`.
  // Also, we want to abort fetching the image whne the user has already `start`ed another request.
  // TODO: Maybe only abort `after` it becomes clear that the new site
  // is using a different background image?
  after$.pipe(
    switchMap(({ replaceEls: [main] }) =>
      crossFader.fetchImage(main).pipe(
        zip(fadeIn$, x => x),
        takeUntil(start$),
      )),

    // Once we have both images, we take them `pairwise` and cross-fade.
    // We start with the initial sidebar image, which was part of HTML content.
    // Here we use `mergeMap`, because in edge cases there could be 3 or more images
    // being faded at the same time, but there is no reason to cancel the old ones.
    startWith([document.querySelector('.sidebar-bg')]),
    pairwise(),
    mergeMap(([prev, curr]) => crossFader.fade(prev, curr)),
  )
    .subscribe();

  // ### Upgrade math blocks
  // Once the content is faded in, upgrade the math blocks with KaTeX.
  // This can take a while and will trigger multiple repaints,
  // so we don't want to start until after the animation.
  fadeIn$.pipe(
    tap(upgradeMathBlocks),
    tap(loadDisqus),

    // Finally, after some debounce time, send a `pageview` to Google Analytics (if applicable).
    filter(() => !!window.ga),
    debounceTime(GA_DELAY),
  )
    .subscribe(() => {
      window.ga('set', 'page', window.location.pathname);
      window.ga('send', 'pageview');
    });

  // ### Show error page
  // In case of a network error, we don't want to show the browser's default offline page.
  error$.subscribe(({ url }) => {
    loading.style.display = 'none';
    empty.call(animationMain.querySelector('.page'));

    const main = document.getElementById('_main');
    empty.call(main);
    main.style.pointerEvents = '';
    main.style.opacity = '';

    setupErrorPage(main, url);
  });

  // ### Safari special treatment
  // Safari doesn't support manual scroll restoration and it immediately jumps to the old scroll
  // position after the `popstate` event handler completes.
  // To make sure Safari can scroll to that position, the body needs to have sufficient height,
  // otherwise it will simply scroll to the bottom of the current page.
  if (isSafari && !navigator.standalone) {
    // First, we make sure this the previous entry was pushed by us and wasn't a jump to a `#`:
    // Then we empty the content immediately to prevent flickering and
    // set the old `scrollHeigt` as the body's `minHeight`.
    fromEvent(window, 'popstate').pipe(filter(() =>
      window.history.state &&
      window.history.state['hy-push-state'] &&
      !window.history.state['hy-push-state'].hash))
      .subscribe(() => {
        const { scrollHeight } = window.history.state['hy-push-state'];
        document.body.style.minHeight = `${scrollHeight}px`;
      });

    // Once the content has been replaced (or an error occurred, etc), restore `minHeight`.
    merge(after$, progress$, error$)
      .pipe(observeOn(animationFrameScheduler))
      .subscribe(() => {
        document.body.style.minHeight = '';
      });
  }

  // ### Create the component
  // If we have Custom Elements, use the WebComponent (it doesn't use ShadowDOM, so we are fine),
  // otherwise use the vanilla JS version.
  // TODO: there is weird flickering on iOS with the webcomp version. maybe use vanilla?
  window._pushState = 'customElements' in window ?
    setupWebComponent(pushStateEl) :
    setupVanilla(pushStateEl);
}
