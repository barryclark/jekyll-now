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

import { fromEvent, merge, NEVER, combineLatest } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  filter,
  startWith,
  switchMap,
  tap,
  throttleTime,
  withLatestFrom,
} from 'rxjs/operators';

import {
  BREAK_POINT_3,
  BREAK_POINT_DYNAMIC,
  isSafari,
  isMobile,
  isMobileSafari,
  hasCSSOM,
  webComponentsReady,
  stylesheetReady,
  getScrollTop,
  getViewWidth,
  fromMediaQuery,
} from './common';

(async () => {
  await Promise.all([
    ...('customElements' in window
      ? []
      : [
          import(/* webpackChunkName: "webcomponents" */ './polyfills/webcomponents').then(() =>
            import(/* webpackChunkName: "shadydom" */ './polyfills/shadydom'),
          ),
        ]),
    ...('ResizeObserver' in window
      ? []
      : [import(/* webpackChunkName: "resize-observer" */ './polyfills/resize-observer')]),
  ]);

  await webComponentsReady;
  await stylesheetReady;

  const MOBILE = 1;
  const DESKTOP = 2;
  const LARGE_DESKTOP = 3;

  const subscribeWhen = (p$) => (source) => {
    if (process.env.DEBUG && !p$) throw Error();
    return p$.pipe(switchMap((p) => (p ? source : NEVER)));
  };

  // Determines the range from which to draw the drawer in pixels, counted from the left edge.
  // It depends on the browser, e.g. Safari has a native gesture when sliding form the side,
  // so we ignore the first 35 pixels (roughly the range for the native gesture),
  // to avoid triggering both gestures.
  function getRange(drawerWidth, size) {
    if (size >= DESKTOP) return [0, drawerWidth];
    if (isMobileSafari) return [35, 150];
    return [0, 150];
  }

  // The functions below add an svg graphic to the sidebar
  // that indicate that the sidebar can be drawn using touch gestures.
  function setupIcon(drawerEl) {
    const img = document.getElementById('_hrefSwipeSVG');
    if (img) {
      const svg = document.createElement('img');
      svg.id = '_swipe';
      svg.src = img.href;
      svg.alt = 'Swipe image';
      svg.addEventListener('click', () => drawerEl.close());
      document.getElementById('_sidebar')?.appendChild(svg);
    }
  }

  function removeIcon() {
    const svg = document.getElementById('_swipe');
    svg?.parentNode?.removeChild(svg);
  }

  const detectSize = () =>
    window.matchMedia(BREAK_POINT_DYNAMIC).matches
      ? LARGE_DESKTOP
      : window.matchMedia(BREAK_POINT_3).matches
      ? DESKTOP
      : MOBILE;

  // First we get hold of some DOM elements.
  const drawerEl = document.getElementById('_drawer');
  const sidebarEl = document.getElementById('_sidebar');
  const contentEl = sidebarEl?.querySelector('.sidebar-sticky');
  if (!drawerEl || !sidebarEl || !contentEl) return;

  document.getElementById('_menu')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    drawerEl.toggle();
  });

  sidebarEl
    .querySelectorAll('a[href^="/"]:not(.external)')
    .forEach((el) => el.addEventListener('click', () => drawerEl.close()));

  if (isSafari) drawerEl.setAttribute('threshold', '0');
  if (!isMobile) drawerEl.setAttribute('mouseevents', '');

  const [tValue, oValue] = hasCSSOM
    ? [new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))]), CSS.number(1)]
    : [null, null];

  const updateSidebar = (t, size, distance) => {
    const value = distance * t;
    const opacity = size >= DESKTOP ? 1 : 1 - t;
    if (hasCSSOM) {
      tValue[0].x.value = value;
      oValue.value = opacity;
      sidebarEl.attributeStyleMap.set('transform', tValue);
      contentEl.attributeStyleMap.set('opacity', oValue);
    } else {
      sidebarEl.style.transform = `translateX(${value}px)`;
      contentEl.style.opacity = opacity;
    }
  };

  // A flag for the 3 major viewport sizes we support
  const size$ = merge(
    fromMediaQuery(window.matchMedia(BREAK_POINT_3)),
    fromMediaQuery(window.matchMedia(BREAK_POINT_DYNAMIC)),
  ).pipe(startWith({}), map(detectSize));

  // An observable keeping track of the drawer (peek) width.
  const peekWidth$ = fromEvent(drawerEl, 'peek-width-change').pipe(map((e) => e.detail));

  // An observable keeping track the viewport width
  const viewWidth$ = fromEvent(window, 'resize', { passive: true }).pipe(startWith({}), map(getViewWidth));

  // An observable keeping track of the distance between
  // the middle point of the screen and the middle point of the drawer.
  const distance$ = combineLatest(peekWidth$, viewWidth$).pipe(
    map(([drawerWidth, viewWidth]) => viewWidth / 2 - drawerWidth / 2),
  );

  const t$ = merge(
    distance$.pipe(map(() => (drawerEl.opacity !== undefined ? 1 - drawerEl.opacity : opened ? 0 : 1))),
    fromEvent(drawerEl, 'hy-drawer-move').pipe(
      map(({ detail: { opacity } }) => {
        return 1 - opacity;
      }),
    ),
  );

  drawerEl.addEventListener('hy-drawer-prepare', () => {
    sidebarEl.style.willChange = 'transform';
    contentEl.style.willChange = 'opacity';
  });

  drawerEl.addEventListener('hy-drawer-transitioned', () => {
    sidebarEl.style.willChange = '';
    contentEl.style.willChange = '';
  });

  // Save scroll position before the drawer gets initialized.
  const scrollTop = getScrollTop();

  // Start the drawer in `opened` state when the cover class is present,
  // and the user hasn't started scrolling already.
  const opened = drawerEl.classList.contains('cover') && scrollTop <= 0 && !(history.state && history.state.closedOnce);

  if (!opened) {
    if (!history.state) history.replaceState({}, document.title);
    history.state.closedOnce = true;
    drawerEl.removeAttribute('opened');
  }

  const opened$ = fromEvent(drawerEl, 'hy-drawer-transitioned').pipe(
    map((e) => e.detail),
    distinctUntilChanged(),
    tap((opened) => {
      if (!opened) {
        removeIcon();
        if (!history.state) history.replaceState({}, document.title);
        history.state.closedOnce = true;
      }
    }),
    startWith(opened),
  );

  // We need the height of the drawer in case we need to reset the scroll position
  const drawerHeight = opened ? null : drawerEl.getBoundingClientRect().height;

  drawerEl.addEventListener(
    'hy-drawer-init',
    () => {
      drawerEl.classList.add('loaded');

      setupIcon(drawerEl);

      if (drawerHeight && scrollTop >= drawerHeight) {
        window.scrollTo(0, scrollTop - drawerHeight);
      }
    },
    { once: true },
  );

  await import(/* webpackMode: "eager" */ '@hydecorp/drawer');

  window._drawer = drawerEl;

  t$.pipe(
    withLatestFrom(size$, distance$),
    tap((args) => updateSidebar(...args)),
  ).subscribe();

  // Keeping the drawer updated.
  peekWidth$
    .pipe(
      withLatestFrom(size$),
      map((args) => getRange(...args)),
      tap((range) => {
        drawerEl.range = range;
      }),
    )
    .subscribe();

  // Hacky way of letting the cover page close when scrolling
  fromEvent(document, 'wheel', { passive: false })
    .pipe(
      subscribeWhen(opened$),
      filter((e) => e.deltaY > 0),
      tap((e) => {
        if (drawerEl.translateX > 0) e.preventDefault();
      }),
      throttleTime(500),
      tap(() => drawerEl.close()),
    )
    .subscribe();
})();
