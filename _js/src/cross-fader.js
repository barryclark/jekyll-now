// # src / cross-fader.js
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

import 'core-js/fn/array/find';
import 'core-js/fn/function/bind';

import Color from 'color';

import { empty, fromEvent, of } from 'rxjs';
import { finalize, take, map } from 'rxjs/operators';

import elemDataset from 'elem-dataset';

import { animate } from './common';

const { find } = Array.prototype;

const BORDER_COLOR_FADE = 0.8;

function updateStyle({ color = '#4fb1ba', themeColor } = {}) {
  if (this.themeColor) {
    this.themeColor.content = themeColor || color;
  }

  if (this.rules) {
    try {
      const c = Color(color);
      const active = c.darken(0.1);

      // .content a
      this.rules[0].style.color = color;
      this.rules[0].style.borderColor = c.fade(BORDER_COLOR_FADE).string();

      // .content a:hover
      this.rules[1].style.borderColor = color;

      // :focus
      this.rules[2].style.outlineColor = color;

      // .btn-primary
      this.rules[3].style.backgroundColor = color;
      this.rules[3].style.borderColor = color;

      // .btn-primary:focus
      this.rules[4].style.boxShadow = `0 0 0 3px ${c.fade(0.5)}`;

      // .btn-primary:hover
      this.rules[5].style.backgroundColor = active;
      this.rules[5].style.borderColor = active;

      // .btn-primary:disabled
      this.rules[6].style.backgroundColor = color;
      this.rules[6].style.borderColor = color;

      // .btn-primary:active
      this.rules[7].style.backgroundColor = active;
      this.rules[7].style.borderColor = active;

      // ::selection or ::-moz-selection (assuming it is last in the list)
      this.rules[this.rules.length - 1].style.backgroundColor = color;
    } catch (e) { console.error(e); }
  }
}

// Given a dataset, generate some string we can use the check if anything has changed...
function pseudoHash({
  background, color, image, overlay,
}) {
  return `${color}${image || background}${overlay === '' ? 'overlay' : ''}`;
}

// Get an Observable that emits (once) when the `image` has been loaded,
// or just remite immediately if there is no image, or it hasn't changed.
// Note that the point is not to *use* the image object, just to make sure the image is in cache.
function cacheImage$({ background, image }) {
  if (background || !image || image === '' || image === 'none' || image === this.prevImage) {
    return of({});
  }

  const imgObj = new Image();
  const image$ = fromEvent(imgObj, 'load').pipe(
    take(1),
    finalize(() => { imgObj.src = ''; }),
  );
  imgObj.src = image;

  return image$;
}

export default class CrossFader {
  constructor(fadeDuration) {
    const main = document.getElementById('_main');
    const pageStyle = document.getElementById('_pageStyle');
    const styleSheet = find.call(document.styleSheets, ss => ss.ownerNode === pageStyle) || {};

    this.sidebar = document.getElementById('_sidebar');
    this.fadeDuration = fadeDuration;
    this.rules = styleSheet.cssRules || styleSheet.rules;
    this.prevHash = pseudoHash(elemDataset(main));

    this.themeColor = document.querySelector('meta[name="theme-color"]');
  }

  fetchImage(main) {
    const dataset = elemDataset(main);
    const {
      background, color, image, overlay,
    } = dataset;

    // HACK: Using `dataset` here to store some intermediate data
    const hash = pseudoHash(dataset);
    if (hash === this.prevHash) return empty();

    return cacheImage$.call(this, dataset)
      .pipe(map(() => {
        const div = document.createElement('div');
        div.classList.add('sidebar-bg');
        if (image !== 'none' && overlay === '') div.classList.add('sidebar-overlay');
        if (background) div.style.background = background;
        else {
          div.style.backgroundColor = color;
          if (image !== '' && image !== 'none') div.style.backgroundImage = `url(${image})`;
        }
        return [div, dataset, hash];
      }));
  }

  fade([prevDiv], [div, dataset, hash]) {
    prevDiv.parentNode.insertBefore(div, prevDiv.nextElementSibling);

    updateStyle.call(this, dataset);

    // Only update the prev hash after we're actually in the fade stage
    this.prevHash = hash;

    return animate(div, [
      { opacity: 0 },
      { opacity: 1 },
    ], {
      duration: this.fadeDuration,
    })
      .pipe(finalize(() => prevDiv.parentNode.removeChild(prevDiv)));
  }
}
