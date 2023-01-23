// Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
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

import 'broadcastchannel-polyfill';
import { webComponentsReady, stylesheetReady } from './common';

(async () => {
  await Promise.all([
    ...('customElements' in window
      ? []
      : [
          import(/* webpackChunkName: "webcomponents" */ './polyfills/webcomponents').then(() =>
            import(/* webpackChunkName: "shadydom" */ './polyfills/shadydom'),
          ),
        ]),
  ]);

  await webComponentsReady;
  await stylesheetReady;

  if (process.env.GET_CLAPS_API && !window.GET_CLAPS_API) window.GET_CLAPS_API = process.env.GET_CLAPS_API;

  import(/* webpackMode: "eager" */ '@getclaps/button');
})();
