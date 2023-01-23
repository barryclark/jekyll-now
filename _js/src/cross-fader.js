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

import { EMPTY, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

import { animate, fetchRx } from './common';

const RE_CSS_URL = /url\s*\(['"]?(([^'"\\]|\\.)*)['"]?\)/u;

/** @param {Document} doc */
const calcHash = (doc) => {
  const sidebar = doc.getElementById('_sidebar');
  const sidebarBg = sidebar?.querySelector('.sidebar-bg');
  const pageStyle = doc.getElementById('_pageStyle');
  // const rule = Array.from(pageStyle?.sheet?.rules ?? []).find(r => r.selectorText === 'html');
  // const accentColor = rule?.style.getPropertyValue('--accent-color') ?? '';
  // const themeColor = rule?.style.getPropertyValue('--theme-color') ?? '';
  return [
    pageStyle?.innerText?.trim(),
    sidebar?.classList,
    sidebarBg?.classList,
    sidebarBg?.style.backgroundImage,
  ].join('\n');
};

/**
 * Consider a URL external if either the protocol, hostname or port is different.
 * @param {URL} param0
 * @param {Location=} location
 */
function isExternal({ protocol, host }, location = window.location) {
  return protocol !== location.protocol || host !== location.host;
}

const objectURLs = new WeakMap();

export class CrossFader {
  /** @param {number} fadeDuration */
  constructor(fadeDuration) {
    this.sidebar = document.getElementById('_sidebar');
    this.fadeDuration = fadeDuration;
    this.prevHash = calcHash(document);
    this.themeColorEl = document.querySelector('meta[name="theme-color"]');
  }

  /** @param {Document} newDocument */
  fetchImage2(newDocument) {
    const { backgroundImage = '' } = newDocument.querySelector('.sidebar-bg')?.style ?? {};
    const result = RE_CSS_URL.exec(backgroundImage);
    if (!result) {
      return of('');
    }

    const url = new URL(result[1], window.location.origin);

    return fetchRx(url.href, {
      method: 'GET',
      headers: { Accept: 'image/*' },
      ...(isExternal(url) ? { mode: 'cors' } : {}),
    }).pipe(
      switchMap((r) => r.blob()),
      map((blob) => URL.createObjectURL(blob)),
      catchError(() => of(url.href)),
    );
  }

  /** @param {Document} newDocument */
  fetchImage(newDocument) {
    const hash = calcHash(newDocument);
    if (hash === this.prevHash) return EMPTY;

    return this.fetchImage2(newDocument).pipe(
      map((objectURL) => {
        /** @type {HTMLDivElement} */
        const div = newDocument.querySelector('.sidebar-bg') ?? document.createElement('div');

        if (objectURL) {
          div.style.backgroundImage = `url(${objectURL})`;
          objectURLs.set(div, objectURL);
        }

        return [div, hash, newDocument];
      }),
    );
  }

  /** @param {Document} newDocument */
  updateStyle(newDocument) {
    const classList = newDocument.getElementById('_sidebar')?.classList;
    if (classList) this.sidebar.setAttribute('class', classList);

    if (this.themeColorEl) {
      const themeColor = newDocument.head.querySelector('meta[name="theme-color"]')?.content;
      if (themeColor) {
        window.setTimeout(() => {
          if (this.themeColorEl) {
            this.themeColorEl.content = themeColor;
          }
        }, 250);
      }
    }

    try {
      const pageStyle = document.getElementById('_pageStyle');
      const newPageStyle = newDocument.getElementById('_pageStyle');
      if (!newPageStyle) return;
      pageStyle?.parentNode?.replaceChild(newPageStyle, pageStyle);
    } catch (e) {
      if (process.env.DEBUG) console.error(e);
    }
  }

  /**
   * @param {[HTMLDivElement]} param0
   * @param {[HTMLDListElement, string, Document]} param1
   */
  fade([prevDiv], [div, hash, newDocument]) {
    prevDiv?.parentNode?.insertBefore(div, prevDiv.nextElementSibling);

    this.updateStyle(newDocument);

    // Only update the prev hash after we're actually in the fade stage
    this.prevHash = hash;

    return animate(div, [{ opacity: 0 }, { opacity: 1 }], {
      duration: this.fadeDuration,
      easing: 'ease',
    }).pipe(
      finalize(() => {
        if (objectURLs.has(prevDiv)) URL.revokeObjectURL(objectURLs.get(prevDiv));
        prevDiv?.parentNode?.removeChild(prevDiv);
      }),
    );
  }
}
