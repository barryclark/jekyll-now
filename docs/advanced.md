---
layout: page
title: Advanced
description: >
  This chapter covers advanced topics, such as offline support and custom JS builds. Codings skills are recommended.
hide_description: true
sitemap: false
---

This chapter covers advanced topics, such as offline support and custom JS builds. Codings skills are recommended.

0. this unordered seed list will be replaced by toc as unordered list
{:toc}

## Enabling offline support
Hydejack v8 introduces experimental "cache as you go" offline support. This is implemented via the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), a new browser standard that is now supported in the latest versions of all major browsers. However, it is a very powerful feature and should be used with a lot of care.

Enabling this feature requires that your content meets the following criteria:

* Content doesn't change between deploys (e.g. manually adding things to `_site` etc.)
* All assets in `assets` are immutable, i.e. they never change (when changing a file in assets, it needs to have a new name and links need to point to the new file).
* The site is mostly self-contained, i.e. assets are served from the same domain (offline support will not download assets form external sites by default)
* The site is served via HTTPS (this is a Service Worker requirement)

To enable this feature, create a `sw.js` file in the root of your project and add the following content:

```js
---
---
importScripts("{% raw %}{{ '/assets/js/sw.js' | relative_url }}?t={{ site.time | date_to_xmlschema }}{% endraw %}");
```

This will load the main service worker script from Hydejack's assets. The `site.time` part is necessary to make the service worker "byte different" every time you create a new build of your site, which triggers an update.

In your `config.yml` under the `hydejack` key, add the following:

```yml
offline:
  enabled: true
  cache_version: 1
```

The current implementation does not cache resources from external domains. There is now way of knowing if external sites conform to the conditions mentioned above, hence caching can be problematic and result in unexpected behavior.

For example, Google Analytics uses GET requests to send page views, each of which would be cached by the service worker without this policy. Frequently updating images, such as badges would never change.

![Gem Version](https://badge.fury.io/rb/jekyll-theme-hydejack.svg)

However, if you include resources that are hosted on another domain and don't change, you can add the `sw-cache` query parameter to the URL, e.g.

    https://upload.wikimedia.org/wikipedia/commons/b/b1/57_Chevy_210.jpg?sw-cache

This will cause them to be cached like resources from the assets folder.

If you want to serve a file from the `assets` folder but NOT cache it for offline use, add the `no-cache` query parameter instead:

    /assets/lfs/download.bin?no-cache


![57 Chevy](https://upload.wikimedia.org/wikipedia/commons/b/b1/57_Chevy_210.jpg?sw-cache)


### How offline storage works

Hydejack's custom service worker implementation stores files for offline use on three different levels:

Shell
: The shell files are the core Hydejack files (CSS, JS) that only change between version updates.
  If you made changes to any of these after enabling offline support, you must force an update by bumping the `cache_version` number in the config file.

Assets
: *These are presumed to be immutable.* In other words, every file is cached indefinitely. E.g.: If you want to update an image after enabling offline support, add the image under a different name and change the link in the content. Alternatively, you can bump the `cache_version`, but this will remove all other cached files from the asset cache.

Content
: The content cache exploits the fact that your content can't change between builds, so that it can be stored for offline use until you upload a new build. For now, the entire content cache is discarded every time you publish new content (future versions could cache them based on last modified dates).

Other things to note are that the implementation will always cache the pages listed under `legal`, as well as the `404.html` page, which will be shown when the user is offline.


## Adding a custom social media icon
Hydejack includes a number of social media icons by default (in fact, everything that is provided by [IcoMoon](https://icomoon.io/)), but since the landscape is always changing, it is likely that a platform that is important to you will be missing at some point.

You can add any platform by simply providing a complete URL. However, a fallback icon <span class="icon-link"></span> will be used.
{:.note}

### Creating the icon font
In order to add a custom social media icon you have to use the [IcoMoon App](https://icomoon.io/app/) (free) to create a custom icon webfont. However, it is important that the generated font include all icons already in use by Hydejack. For this purpose, find the `selection.json` in [`assets/icomoon/selection.json`](https://github.com/hydecorp/hydejack/blob/v6/assets/icomoon/selection.json) and upload it to the app via "Import Icons".
Then, use the app to add your icon(s).
Consult the [IcoMoon docs](https://icomoon.io/#docs) for additional help.

Once you've created and downloaded the icon font form IconMoon, replace the `icomoon` folder in `assets` in its entirety. Keep in mind that future updates of Hydejack will override this folder.

### Adding the platform's metadata
For the second step it is necessary to add the network's metadata to `_data/social.yml`.
An entry looks like:

~~~yml
deviantart:
  name: DeviantArt
  icon: icon-deviantart
  prepend: "https://"
  append: ".deviantart.com"
~~~

`name`
: The name of the network. Used for the title attribute and screen readers.

`icon`
: The icon CSS class. Can be chosen during the IcoMoon creation process.

`prepend`
: Optional. A string that is prepended to the username to form the link to the profile. If the final URL should be `https://<username>.deviantart.com`, this would be `https://`

`append`
: Optional. A string that is appended to the username to form the link to the profile. If the final URL should be `https://<username>.deviantart.com`, this would be `.deviantart.com`.


## How CSS is organized in Hydejack
Hydejack takes a quite unique approach to CSS, which is motivated by the ability to
inline essential CSS rules in a `style` tag in the `<head/>` of a page (to increase the loading speed),
while serving the rest in a separate file.

The styles are written in SCSS and are located in the `_sass` folder, which looks like

~~~
├── hydejack
│   ├── __inline__
│   ├── __link__
│   ├── _base.pre.scss
│   ├── ...
│   └── _social.pre.scss
├── pooleparty
│   ├── __inline__
│   ├── __link__
│   ├── _base.pre.scss
│   ├── ...
│   └── _type.pre.scss
├── mixins.scss
├── my-inline.scss
├── my-style.scss
├── syntax.scss
└── variables.scss
~~~

The style rules are organized alongside components (or rather, topics) like "sidebar" and "footer".
Further, there are two separate frameworks, "pooleparty" and "hydejack",
which grew out of the original [Poole](http://getpoole.com/) and [Hyde](http://hyde.getpoole.com/) projects.
Poole/party contains more general style rules, while Hyde/jack contains those that more are specific to the theme.
However, this separation has blurred over time.

Inside those folders, you will notice the `__inline__` and `__link__` folders.
The unfriendly names are intentional, because their contents are generated by a script and shouldn't be modified directly.
The source files are located in the same folder and end with `.pre.scss`.
They are fully valid SCSS files, but contain comments that mark which lines should be inlined and which should be fetched asynchronously.

The rules are as follows:
* Every line between `// <<< inline ` and `// >>>` will be inlined
* Every line between `// <<< link ` and `// >>>` will be linked
* Every line that isn't contained in a block and ends with `// inline` will be inlined
* Every line that isn't contained in a block and ends with `// link` will be linked
* Every line for which none of the above applies will be included in both.

The actual splitting happen with the `.scripts/build-css.sh` script (requires node.js 8+).
You can run the script once by using

~~~bash
$ npm run build:css
~~~

or rebuild the CSS on every file change

~~~bash
$ npm run watch:css
~~~

Note that `my-inline.scss` and `my-style.scss` are not affected by this.
Also, since all files are valid SCSS, the splitting part is entirely optional.
If you would like to build just one regular CSS file, add

```yml
hydejack:
  no_inline_css: true
```

to your config file.


*[FLIP]: First Last Invert Play
