// # src / katex.js
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

import 'core-js/fn/array/for-each';

import { hasFeatures, hide } from './common';

const { forEach } = Array.prototype;

const REQUIREMENTS = [
  'classlist',
  'eventlistener',
  'queryselector',
];

const featuresOk = hasFeatures(REQUIREMENTS);
let katexJSLoaded = false;
let katexCSSLoaded = false;

function replaceMathBlock(el, tex) {
  el.outerHTML = window.katex.renderToString(tex, {
    displayMode: el.type === 'math/tex; mode=display',
  });
}

function renderKatex(el, tex) {
  try {
    const prev = el.previousElementSibling;
    replaceMathBlock(el, tex);
    if (prev && prev.classList && prev.classList.contains('MathJax_Preview')) {
      hide.call(prev);
    }
  } catch (e) {
    // TODO: remove in production builds?
    console.error(e); // eslint-disable-line no-console
  } finally {
    el.style.willChange = '';
  }
}

function readTexSource(el) {
  return el.textContent.replace('% <![CDATA[', '').replace('%]]>', '');
}

function changeContent(mathBlocks) {
  // kramdown generates script tags with type "math/tex"
  forEach.call(mathBlocks, (script) => {
    const tex = readTexSource(script);
    renderKatex(script, tex);
  });
}

export default function upgradeMathBlocks() {
  if (featuresOk) {
    const mathBlocks = document.querySelectorAll('script[type^="math/tex"]');
    if (mathBlocks.length) {
      if (katexJSLoaded && katexCSSLoaded) {
        changeContent(mathBlocks);
      } else {
        window.loadJSDeferred(document.getElementById('_katexJS').href, () => {
          katexJSLoaded = true;
          if (katexJSLoaded && katexCSSLoaded) upgradeMathBlocks();
        });
        window.loadCSS(document.getElementById('_katexCSS').href).onload = () => {
          katexCSSLoaded = true;
          if (katexJSLoaded && katexCSSLoaded) upgradeMathBlocks();
        };
      }
    }
  }
}

upgradeMathBlocks();
