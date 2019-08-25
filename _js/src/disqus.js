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

function loadDisqus2() {
  window.DISQUS.reset({
    reload: true,
    config() {
      this.page.url = window.location.href;
      this.page.title = document.title;
    },
  });
}


export default function loadDisqus() {
  if (document.getElementById('disqus_thread')) {
    if (window.DISQUS) {
      loadDisqus2();
    } else {
      window.disqus_config = function disqusConfig() {
        this.page.url = window.location.href;
        this.page.title = document.title;
      };
      window.loadJSDeferred(document.getElementById('_disqusJS').href);
    }
  }
}

loadDisqus();
