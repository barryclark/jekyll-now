import { importTemplate, intersectOnce, loadCSS, stylesheetReady, once } from './common';
import { fromEvent } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { createElement } from 'create-element-x/library';
import tippy from 'tippy.js';

// import LANG from './languages.json';

const toggleClass = (element, ...cls) => {
  element.classList.remove(...cls);
  void element.offsetWidth;
  element.classList.add(...cls);
};

(async () => {
  await Promise.all([
    ...('animate' in Element.prototype ? [] : [import(/* webpackChunkName: "webanimations" */ 'web-animations-js')]),
    ...('IntersectionObserver' in window
      ? []
      : [import(/* webpackChunkName: "intersection-observer" */ 'intersection-observer')]),
  ]);

  await stylesheetReady;

  const FN_SEL = "li[id^='fn:']";
  const FN_LINK_SEL = "a[href^='#fn:']";
  const HORIZONTAL_SCROLL_SEL =
    'pre, table:not(.highlight), .katex-display, .break-layout, mjx-container[jax="CHTML"][display="true"]';
  const CODE_BLOCK_SEL = 'pre.highlight > code';
  const CODE_TITLE_RE = /(?:title|file):\s*['"`](([^'"`\\]|\\.)*)['"`]/iu;
  const HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';

  const IMG_FADE_DURATION = 500;
  const IMG_KEYFRAMES = [{ opacity: 0 }, { opacity: 1 }];
  const IMG_SETTINGS = {
    fill: 'forwards',
    duration: IMG_FADE_DURATION,
    easing: 'ease',
  };

  const pushStateEl = document.querySelector('hy-push-state');

  const CODE_LINE_HEIGHT = 1.5;

  /** @param {(param0: HTMLElement|null) => void} fn
   *  @param {any=} opts */
  function ready(fn, opts) {
    if (pushStateEl && !window._noPushState) {
      pushStateEl.addEventListener(
        'hy-push-state-ready',
        ({
          detail: {
            replaceEls: [main],
          },
        }) => fn(main),
        opts,
      );
    }
    fn(document.getElementById('_main'));
  }

  /** @param {(param0: HTMLElement|null) => void} fn
   *  @param {any=} opts */
  function load(fn, opts) {
    if (pushStateEl && !window._noPushState) {
      pushStateEl.addEventListener('hy-push-state-load', () => fn(document.getElementById('_main')), opts);
    }
    fn(document.getElementById('_main'));
  }

  let init = true;

  ready((main) => {
    if (!main) return;

    tippy(main.querySelectorAll('.post-date > .ellipsis'), {
      trigger: 'click',
      touch: true,
      interactive: true,
      allowHTML: true,
      maxWidth: 'none',
      placement: 'bottom-start',
      offset: 0,
      content: (el) => el.innerHTML,
      onTrigger(instance, event) {
        if (event.target.tagName === 'A') {
          instance._hideOnce = true;
        }
      },
      onShow(instance) {
        if (instance._hideOnce) {
          return (instance._hideOnce = false);
        }
      },
    });

    tippy(main.querySelectorAll('abbr[title]'), {
      trigger: 'click',
      touch: true,
      maxWidth: 500,
      content: (el) => el.getAttribute('title'),
    });

    tippy(main.querySelectorAll('.sidebar-social [title]'), {
      touch: true,
      content: (el) => el.getAttribute('title'),
    });

    main.querySelectorAll(HEADING_SELECTOR).forEach((h) => {
      const df = importTemplate('_permalink-template');
      const a = df.querySelector('.permalink');
      a.href = `#${h.id}`;
      h.appendChild(df);
    });

    const toc = main.querySelector('#markdown-toc');
    if (toc) toc.classList.add('toc-hide');

    if ('clipboard' in navigator) {
      Array.from(main.querySelectorAll(CODE_BLOCK_SEL)).forEach((el) => {
        const container = el?.parentNode?.parentNode;
        const writeText = async () => {
          await navigator.clipboard.writeText(el.innerText);
          toggleClass(copyBtn, 'copy-success');
        };
        const copyBtn = createElement(
          'button',
          { onClick: writeText },
          createElement('small', { class: 'icon-copy', title: 'Copy' }),
          createElement('small', { class: 'icon-checkmark', title: 'Done' }),
        );
        container?.appendChild(copyBtn);
      });
    }

    Array.from(main.querySelectorAll(CODE_BLOCK_SEL))
      .map((code) => code.children[0])
      .forEach((el) => {
        const result = CODE_TITLE_RE.exec(el?.innerText);
        if (!result) return;
        const [, fileName] = result;

        const code = el.parentNode;

        // Remove the first line
        const child0 = el.childNodes[0];
        const nli = child0.wholeText.indexOf('\n');
        if (nli > -1) {
          const restNode = child0.splitText(nli);
          code.insertBefore(restNode, code.firstChild);
        }

        // Remove element before making changes
        code.removeChild(el);

        // Remove newline
        code.childNodes[0].splitText(1);
        code.removeChild(code.childNodes[0]);

        const container = code.parentNode.parentNode;

        // Language
        // const highlighter = container.parentNode;
        // const [, lang] = highlighter.classList.value.match(/language-(\w*)/) ?? [];
        // const language = LANG[lang];

        const header = createElement(
          'div',
          { class: 'pre-header break-layout' },
          createElement('span', {}, createElement('small', { class: 'icon-file-empty' }), ' ', fileName),
          // !language ? null : createElement('small', { class: 'fr lang' }, language),
        );

        container.insertBefore(header, container.firstChild);
      });

    if ('complete' in HTMLImageElement.prototype) {
      main.querySelectorAll('img[width][height][loading=lazy]').forEach((el) => {
        if (init && el.complete) return;
        el.style.opacity = '0';
        // TODO: replace with loading spinner
        el.addEventListener('load', () => el.animate(IMG_KEYFRAMES, IMG_SETTINGS), { once: true });
      });
      init = false;
    }

    // main.querySelectorAll(pushStateEl.linkSelector).forEach(anchor => {
    //   caches.match(anchor.href).then(m => {
    //     if (m) requestAnimationFrame(() => anchor.classList.add("visited"));
    //   });
    // });
  });

  /** @type {Promise<{}>|null} */
  let katexPromise = null;

  load(() => {
    const main = document.getElementById('_main');
    if (!main) return;

    const toc = main.querySelector('#markdown-toc');
    if (toc) {
      toc.classList.remove('toc-hide');
      toc.classList.add('toc-show');
    }

    main.querySelectorAll(FN_SEL).forEach((li) => (li.tabIndex = 0));

    main
      .querySelectorAll(FN_LINK_SEL)
      .forEach((a) =>
        a.addEventListener('click', (e) =>
          document.getElementById(e.currentTarget.getAttribute('href').substr(1))?.focus(),
        ),
      );

    main
      .querySelectorAll(HORIZONTAL_SCROLL_SEL)
      .forEach((el) =>
        el.addEventListener('touchstart', (e) => el.scrollLeft > 0 && e.stopPropagation(), { passive: false }),
      );

    // Array.from(main.querySelectorAll(CODE_BLOCK_SEL)).forEach((code) => {
    //   Array.from(code.querySelectorAll('span[class^="c"]'))
    //     .filter((c1) => c1.innerText.includes('!!'))
    //     .forEach((c1) => {
    //       const [, n] = c1.innerText.match(/!!\s*(\d+)/) || [, '1'];
    //       const hl = createElement('span', { class: '__hl', style: `height: ${Number(n) * CODE_LINE_HEIGHT}em` });
    //       c1.innerText = c1.innerText.replace(`!!${n}`, '!!');
    //       const hasContent = c1.innerText?.match(/[\p{L}|\d]/u);
    //       if (!hasContent) {
    //         c1.parentElement?.replaceChild(hl, c1);
    //       } else {
    //         c1.innerText = c1.innerText.replace('!!', '');
    //         c1.parentElement?.insertBefore(hl, c1);
    //       }
    //     });
    // });

    const katexHref = document.getElementById('_katexPreload')?.href;
    if (!katexPromise && katexHref) {
      intersectOnce(main.querySelectorAll('.katex'), { rootMargin: '1440px' }).then(() => {
        katexPromise = loadCSS(katexHref);
      });
    }
  });

  const mathJaxEl = document.getElementById('_MathJax');
  if (pushStateEl && mathJaxEl) {
    const mathJax2To3 = ({
      detail: {
        replaceEls: [mainEl],
      },
    }) => {
      mainEl.querySelectorAll('script[type="math/tex; mode=display"]').forEach((el) => {
        el.outerHTML = el.innerText.replace('% <![CDATA[', '\\[').replace('%]]>', '\\]');
      });
      mainEl.querySelectorAll('script[type="math/tex"]').forEach((el) => {
        el.outerHTML = `\\(${el.innerText}\\)`;
      });
    };

    mathJax2To3({ detail: { replaceEls: [document] } });

    if (!('MathJax' in window)) await once(mathJaxEl, 'load');

    await MathJax.typesetPromise();

    if (!window._noPushState) {
      pushStateEl.addEventListener('ready', mathJax2To3);
      fromEvent(pushStateEl, 'after')
        .pipe(concatMap(() => MathJax.typesetPromise()))
        .subscribe();
    }
  }
})();
