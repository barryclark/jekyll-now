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

import '@babel/polyfill';

import '../lib/version';
import '../lib/modernizr-custom';
import { hasFeatures } from './common';

__webpack_public_path__ = window._publicPath;

const BASELINE = ['classlist', 'eventlistener', 'queryselector', 'template'];
const DARK_MODE_FEATURES = ['customproperties'];
const DRAWER_FEATURES = ['customproperties', 'history', 'matchmedia', 'opacity'];
const PUSH_STATE_FEATURES = ['history', 'matchmedia', 'opacity', 'cssanimations', 'cssremunit', 'documentfragment'];
const CLAP_BUTTON_FEATURES = ['customproperties', 'cssanimations', 'cssremunit'];
const TOC_FEATURES = ['matchmedia', 'cssremunit'];

if (hasFeatures(BASELINE)) {
  import(/* webpackMode: "eager" */ './upgrades');

  if (!window._noNavbar) import(/* webpackChunkName: "navbar" */ './navbar');
  // if (!window._noSearch) import(/* webpackChunkName: "search" */ './pro/search');

  // if (hasFeatures(DARK_MODE_FEATURES)) {
  //   import(/* webpackMode: "eager" */ './pro/cookies-banner');
  //   import(/* webpackMode: "eager" */ './pro/dark-mode');
  // }

  if (window._clapButton && hasFeatures(CLAP_BUTTON_FEATURES)) {
    import(/* webpackChunkName: "clap-button" */ './clap-button');
  }

  // A list of Modernizr tests that are required for the drawer to work.
  if (!window._noDrawer && hasFeatures(DRAWER_FEATURES)) {
    import(/* webpackChunkName: "drawer" */ './drawer');
  }

  if (!window._noPushState && hasFeatures(PUSH_STATE_FEATURES)) {
    import(/* webpackChunkName: "push-state" */ './push-state');
  }

  // if (!window._noToc && hasFeatures(TOC_FEATURES)) {
  //   import(/* webpackChunkName: "toc" */ './pro/toc');
  // }
}
