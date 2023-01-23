import '@webcomponents/webcomponents-platform';
import '@webcomponents/url';
import '@webcomponents/template';
import '@webcomponents/custom-elements';

const { customElements } = window;

let shouldFlush = false;
/** @type {?function()} */
let flusher = null;

if (customElements['polyfillWrapFlushCallback']) {
  customElements['polyfillWrapFlushCallback']((flush) => {
    flusher = flush;
    if (shouldFlush) {
      flush();
    }
  });
}

function flushAndFire() {
  if (window.HTMLTemplateElement.bootstrap) {
    window.HTMLTemplateElement.bootstrap(window.document);
  }
  flusher && flusher();
  shouldFlush = true;
  document.dispatchEvent(new CustomEvent('WebComponentsReady', { bubbles: true }));
}

if (document.readyState !== 'complete') {
  // this script may come between DCL and load, so listen for both, and cancel load listener if DCL fires
  window.addEventListener('load', flushAndFire);
  window.addEventListener('DOMContentLoaded', () => {
    window.removeEventListener('load', flushAndFire);
    flushAndFire();
  });
} else {
  flushAndFire();
}
