// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
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

import { fromEvent, timer, merge } from 'rxjs';
import {
  map,
  filter,
  pairwise,
  mergeWith,
  mapTo,
  tap,
  switchMap,
  startWith,
  share,
  debounceTime,
} from 'rxjs/operators';

import { hasCSSOM, getScrollTop, stylesheetReady, filterWhen } from './common';

(async () => {
  await stylesheetReady;

  const navbarEl = document.getElementById('_navbar');
  if (!navbarEl) return;

  // FIXME: update when size changes
  const height = navbarEl.clientHeight;

  let offset = 0;

  const tv = hasCSSOM ? new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))]) : null;

  const checkNavbarInactive = () => !document.activeElement?.classList.contains('nav-btn');

  const hashchange$ = fromEvent(window, 'hashchange').pipe(
    map((e) => new URL(e.newURL).hash),
    filter((hash) => hash !== '' && hash !== '#_search-input'),
    share(),
  );

  // To disable the navbar while the "scroll into view" animation is active.
  // Wait for 50ms after scrolling has stopped before unlocking the navbar.
  const notScrollIntoView$ = hashchange$.pipe(
    switchMap(() => fromEvent(document, 'scroll').pipe(debounceTime(50), mapTo(true), startWith(false))),
    startWith(true),
  );

  // Certain events should make the navbar "jump" to a new position.
  const jump$ = merge(
    // Focusing any navbar element should show the navbar to enable keyboard-only interaction.
    fromEvent(navbarEl, 'focus', { capture: true }).pipe(mapTo(2 * height)),
    // Scrolling to a certain headline should hide the navbar to prevent hiding it.
    hashchange$.pipe(mapTo(-2 * height)),
  );

  fromEvent(document, 'scroll', { passive: true })
    .pipe(
      filterWhen(notScrollIntoView$),
      map(getScrollTop),
      filter((x) => x >= 0),
      pairwise(),
      map(([prev, curr]) => prev - curr),
      filter(checkNavbarInactive),
      mergeWith(jump$),
      tap((x) => {
        offset += x;
        offset = Math.max(-height, Math.min(0, offset));
        if (hasCSSOM) {
          tv[0].y.value = offset;
          navbarEl.attributeStyleMap.set('transform', tv);
        } else {
          navbarEl.style.transform = `translateY(${offset}px)`;
        }
      }),
    )
    .subscribe();
})();
