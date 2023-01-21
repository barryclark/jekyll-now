There are two versions of **Hydejack**: The *Free Version* includes basic blogging functionality and most of Hydejack's [Features], such as dynamic page loading and advanced animations.

The *PRO Version* includes additional features for professionals, such as a [portfolio], [resume], [Dark Mode][dark], [Forms], [Built-In Search][search] and customizable cookie banners.

The table below shows what's included in each version:

|                               | Free                | PRO                 |
|:------------------------------|:-------------------:|:-------------------:|
| [Blog]                        | &#x2714;            | &#x2714;            |
| [Features]                    | &#x2714;            | &#x2714;            |
| [Documentation][docs]         | &#x2714;            | &#x2714;            |
| [Portfolio]                   |                     | &#x2714;            |
| Printable [Resume]            |                     | &#x2714;            |
| [Dark Mode][dark]             |                     | &#x2714;            |
| [Built-In Search][search]     |                     | &#x2714;            |
| [Custom Forms][forms]         |                     | &#x2714;            |
| [Newsletter Box][news]        |                     | &#x2714;            |
| [Grid layout][grid]           |                     | &#x2714;            |
| [Offline Support][ofln]       |                     | &#x2714;            |
| Table of Contents[^21]        |                     | &#x2714;            |
| Cookie Banner                 |                     | &#x2714;            |
| No Hydejack Branding          |                     | &#x2714;            |
| License                       | [GPL-3.0][lic]      | [PRO]               |
| Source                        | [GitHub][src]       | Included            |
| __Price__                     | __Free__            | <span class="price"><del>$99</del> <strong class="new-price">$69</strong> <small>One-Time Payment</small></span> [^22] |
|===============================+=====================+=====================|
|                               | [__Download__][kit] | [__Buy PRO__][buy]{:.gumroad-button data-gumroad-single-product="true"} |
{:.stretch-table.dl-table}

[^21]: Large screens (> 1664px width) only.

[^22]: Price now permanently reduced by <strong class="discount">30%</strong>! Use the offer code <strong class="code">QR0TW8M</strong> to apply this discount later.
       {:.ppi}
       If you're upgrading from Hydejack 8, find your upgrade discount code in the latest zip download.

<script type="module">
  document.querySelectorAll('a[href="#_search-input"]').forEach(el => {
    if (!el.dataset.done) {
      el.addEventListener('click', () => document.getElementById('_search-input').focus());
      el.dataset.done = '';
    }
  });

  document.querySelectorAll('.ppi').forEach(async el => {
    if (!el.dataset.done) {
      const { name, emoji, code, discount } = await window._ppiData;
      if (!code) return;
      el.querySelectorAll('.name').forEach(el => { el.innerText = name });
      el.querySelectorAll('.emoji').forEach(el => { el.innerText = emoji; el.title = name });
      el.querySelectorAll('.code').forEach(el => { el.innerText = code.toUpperCase() });
      el.querySelectorAll('.discount').forEach(el => { el.innerText = `${discount * 100}%` });
      el.dataset.done = '';
    }
  });

  document.querySelectorAll('.price').forEach(async el => {
    if (!el.dataset.done) {
      const { name, emoji, code, discount } = await window._ppiData;
      if (!code) return;
      el.querySelectorAll('.name').forEach(el => { el.innerText = name });
      el.querySelectorAll('.emoji').forEach(el => { el.innerText = emoji; el.title = name });
      el.querySelectorAll('.code').forEach(el => { el.innerText = code.toUpperCase() });
      el.querySelectorAll('.new-price').forEach(el => { el.innerText = `$${99 - discount * 100}` });
      el.dataset.done = '';
    }
  });
</script>
