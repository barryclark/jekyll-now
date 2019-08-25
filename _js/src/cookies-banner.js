// # src / cookies-banner.js
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

if (window.ga && !navigator.CookiesOK && !(localStorage && localStorage.getItem('hy:cookiesOK'))) {
  const template = document.getElementById('_cookies-banner-template');
  if (template) {
    const parent = document.getElementsByTagName('hy-push-state')[0];
    parent.insertBefore(document.importNode(template.content, true), parent.firstChild);

    document.getElementById('_cookies-ok').addEventListener('click', () => {
      if (localStorage) localStorage.setItem('hy:cookiesOK', true);

      const banner = document.getElementById('_cookies-banner');
      banner.parentNode.removeChild(banner);

      window.ga((tracker) => {
        window.ga('set', 'anonymizeIp', undefined);
        if (localStorage) localStorage.setItem('ga:clientId', tracker.get('clientId'));
      });
    }, { once: true });
  }
}
