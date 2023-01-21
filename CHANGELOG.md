---
layout: plain
sitemap: false
---

# CHANGELOG
{:.no_toc}

* this list will be replaced by the toc
{:toc .large-only}

## v9.1.6
Feb 07 2022
{:.heading.post-date}

* Removed unused clap button HTML tags
* Fixed an issue with using `featured` projects on the `welcome` layout
* Minor style adjustments
* Updated dependencies

## v9.1.5
Nov 30 2021
{:.heading.post-date}

* Now works with Ruby 3.0
* Fixed theme color issue when using multiple theme colors
* Fixed UTF-8 characters not rendering correctly in breadcrumbs
* Fixed empty string warning in resume layout
* Removed clap button info box

## v9.1.4
Mar 30 2021
{:.heading.post-date}

* Fixed scroll position restoration in webkit.
* Fixed an issue that caused clap button to use canonical url incorrectly.

## v9.1.3
Mar 28 2021
{:.heading.post-date}

### Added
* Allow setting custom Google Fonts providers via `google_fonts_url` ([#264](https://github.com/hydecorp/hydejack/issues/264)). Defaults to `https://fonts.googleapis.com`. 

### Fixes
* Merged [#266](https://github.com/hydecorp/hydejack/pull/266) --- Fixed a bug that caused incorrect links to be rendered.
* Merged [#267](https://github.com/hydecorp/hydejack/pull/267) --- Fixed a bug that caused incorrect sub-titles when using multiple categories/tags.
* Fix [#262](https://github.com/hydecorp/hydejack/issues/262) --- Fixed a bug that causes warnings when not providing a skill level / fluency level in the resume.
* [PRO] Fixed a bug preventing scrolling when using sticky ToC with certain aspect ratios.

### Design
* [PRO] Adjusted calculation to dark mode background color to prevent red tint of grey colors
* Hide underline in tooltips
* Show clap button on collection pages
* Show dingbat in `plain` layout

## v9.1.2
Feb 11 2021
{:.heading.post-date}

* Fix [#258](https://github.com/hydecorp/hydejack/issues/258)
* Fix [#259](https://github.com/hydecorp/hydejack/issues/259)

 
## v9.1.1
Feb 9 2021
{:.heading.post-date}

* Added tooltips to post subtitles and last-modified-at lines.
* Added tooltips to abberavations (`<abbr>` tags), e.g. IIAFE. See [Example Content](/blog/hyde/2012-02-07-example-content/#inline-html-elements){:.flip-title} on how to use them in markdown.
* Added tooltips to social media icons (inside main column only)
* Fixed KaTeX font rendering
* [PRO] Setting `clap_button: false` will hide the clap button preview, even in development
* [PRO] A overscrolling ToC will scroll itself to keep the active element in view.

*[IIAFE]: Instantly Invoked Asynchronous Function Expression
*[ToC]: Table of Contents

## v9.1.0
Feb 5 2021
{:.heading.post-date}

Version 9.1 provides minor design changes, new features, and closes multiple issues:

### Added

*   Code blocks now can have headers:

    ~~~js
    // file: 'hello-world.js'
    console.log('Hello World!');
    ~~~

    To add the headers, simply make the first line a comment of the form `file: "dir/filename.ext"`.

    * Code blocks now have a copy-to-clipboard button
  
*   Resumes can now have download buttons.

    ![Download Buttons](/assets/img/blog/9.1.0-3.png){:.border.lead width="1776" height="258" loading="lazy"}

    Add the following to the front matter. Note that the PDF needs to be pre-generated. 
    See [the docs](docs/basics.md#downloads) for more.

    ```yml
    # file: "resume.md"
    buttons:
      print: true
      pdf: /assets/Resume.pdf
      vcf: http://h2vx.com/vcf/<!--url-->
      json: /assets/resume.json
    ```

*   Added breadcrumbs above page title:

    ![Breadcrumbs](/assets/img/blog/9.1.0-2.png){:.border.lead width="1588" height="164" loading="lazy"}

    Note that this requires a [directory-like URL pattern](https://qwtel.com/posts/software/urls-are-directories/) like `/blog/:categories/:year-:month-:day-:title/` (default for Hydejack).

    Disable with `hydejack.no_breadcrumbs`.

*   Added "Last modified at" to post layout:

    ![Last modified at](/assets/img/blog/9.1.0-1.png){:.border.lead width="1254" height="218" loading="lazy"}

    To enable this feature, the post needs to have a `last_modified_at` property with a valid date. You can either set it manually in the frontmatter (not recommended), or use the [`jekyll-last-modified-at` plugin](https://github.com/gjtorikian/jekyll-last-modified-at) to set it for you (Not available on GitHub Pages!). 

    You can remove this element by setting `hide_last_modified` in the front matter. You can disable it for all posts by setting `hydejack.hide_last_modified` in the config file. Setting `hydejack.hide_dates` (PRO version only) will also remove it, together with all other time-related UI elements.

    You can customize the hover text, icon, and date format in `_data/strings.yml` using the following keys: `last_modified_at` (hover text), `last_modified_at_icon` (icon name, default: `icon-history`) and `date_formats.last_modified_at` (date format, default: `%Y-%m-%d`).

* Added option to "invert" / darken the font colors in the sidebar. This enables use of bright sidebar images. 
  Set `invert_sidebar: true` in the font matter to enable. Use `defaults` in the config file to enable this for all pages.

* Added a demo of [Clap Button](https://getclaps.app/) during development.
* Added option to configure border radius
* Added dingbat to `page` layout
* Added `plain` layout that comes without a dingbat
* Added `smaller` and `larger` CSS classes that set the font size to the respective values.
* Added options to change the file paths to favicon and apple touch icon in the confog file. Use `favicon` and `apple_touch_icon` respectively.

### Changed
* Added border radius to many elements
* Modernized table design
* [PRO] Setting `hydejack.advertise: false` will now remove the banner from the HTML and the JavaScript console.
* Changed the box shadow of cards (projects, posts) to reduce the amount of painting the browser has to do on when mouse hovering them.
* The layout when using the theme without the `no_break_layout` setting is now


### Fixes
* Allow transparent project and post images
* Removing/leaving out the `logo` key in the config file will now correctly remove the logo from the sidebar
* [PRO] Fixed a bug that caused blog posts to be included the the search even when set to `sitemap: false` in the front matter.

## v9.0.5
Sept 8 2020
{:.heading.post-date}

* Added GitHub Pages Starter Kit to PRO version
* Added chapter on how to deploy PRO on GitHub Pages
* JavaScript source files now included in PRO zip again
* Updated default config file
* Changed default code font
* Improved fallback image in dark mode

## v9.0.4
July 15 2020
{:.heading.post-date}

* Fixed image fade in animation for images with `srcset`
* Slightly increased size of post and project cards
* Added page margin to print layout
* Fixed KaTeX when JavaScript is disabled 
* Fixed a layout bug in the `resume` layout when changing the content width in variable
* Fixed table of contents sticky breakpoint

## v9.0.3
July 9 2020
{:.heading.post-date}

* Updated print resume style  
* Updated docs for GitHub Pages
* Slightly decreased size of dark mode icon
* Fixed a bug that caused a GitHub Pages build to fail with an empty configuration file
* Changed default icon so that it less resembles slashdot.org\~\~ 

## v9.0.2
July 7 2020
{:.heading.post-date}

* Fixed a bug that prevented the search from updating when offline is enabled
* Fixed a bug that caused search terms to get lost during initialization
* Fixed a bug that prevented `site.legal` from getting stored for offline during service worker installation
* Added support to for `no-cache` param to service worker.

## v9.0.1
July 6 2020
{:.heading.post-date}

* Changing app icons has been revamped. See [this section](./docs/config.md#adding-custom-favicons-and-app-icons) in the docs.
* Changed default icons
* Changed default sidebar background
* Added `jekyll-compose` defaults to config file
* Slightly adjusted dark mode colors
* Fixed resume layout breakpoint

## v9.0.5
Sept 8 2020
{:.heading.post-date}

* Added GitHub Pages Starter Kit to PRO version
* Added chapter on how to deploy PRO on GitHub Pages
* JavaScript source files now included in PRO zip again
* Updated default config file
* Changed default code font
* Improved fallback image in dark mode

## v9.0.4
July 15 2020
{:.heading.post-date}

* Fixed image fade in animation for images with `srcset`
* Slightly increased size of post and project cards
* Added page margin to print layout
* Fixed KaTeX when JavaScript is disabled 
* Fixed a layout bug in the `resume` layout when changing the content width in variable
* Fixed table of contents sticky breakpoint

## v9.0.3
July 9 2020
{:.heading.post-date}

* Updated print resume style  
* Updated docs for GitHub Pages
* Slightly decreased size of dark mode icon
* Fixed a bug that caused a GitHub Pages build to fail with an empty configuration file
* Changed default icon so that it less resembles slashdot.org\~\~ 

## v9.0.2
July 7 2020
{:.heading.post-date}

* Fixed a bug that prevented the search from updating when offline is enabled
* Fixed a bug that caused search terms to get lost during initialization
* Fixed a bug that prevented `site.legal` from getting stored for offline during service worker installation
* Added support to for `no-cache` param to service worker.

## v9.0.1
July 6 2020
{:.heading.post-date}

* Changing app icons has been revamped. See [this section](./docs/config.md#adding-custom-favicons-and-app-icons) in the docs.
* Changed default icons
* Changed default sidebar background
* Added `jekyll-compose` defaults to config file
* Slightly adjusted dark mode colors
* Fixed resume layout breakpoint

## v9.0.0
July 3 2020
{:.heading.post-date}

### Major
*   Added Built-In Search Functionality

    Hydejack now has its own built-in search solution, that integrates well with the existing page style and the new navbar. 
   
    The solution is entirely browser-based which means it even works while offline and doesn't depend on an 3rd party. 
    This works, because Hydejack is designed for personal sites that generally have less than 1000 pages. 
    In my testing, Jekyll build times have been a problem long before search query times.
   
    The results of the search are surprisingly good, but have only been tested in English and (somewhat) German. 
    For better language support, I might build an integration with Algolia at some point, which has the best results, 
    but requires stable internet connection and an API key. 
    I'd be interested to hear about problems with search in other languages to determine if this is necessary.

*   Added Table of Contents that is prettier, sticky, and dynamic.

    Adding a table of contents is part of kramdown and can be done in all versions of Hydejack. 
    However, v9 adds a dynamic version that will stick to the 3rd column on large screens and highlight the current section. 
   
    Note that this will reduce the amount of space freed up by the `no_break_layout: false` setting (otherwise the ToC would overlap with code blocks, math blocks, etc).

*   Added a scroll-linked navbar that disappears when scrolling down and re-appears when scrolling up.

*   Math support has been revamped because the old solution stopped working with Jekyll 4. Hydejack now supports both KaTeX and MathJax. 

    The MathJax implementation is more similar to the old solution. It comes with a client-side runtime (MathJax in this case)
    and works on GitHub Pages. It is the more heavy-weight of the two and doesn't work without JavaScript enabled. 
    Due to the size of the complete MathJax package, it only works partially with offline support enabled.

    The KaTeX implementation has been changed to pre-render the KaTeX output during site building.
    It _does not_ ship a client-side runtime, which is more lightweight and works _without_ JavaScript.
    In my opinion, it is the more elegant solution, but it requires a JavaScript runtime on the machine that builds the site.
    This means that this solution doesn't work on GitHub Pages.

    You can switch between the two implementations by changing the `kramdown.math_engine` key to either `katex` or `mathjax` in your config file.
    The KaTeX implementation also requires the `kramdown-math-katex` gem in your `Gemfile`.

*   Drastically improved build times through the use of `jekyll-include-cache`. 
    Most of the previous tips on [improving page build speed](hydejack/_posts/2019-02-18-improving-site-build-speed.md) should now be obsolete.

*   Added `grid` layout in PRO version that mirrors the `projects` layout, but for posts. 
    If you've set `image`s for your posts, it will give your blog a more modern look.

### Minor
* CSS variables are now configurable via `_data/variables.yml`. While there are other ways to change them, this has the broadest reach across HTML (`img[sizes]` attribute!), CSS and JS.
* Many JS content features (such as `#` heading links) now work even when `hydejack.no_push_state` is enabled.
* Linking to posts in the `home` and `post` layout now accept either paths or URLs. [Read more](docs/basics.md#adding-related-posts-to-a-post).
* The star icons in the resume layout can now be disabled via `no_skill_icons` and `no_language_icons`.
* Resume layout now supports the following keys: `born`, `citizenship`, and `maritalStatus`.
* PRO only: Added `hide_dates` option to disable showing blog post dates.
* The `blog` layout now works without pagination, simply showing all posts on a single page when the `jekyll-pagination` plugin is not found.
* The `projects`, `resume`, and `grid` layout now make better use of large screens, by letting content expand to the right of the screen. Restore the previous , set `no_break_columns` in front matter.
* Removed smooth scroll polyfill for Safari/Webkit as it has caused problems with sticky content.
* Figure captions can now be added to code blocks, math blocks, and tables in addition to just images using the `.figcaption` CSS class.
* The order of the comment section relative to the about and related posts sections can now be customized via the `hydejack.post_addons` and `hydejack.project_addons` keys. See the example `_config.yml` for more.
* Clicking the image in the `blog` layout will now navigate to the blog post. In the PRO version it will do so with the classic "move image in place" animation.
* Grouping projects by year can now be disabled. Use `no_groups: true` in the front matter. This also applies to the new `grid` layout and the old `list` layout.
* hy-img has been removed and replaced with browser's native `loading=lazy` attribute
* Now serving separate JavaScript files for old and new browsers, allowing it to take advantage of many new language features.
* JavaScript files are now chunked, so that only what is needed is loaded on demand.
* hy-drawer and hy-push-state have been rewritten in TypeScript and LitHTML, fixing many bugs in the process.
* Updated to Jekyll 4.1
* Hydejack now has a dedicated offline page that will be shown when the client is offline and tries to open a page that hasn't been cached. 
  The content of the page can be customized by creating `offline.md` file in the root with `layout: offline`, similar to `404.md`.
* The code font can now be customized in the config file via the `font_code` key.

### Design
* Many layouts (`projects`, `resume`, `home`) will now use more space on large screens (disable via `hydejack.no_third_column`)
* Headings now appear "oversized" on larger screens and extend to the right end of the screen (disable via `hydejack.no_large_headings`)
* The base font size is now smaller across screen sizes (can be configured in `_sass/_variables.scss`)
* The content width is now larger across screen sizes (can be configured in `_sass/_variables.scss`)
* The link style has been changed to make picking accent colors easier for dark mode. It's also possible to link images now without worrying about underlines.
* The amount of whitespace has been reduced. Previously it had been increased but it felt too much.
* Added a [`note` class](docs/writing.md#adding-notes) that succeeds the `message` for adding auxillary content. The `message` class still exists.
* The navbar buttons made to look more like buttons
* Dark mode colors have been toned down a bit
* Improved dark mode text rendering on macOS
* The permalink style has been changed to use "#" instead of an icon.
* Definition list now have a double colon after the definition term.
* Changed the style of footnote links on small screens to make them easier to click.

### Fixes
* Horizontal scrolling on a code block, math black, or table can no longer accidentally open the drawer.
* The client-side scripts are now more robust to missing HTML elements. This should ease theme customization.
* Setting `sitemap: false` will now also add a `noindex` meta tag to prevent accidental search engine indexation.
* Fixed back button not showing when opening in standalone mode for the first time.
* The menu icon is now hidden when the drawer is disabled.
* Using `no_drawer: true` is now working properly on cover pages when `no_push_state: false` is set.
* Reduced the amount of pixels cached by the `will-change` optimization and fixed the corresponding warning in Firefox.


## v8.5.2
August 31 2019
{:.heading.post-date}

* Fixed breaking builds due to name collision when upgrading to 8.5
  This is caused when using both `_plugins/jekyll-replace-imgs` and the new `jekyll-replace-img` ruby gem.
  I recommend deleting `_plugins/jekyll-replace-imgs` when using the `jekyll-replace-img` gem.
  Note that this is an optional plugin.
* Fixed `nomodule` script loading for Safari 10.1
* Fixed [#176](https://github.com/hydecorp/hydejack/issues/176)

## v8.5.1
Aug 1 2019
{:.heading.post-date}

* Fixed minification bug

## v8.5.0
Aug 1 2019
{:.heading.post-date}

### Changed
* [PRO] The theme now matches the operating system's dark mode.
* Scrolling down on a page with an open drawer will now close the drawer
* Reloading a cover page after the drawer has been closed will now open the page with the drawer closed
* Removed JavaScript-based web font swapping in favor of using `font-display: swap`
* Darkened font color in dark mode to reduce contrast
* Updated KaTeX to the latest version
* Increased the durations of various animations slightly
* Now using [`jekyll-replace-img`](https://github.com/qwtel/jekyll-replace-img) instead of custom code in `_plugins` folder
* Added a separate, smaller JavaScript bundle for modern browsers

### Added
* Added support for figure captions on code blocks
* Added `keybase` to social media icons
* [PRO] There's now a forward button when using the theme as a PWA

### Fixed
* Fixed print layout when dark mode is enabled
* Using `CSSTransformValue` correctly
* Fixed a minor style bug for dates
* Fixed a bug where light mode would flash when loading a page in dark mode
* Minimal support for IE11

## v8.4.0
Mar 9 2019
{:.heading.post-date}

* Added support for `noindex` property in the front matter
* Fixed ordering of selected projects/post in welcome layout
* Updated dependencies

## v8.3.0
Feb 18 2019
{:.heading.post-date}

This version adds new options to increase production build speed. Read [this post](hydejack/_posts/2019-02-18-improving-site-build-speed.md) for details.

### Added
* Added `no_page_style` config option to increase site build speed.
* Added `menu` config option to increase site build speed.
* Copying math will now add the LaTeX source to the clipboard.

### Changed
* Upgraded KaTeX to version 0.10.0.

## v8.2.0
Feb 1 2019
{:.heading.post-date}

* Added support for custom `related_posts` 
* Removed footer from print layout
* Increased photo size in print resume 
* Improved `welcome` layout generation performance
* Fixed a bug that prevented scrolling to headlines with non-ascii characters (Thanks [@ForelaxX](https://github.com/ForelaxX))


## v8.1.1
Sep 1 2018
{:.heading.post-date}

### Fixes
* Fixed an issue that prevented the drawer from working on iOS 10.
* Changing the page via push state will now also update the `link[rel=canonical]` tag.
* Changing the page via push state will now also update the `meta[name=description]` tag.
* Fixed an issue that prevented the JS from building on Netlify.

## v8.1.0
Aug 18 2018
{:.heading.post-date}

This release adds Dark Mode for Hydejack PRO customers.

### Breaking
* Removed cookie banner from free version
* Removed offline support from free version

In an attempt to make the PRO offering more appealing, I'm removing features that arguably should have never been included in the free version.
As software licenses go, nobody is stopping you from using the old code, but updates will no longer be included.

### Changed
* The cookies banners is now showing at the bottom of the page and its background color is no longer transparent to increase visibility
* Changed the default syntax theme from "GitHub" to "Atom One Light"
* Adapted `figure` CSS class to accommodate different children, not just `img`s
* `video` tags now have a `max-width` of 100%
* Increased margin before headings to `5rem`, up from 4
* Increased margin of `hr` elements.
* Cookies banner can now be enabled without using Google Analytics
* Clicking the cookie banner "Okay" button will now fire a `hy--cookies-ok` event on `document`, so that custom analytics solutions can plug in.
* All Google Analytics code has been removed from Hydejack's core and moved to `_includes/body/analytics.js`.
* All Disqus code has been removed from Hydejack's core and moved to `_includes/comments.html` and `_includes/my-comments.html`.
* Using CSS Custom Properties instead of SASS variables for certain properties to enable style customization using only CSS.
* Added shadow to sidebar
* Navbar is longer positioned `fixed`

### Added
* [PRO] Added Dark Mode
* `border` CSS class


## v8.0.0
Jul 16 2018
{:.heading.post-date}

So far Hydejack has been a decent Jekyll theme, but with v8 it really starts stand out among the competition: Beautiful and unique landing pages, lazy-loading images, and experimental offline support are just the most prominent new features.

### Breaking
* The expected format for sidebar images has changed.
  A sidebar image should now be a full-screen ~16:10 image.

  Comment: The sidebar can now be fully extended on desktop, which generally requires a large landscape image to fill the entire window.
  To save bandwidth, you can blur the image on the left and right edges and save it as JPG.

* The `about` and `welcome` layout no longer prepend the content with the author information.
  Instead, the author info can be shown by adding the `<!--author-->` marker to the top of the file. You can also place it anywhere else.

  Comment: Showing the author description on the top of the `welcome` and `about` layouts felt like an imposition and was a left-over from when I was developing Hydejack primarily for myself.

* [PRO] The `welcome` layout no longer adds recent posts and projects to the bottom of the page. Instead, they have to be explicitly set using the `<!--posts-->` and `<!--projects-->` markers. The `content_separator` front matter opton is now ignored.

  Comment: The old behavior felt arbitrary, and `<!--more-->` wasn't a good name to be replaced with recent projects ands posts.

* Setting the accent color and sidebar image for an entire category/tag/author is no longer possible.
  To achieve a similar effect, use [Front Matter defaults][ffd] instead.

  E.g. to set the accent color and image for every post in the `hydejack` folder, use:

  ~~~yml
  defaults:
    - scope:
        path:         hydejack
      values:
        accent_color: rgb(38,139,210)
        accent_image: /assets/img/hydejack-bg.jpg
  ~~~

  Comment: The code to find the color for a given page was complicated and slow (potentially iterating all categories/tags to find the right one).

### Changed

* The drawer now responds to mouse inputs.
* The default heading font is now less bold. To restore the old behavior, edit (create if it's missing) `_sass/my-variables.scss` and add `$font-weight-heading: 700;`.
* Hydejack now uses lazy-loading hy-img tags instead of regular `img` tags.
  To revert to using regular images, set `hydejack.no_img` in the config file to `true`.
* Cookie consent is now stored as a cookie (instead of `LocalStorage`) and expires after 1 year.
* Scrolling to a fragment link is now smooth.
* Font loading now works differently, and will be cancelled on slow connections.
* The sidebar content is now centered.
* The sidebar will now show the site's logo, which can be set in the config file under the `logo` key.
* [PRO] Updated embedded Bootstrap to v4.
* [PRO] Project cards now throw a shadow instead of having a border.

### Added
* Pages can now have the `cover` key in the front matter.
  When set to `true`, the sidebar will be opened when visiting the page directly.
  E.g. <https://hydejack.com/>{:.no-push-state}

* Added a `_plugin` that automatically replaces `<img>` tags with lazy-loading `<hy-img>` tags. If you don't want images to load lazily, delete or rename the `_plugins` folder.
  Note that this plugin will never run when building the site on GitHub Pages.

  To get the most out of this plugin, it is recommended to provide the width and height of the image, e.g.

  ~~~md
  ![Some image](assets/img/some-img.png){:width="800" height="600"}
  ~~~

  This will cause hy-img to render a placeholder of 800 by 600 `px`, preventing the document height from changing after the image has finished loading.

* Added experimental offline support via Service Workers. Use with care!
  For details, [read the docs](docs/advanced.md#enabling-offline-support).

* Added the `figure` CSS class, which allows images to have nicer-looking captions. E.g.

  ~~~md
  ![An image with a caption](https://via.placeholder.com/800x50){:.lead}
  A caption to an image.
  {:.figure}
  ~~~

* Clicking on a footnote will give its corresponding text a subtle highlight.

* [PRO] Projects can now have an optional `end_date` field in the front matter.
  The `date` is treated as the start date in this case.

### Fixes
* The back button now works in combination with fragment links.

[ffd]: https://jekyllrb.com/docs/configuration/#front-matter-defaults

## v7.5.1
Apr 2 2018
{:.heading.post-date}

### Changed
* Moved from browserify to webpack
* Updated ruby dependencies
* Updated JS dependencies
* Updated hy-push-state and hy-drawer to latest versions

## v7.5.0
Dec 18 2017
{:.heading.post-date}

### Added
* Added secondary `legal` nav in footer:

  ```yml
  # file: `_config.yml`
  legal:
    - title: Cookies Policy
      href:  /cookies-policy/
    - title: Foobar
      href:  https://foobar.com/
  ```

* The "heading permalink" can now be configured via `strings.yml`:

  ```yml
  # file: `_data/strings.yml`
  permalink:      Permalink
  permalink_icon: icon-link
  ```

* Sections on resume layout can now be rearranged, e.g.:

  ```yml
  # file: `resume.md`
  left_column:
    - work
    - volunteer
    - education
    - awards
    - publications
    - references
  right_column:
    - languages
    - skills
    - interests
  ```


### Fixed
* Fixed a bug that caused `<sup>` tags to render as regular text ([#52](https://github.com/hydecorp/hydejack/pull/52))
* Fixed a bug that caused Disqus to load the same thread on all pages ([#53](https://github.com/hydecorp/hydejack/pull/52))
* Fixed a bug that prevented Disqus comments to be loaded on sites that didn't cause scroll events
* Fixed a bug that caused Disqus to be loaded over HTTP instead of HTTPS.
* Fixed a bug that caused an extra space in URLs ([#55](https://github.com/hydecorp/hydejack/pull/55)).
* Comments no longer show up in the print version of the page.

### Other
* Set base font to `11pt` in print layout.
* Set resume print layout to use 2 columns (A4 sheet)

## v7.4.2
Dec 1 2017
{:.heading.post-date}

### Fixed
* Dramatically improved resume print layout.
  It is now much less likely that there will be page breaks within logical units.
* Fixed a bug that cause the page to break when setting `no_drawer`.
* Fixed a bug that cased the "Random Posts" heading to appear, even when there are no posts to show

## v7.4.1
Nov 27 2017
{:.heading.post-date}

### Fixed
* Fixed storing user-related data before accepting cookies.
* Fixed tab order of cookie banner, so keyboard users can access it more easily.
* Accepting cookies no longer causes a page reload in some browsers.
* Fixed appearance of the okay button in the free version.
* Menu icon now useable while the cookies banner is active.
* Loading icon is now visible while the cookies banner is active.
* Removed cookies banner from print layout.
* Removed inline styles from cookie banner.

## v7.4.0
Nov 25 2017
{:.heading.post-date}

### Added
* Allow markdown in copyright string
* Added `theme_color` front-matter property to micro-manage the value of the the `theme-color` meta tag.
  When not set, will use `accent_color`.
* Added `theme_color` site setting, to set the value of `themeColor` in the app manifest.
  When not set, will use `accent_color`.
* Added `cookies_banner` setting:

  ~~~yml
  # file: `_config.yml`
  hydejack:
    cookies_banner: true
  ~~~

  Enabling this setting will show a notice at the top of the page to new visitors.
  You can change the wording of the notice in `_data/strings.yml`
  with the `cookies_banner.text` and `cookies_banner.okay` keys:

  ~~~yml
  # file: `_data/strings.yml`
  cookies_banner:
    text: This site uses cookies.
    okay: Okay
  ~~~

### Fixed
* Drawer no longer resizes/repaints in iOS Safari (iPhone) and Chrome for Android when the address bar autohides.
* Fixed a bug that caused the drawer flicker/open unexpectedly when scrolling in mobile browsers.
* Fixed how `image` works when using the `jekyll-seo-tag` plugin.

### Design
* Changed how line breaks work in resume layout
* Changed margins of horizontals lines

### Other
* Updated docs
* Updated posts


## v7.3.0
Nov 17 2017
{:.heading.post-date}

### Added
* Allow markdown content on `projects` layout.
* Renamed `big_project` option on projects to `featured` (`big_project` still works)

### Fixed
* Fixed default font weights
* Fixed hard-coded `/projects/` URL in project layout
* Link to feed.xml is only generated when using the `jekyll-feed` plugin


## v7.2.0
Nov 13 2017
{:.heading.post-date}

### Added
* Added `_sass/my-variables.scss` file, which you can use to selectively override SCSS variables.
* Font weights can now be configured via SCSS variables:
  * `$font-weight` for normal font.
  * `$font-weight-bold` for `strong` tags and similar.
  * `$font-weight-heading` for headings.

### Design
* Message boxes will no longer span the full width, even with the break layout feature enabled.
* Increased space between project card rows, so they look less like a brick wall.

### Fixes
* Reduced the draw range of the drawer on iOS, so that a larger portion of the screen is available for zooming (a11y).
* Default images are now optimized, so they are no longer flagged by Google PageSpeed Insights and similar tools.
* Query parameters are no longer used for cache busting.
  Instead, the version number is no part of the file name for the CSS and JS resources.


## v7.1.1
Nov 3 2017
{:.heading.post-date}

### Fixes
* Fix IE11 feature detection

## v7.1.0
Nov 2 2017
{:.heading.post-date}

### Changed
* Renamed `no_description` to `hide_description`.
  Since this feature isn't yet documented outside of the change log, the old name *will not* continue to work.
* When providing images to `image`, `image.path`, `image.src`, `image.srcset` and `accent_image `,
  it is no longer necessary to prepend the url with the `baseurl` of the site,
  e.g. values like `accent_image: /assets/img/sidebar-bg.jpg` are now valid.
* Limited scope of `a` and `img` styles to content areas.
* Upgraded KaTeX to v0.8.3
* Upgraded `jekyll-relative-links` to v5.0.1

### Fixes
* `font` and `font_heading` are now properly set when using the `no_inline_css` option [#47](https://github.com/hydecorp/hydejack/issues/47).
* Fixed default values for `image` and `logo` that were referring to non-existing images.
* Added missing JS dev dependencies.

### Content
* Updated documentation
* Updated index, download, about and README pages.

## v7.0.1
Oct 27 2017
{:.heading.post-date}

### Fixes
* Removed readme files from `assets` that would show up as pages when building on GitHub Pages [#42](https://github.com/hydecorp/hydejack/issues/42).
* Disabled push state on Firefox for iOS
* Changed some default settings in `_config.yml`

### Content
* Updated documentation

### Removed
* Removed outdated example script in `my-scripts.html`

## v7.0.0
Oct 24 2017
{:.heading.post-date}

### License Change
The *free version* of Hydejack is now [GPL-3.0] licensed, which is a more restrictive license than MIT (but still *Open Source*).
This was necessary because the two major components that make up Hydejack,
[hy-push-state](https://hydecorp.github.io/hy-push-state/){:.external} and
[hy-drawer](https://hydecorp.github.io/hy-drawer/){:.external},
are now GPL licensed in turn.

How will this affect you?
* If you bought the *PRO version* you are not affected at all.
* You can continue to use previous versions of Hydejack according to their license (MIT).
* If you upgrade, keep the source code in a public repository and make sure you include the new `LICENSE.md` file.
  DO NOT publish the *new code* with an *old license*.
* If you upgrade and make changes to the source code, you are required to make those changes available to the public
  under a GPL-3.0 compatible license.

The full license text is available [here][GPL-3.0].
You can read a summary on [tl;drLegel](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)).

If this change is not acceptable to you, DO NOT upgrade or consider [buying][buy] a [PRO license][PRO-license].

Note that the above does not constitute legal advice.

### Breaking
This is a major release, but almost all options and APIs that were described in the docs continue to work.
Some names have changed and are no longer mentioned in the docs, but they are still part of the code and continue to work.

That being said, you should be aware of these (small) breaking changes:

* The favicon is now located in `assets/icons`. To change the favicon of the page, edit `favicon.ico` (png) in the folder.

* Changed the way tables work, so that they do the right thing more often.
  Tables are now scrollable by default, but small tables are no longer stretched to span the full width.
  Setting `scroll-table` on a larger table is sill recommended, as it will set `white-space: nowrap`.

* Autogenerated ids for posts now look like `post-2017-01-01-my-title` instead of `post-2017/01/01/my-title`.

* Event names described in the scripting chapter have changed from `y-push-state-*` to `hy-push-state-*`,
  except `y-push-state-animationend`, which has been removed. See the [docs][pstate] for more.

[pstate]: docs/scripts.md#registering-push-state-event-listeners

### Changes
* `image` has been renamed to `accent_image`, but `image` continues to work unless you add the `jekyll-seo-tag` plugin.
  This change was necessary because `jekyll-seo-tag` uses the `image` keyword to set the thumbnail image of a page.
  While it *may* be desirable to use the same image for both the sidebar and the thumbnail,
  the new preferred way to set sidebar images is by using the `accent_image` key.

* `color` has been renamed to `accent_color` to be consistent with the new `accent_image` key, but `color` continues to work.

* Various options that do not make sense outside the context of Hydejack (like `no_push_state` or `no_drawer`)
  have been moved under a common `hydejack` key. However, the old options continue to work.

  ```yml
  hydejack:
    no_push_state: false
    no_drawer: false
  ```

* All plugins (gems) are now optional.
  The gem-based version of the theme no longer uses any plugins by default,
  while the download version follow a "batteries-included" approach and enables some by default.

* Links to the `/assets/` folder are no longer intercepted by the push state features,
  which means clickable images and download links should work fine now.

* Reader views in Firefox and Safari have an easier time recognizing the main content.

* [Internal] No more `<style>` tags in the `body`.

* [Internal] Content that is generated via JS (error pages, loading, etc...) is now cloned from `template` tags,
  where it is easier to modify (but before you do, check out the new `_data/strings.yml` file).

* [Internal] Changed how CSS code is organized.
  Previously there were two versions of each CSS file for each 'topic',
  one containing core styles to be inlined into the page, the other containing those fetched asynchronously via link tag.
  Now there is only one file per topic, with the parts to be inlined/linked marked with comments.
  A script has been added to "split" the CSS into the inline/link parts.
  Note that this does not affect your `my-*.scss` files.

* [Internal] Many CSS classnames have changes, specifically those that would conflict with Bootstrap class names.

* [Internal] Many files in `_includes` have been reorganized, specially `head.html` and `body.html` have been broken up into smaller parts.

* [Internal] The `y-drawer` component (MIT) has been replaced with the `hy-drawer` component (GPL-3.0).

* [Internal] The `y-push-state` component (MIT) has been replaced with the `hy-push-state` component (GPL-3.0).

### Added
* The theme now has support for the [`jekyll-seo-tag`](https://github.com/jekyll/jekyll-seo-tag) plugin.
  To use this gem, make sure you use the latest `Gemfile` and `Gemfile.lock` and run `bundle install`.
  In your config file, add `jekyll-seo-tag` to `plugins` (formerly called `gems`).

* All texts that were previously hard-coded into the theme can now be configured via `_data/strings.yml`.
  This makes it possible to change certain phases without having to change source files,
  but it should also make it easier to use Hydejack with other languages.
  Time and date formats can also be configured, using Ruby's
  [format directives](http://ruby-doc.org/core-2.4.1/Time.html#method-i-strftime).

* The `lang` key now accepts values like `en-us` or `de_AT`.

* Made the site "mobile web app capable"
  * Added `manifest.json` for "Add to Homescreen" support on Android
  * Added `theme-color` meta tag that matches the `accent_color` and changes dynamically
  * Added `apple-mobile-web-app-*` meta tags
  * Added `ieconfig.xml` for "Pin to start menu" support in Windows 10.
  * Old icons and new ones are now located in `assets/icons`.

* Hydejack now marks up content as *structured data*, to the extent possible.
  The resume is provided as <https://schema.org/Person>
  as well as [hCard](http://microformats.org/wiki/hcard),
  while projects are provided as <https://schema.org/CreativeWork>.
  You can use the [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/) to see the results.

  If you do not want to expose your data in machine-readable form, you can set the `no_structured_data` flag to `true` in your config file.

  ```yml
  hydejack:
    no_structured_data: true
  ```

  Note that this only applies to the resume and project layout, not the data generated by by `jekyll-seo-tag`
  (Facebook Open Graph and Twitter cards).

* [PRO] Added "big projects". You can make a project card span the entire content width (instead of half),
  by setting `big_project` to `true` in the project's front matter.

* [PRO] The welcome layout now has a `content_separator` option,
  which allows content to move below the "Selected/Latest Projects" and "Selected/Latest Posts" section.
  Usage:

  ~~~md
  ---
  layout: welcome
  content_separator: <!--more-->
  ---

  Content above

  <!--more-->

  Content below
  ~~~

* [PRO] The PRO version now has built-in support for [Tinyletter](https://www.tinyletter.com).
  To show a newsletter subscription box below each post, set `tinyletter: <username>` in your config file.
  If you want to use a different mailing provider, you can add your own form in `_includes/my-newsletter.html`.

* [PRO] The PRO version now includes styles for input elements, using the same CSS class names as Bootstrap.
  Check out the [Bootstrap docs](https://getbootstrap.com/docs/4.0/components/forms/) to learn more.

* [PRO] Added links to random posts at the bottom of each post. This can be beneficial for search engine rankings and content discovery.
  You can remove them with the new `post_addons` option (see below).

* [PRO] If a `endDate` is missing in your `resume.json`, it will render as "\<startDate\> -- *present*".
  You can change the wording in the new `strings.yml` file.

* Added support for [`jekyll-avatar`](https://github.com/benbalter/jekyll-avatar).
  If this plugin is enabled in your config file, it will show the avatar of your github account
  (`author.social.github`, `author.github.username` `author.github`).

* Added support for [`jekyll-gist`](https://github.com/jekyll/jekyll-gist).

* You can now add links to external sites in the sidebar.
  Create a file like `something.md` and add a `title`, `menu`, `order` (optional) and a `redirect_to` field to the front matter, e.g.:

  ```yml
  ---
  title: External
  menu: true
  redirect_to: https://example.com/
  ---
  ```

  You may combine this with the [`jekyll-redirect-from`](https://github.com/jekyll/jekyll-redirect-from) plugin
  to generate a redirect page, but this is optional.

* You can now configure the order of complementary content below posts and projects.
  By default, Hydejack will show the author first (if any), the newsletter box next (if any),
  and related posts/projects last.

  ```yml
  hydejack:
    post_addons:    [about, newsletter, related, random]
    project_addons: [about, newsletter, other]
  ```

  To change the order in the output, change to order in the array.
  You can also drop entries from the output by removing them from the list.

* Added an error page that is shown when client-side network errors occur. It contains a link to retry loading the page.
  Previously, the browser's default error page would have been shown.

* Added `hide_description` option to pages to prevent the content of `description` fields to show up in the output.
  This allows you to use the `description` field in the front matter to set descriptions for search engines and sharing on social media,
  without having to worry about the output.

  You can activate this for all pages by adding to your config file:

  ```yml
  defaults:
    - scope:
        path: ''
      values:
        hide_description: true
  ```

* Added a new option called `no_inline_css`.
  When `true`, Hydejack will generate a single CSS file to be fetched (synchronously) via `link` tag,
  instead of inlining half and including the rest via `link` tag.

  This option *may* be useful when serving content over HTTP/2, but you should perform your own tests.
  For more on inlining CSS, [see this](https://varvy.com/pagespeed/inline-small-css.html).

  ```yml
  hydejack:
    no_inline_css: true
  ```

* Added `dns-prefetch` links to Google Fonts and Google Analytics domains to further boost page load speed.
  These are only included when using Google Fonts/Analytics.

* You can now define an arbitrary CSS `background` for the sidebar instead of just images, e.g.:

  ```yml
  accent_image:
    background: 'linear-gradient(to bottom, rgba(35,62,76,1) 0%,rgba(60,146,158,1) 50%,rgba(213,213,212,1) 100%) #4fb1ba'
  ```

* Category and tag pages can now have arbitrary content (to be shown *above* the list).

* Links can now be marked for FLIP animations by adding the `flip-title` class. Use this for links that have
  the exact same text as the title of the page they are linking, e.g. `[NOTICE](NOTICE.md){:.heading.flip-title}`.


### Performance
* Reduced building time during development.
  Roughly 50% of the time was spent rebuilding the inline CSS, which is now built once and included via `link` tag.
  Production builds still inlines CSS, so the building speed remains unchanged.
  For more on how to improve building speeds, [see here](docs/writing.md#a-word-on-building-speeds).

### Design
* The default background image is no longer anti-selling the theme...

* Code blocks, math blocks and tables now use as much space as there is available on the screen.
  Limiting the line length makes sense for paragraphs, as they are more difficult to read
  when they span the entire length on a large display,
  but it is less useful for content, like tables, long formulas or code.

  If you do not like this change, you can set `no_break_layout` to `true` in your config file.

  ```yml
  hydejack:
    no_break_layout: true
  ```

* Margin below code blocks, math blocks and tables increased from `1rem` to `2rem`.

* Gray text now has a higher contrast ratio:
  I don't want anybody to ["suffer from design"](https://lostinmobile.com/2016/10/25/im-suffering-from-design/).

* Reduced the number of responsive breakpoints.

* Added a hover effect on project images.

* On mobile, footnotes will be shown as [1] instead of superscript, making them easer to tap.

* The sidebar now has a subtle shadow on mobile, to indicate that it can be drawn from the side.

* The sidebar now has less margin on the sides.

* The sidebar now fits 5 social media icons, up from 4.

* The `description` in the sidebar now has a smaller font size when it is longer than 100 characters.
  This is to encourage writing a longer `description` for search engines (~160 characters).

* `h1`, `h2` and `h3` headings now have different `line-height`s to improve readability when they span multiple lines.

* Marks on external links are now less opaque, but have a hover effect.

* More responsible usage of `font_heading` in resume layout.

* When hovering over a headline, a `#` link will appear, so that readers can link to individual headlines.

* Changed the loading spinner to use a single icon instead of several animated `div`s.

### Fixes
* When linking to an internal document that doesn't match the regular content structure,
  the 'hot replacement' will no longer get stuck, and reload the page instead.
* Fix jumping to `#` links after navigating to a new page.
* Fix jumping to `#` links in MS Edge.
* Fixed a bug on iOS were scrolling was blocked after closing the drawer.
* Fixed a bug where the image used during the project FLIP animation would note be replaced with the higher resolution image
  after the animation in certain browsers.
* The drawer is now less likely to be opened by accident.

## v6.6.1
Aug 10 2017
{:.heading.post-date}

* Fixed sending incorrect paths to Google Analytics.
  In previous versions, Hydejack would always send the URL of the initial page for all subsequent page views.
  Thanks [@dannydwarren](https://twitter.com/dannydwarren) for pointing this out.
* Fixed `tagline` not showing up in the title.

## v6.6.0
Aug 7 2017
{:.heading.post-date}

* Dependencies from external domains have been removed
  (with the exception of those that are explicitly defined and optional: Google Analytics, Google Fonts and Disqus).
  Instead, they are now located in the assets folder and managed via Bower.
* KaTeX is no longer loaded on pages that do not contain math blocks.
* `preload` link tags no longer use `onload`. Instead callbacks are registered within a script tag.
* Code in code blocks is no longer smaller sized than inline code.
  To undo this change, open (or create) `_sass/my-inline.scss` and add the following:

  ~~~css
  pre code { font-size: .75em; }
  ~~~

* Added `_includes/my-head.html`, to make it easier to add things to the `<head/>` without modifying the source.
  This is especially useful when using the gem-based version of the theme.

## v6.5.0
Jul 27 2017
{:.heading.post-date}

This maintenance release includes various quality-of-life improvements when using the gem-based version of the theme.

### Added
* Hydejack now uses additional Jekyll plugins by default, which make working with GitHub more convenient.
  They have been added to the `Gemfile` and `_config.yml`.
  Note that existing users need to update their `_config.yml`:

  ~~~yml
  gems:
    - jekyll-default-layout # new
    - jekyll-feed
    - jekyll-optional-front-matter # new
    - jekyll-paginate
    - jekyll-redirect-from
    - jekyll-relative-links # new
    - jekyll-sitemap
  ~~~

* Added `licenses` folder that includes the full license texts of licenses mentioned in `NOTICE.md`.
* You can, once again, define the author in `_config.yml`.
  Using `_data/authors.yml` is still recommended (and takes precedence),
  but this option is more convenient when setting up a quick (project-) page using the gem-based theme.
  Also, a mini-version of `_data/social.yml` can be provided as part `_config.yml`, e.g.:

  ~~~yml
  author:
    social:
      github: https://github.com/hydecorp/hydejack
      npm: https://www.npmjs.com/package/hydejack
      download: https://github.com/hydecorp/hydejack/archive/v6.5.0.zip

  data_social:
    github:
      name: GitHub
      icon: icon-github
    npm:
      name: npm
      icon: icon-npm
    download:
      name: Download
      icon: icon-box-add
  ~~~

* A download icon has been added to the default icon font and `_data/social.yml` has been updated.
* Added `_includes/my-scripts.html`, `_sass/my-inline.scss` and `_sass/my-style.scss` to make it easier to add custom scripts and styles without modifying the source. This is especially handy when using the gem-based version of the theme.

### Changed
* Loading web fonts now starts earlier and content download no longer blocks
  swapping out the fallback font for the new font.
  Previously, a page containing lots of images could have delayed displaying the web fonts significantly.
* The `home` layout no longer contains a message suggesting that you don't use it.
* The `home` layout now shows up to 5 blog posts and up to 5 pages blow the regular content.
* The version history has been moved from `docs/<version>/versions.md` to `CHANGELOG.md`.
* The license notices have been moved from `docs/<version>/licenses.md` to `NOTICE.md`.
* Updated gem and npm dependencies

### Design
* The default font has been changed from "Noto Serif" to "Noto Sans".
  If you have a `font` entry in `_config.yml`, this will have no effect.
* `nap.jpg` is no longer used as default background image in the gem-based theme.
* The sidebar content width is now limited to the width of the sidebar (this only effects large screens).
* Project cards and pagination buttons now have slightly rounded borders for a less "rigid" look.

#### How to restore the old styles
If you would like to use the old font, add the following to `_config.yml`:

~~~yml
font_heading: "'Roboto Slab', Helvetica, Arial, sans-serif"
font:         "'Noto Serif', Georgia, serif"
google_fonts: "Roboto+Slab:700|Noto+Serif:400,400i,700,700i"
~~~

If you were relying on the default setting for the background image, add the following to `_config.yml`:

~~~yml
image: /hydejack/assets/img/nap.jpg
~~~

Note that you have to replace `/hydejack` with your `baseurl`.

To restore the old sidebar, open (or create) `_sass/my-inline.scss` and add the following:

~~~css
@media screen { .sidebar-sticky { left: 2rem; max-width: none; } }
~~~

To remove the border radius, open (or create) `_sass/my-inline.scss` and add the following:

~~~css
.card, .pagination-item { border-radius: 0!important; }
~~~

## v6.4.1
Jun 23 2017
{:.heading.post-date}

* Fix invalid color hex

## v6.4.0
Jun 21 2017
{:.heading.post-date}

In this release I've added a "Other Projects" section to the bottom of each project page,
making it easier for users to navigate through your collection and discover other projects.
Also, it's now possible to display larger (data-) tables that were previously cut off (especially on mobile devices).

For more on how to add tables, see the new section in [docs/writing][writing].

Smaller changes include a reduced usage of horizontal lines and a more "semantic" use of `hr` elements.
Specifically, the semantics of the resume layout have been improved.

### Minor
* Added "Other Projects" section to the bottom of the project layout (similar to "Related Posts")
* Added CSS classes that make viewing larger (data-) tables possible
* Added section on tables to [docs/writing][writing]
* Reduced use of `<hr/>` elements, using CSS borders instead.
* Improved semantic HTML of resume
* Follow favicon best practices and include example icons
* Added `no_google_fonts` option

### Design
* Reduced number of horizontal lines, making many layouts feel less "cluttered" (esp. `blog` layout)
* Made link hover styles consistent across the board
* Visually separated `thead` and `tbody` and `tfoot` within tables.
* Changed RSS and email icons
* Removed top margin for consecutive headings, e.g. when using `h3` immediately after `h2`.

### Fixes
* Fixed bug that caused inline math to be moved to the end of a paragraph when dynamically loading a page.
* Fixed bug that caused layout to break in IE11.
* Fixed bug that caused the project animation to "jump" when using long project titles.
* No more empty attributes on `img` tags.

## v6.3.0
Jun 6 2017
{:.heading.post-date}

This release makes including third party plugins easier.
Until now, the push state approach to loading new pages has been interfering with embedded `script` tags.
This version changes this by simulating the sequential loading of script tags on a fresh page load.

This approach should work in a majority of cases, but can still cause problems with scripts that can't be added more than once per page.
If an issue can't be resolved, there's now the option to disable push state by setting `disable_push_state: true` in `config.yml`.

### Minor
* Support embedding `script` tags in markdown content
* Add `disable_push_state` option to `_config.yml`
* Add `disable_drawer` option to `_config.yml`
* Rename syntax highlighting file to `syntax.scss`
* Added [chapter on third party scripts][scripts] to documentation

### Design
* Add subtle intro animation
* Rename "Check out X for more" to "See X for more" on welcome\* page
* Replace "»" with "→" in "read more"-type of links

### Fixes
* Fix default color in gem-based theme

## v6.2.0
May 29 2017
{:.heading.post-date}

* Changed default color and image
* Updated demo content
* Finalized welcome and project page
* Color is now fading correctly when no background image is provided
* Added exemplary usage of excerpt separator
* Removed social media links from `welcome` and `about` page
* Updated dependencies

## v6.1.1
May 23 2017
{:.heading.post-date}

* Add support for `lang` in front matter and `_config.yml`.
* Add support for `keywords` in front matter and `_config.yml`.

## v6.1.0
May 15 2017
{:.heading.post-date}

* Updated JS dependencies
* Added version history and licenses to documentation
* Fixed print layout

## v6.0.0 (JavaScripten)
May 3 2017
{:.heading.post-date}

Hydejack has always featured a JavaScript-heavy sidebar, but other than that, JS has been used sparingly. This changes with this release, which adds a ton of (optional) code that changes the feel of the theme dramatically.

### Major
Pages are now loaded and swapped through JavaScript. This has a number of effects. First of all, it looks cool, but the animations aren't just about aesthetics: They also help to hide the network time of fetching the next page, making the entire site feel faster. At the same time, the FOUC introduced in the last release will no longer occur (except on the initial page load).

* Most JS is now unified in the `_js` directory and written in ES2016.
* The `blog-by-tag` layout has been renamed to `list`.
* `public` folder has been renamed to `assets` to make the theme compatible with Jekyll's gem-based themes.
* Tags are now supported via Jekyll Collections instead of `_data`.
* The sidebar can now add links to all kinds of pages.
* Categories are now supported.
* Author information moved to `_data/authors.yml`
* Added support for multiple authors.
* Using `jekyll-feed` plugin (supported on GitHub Pages) instead of custom solution.
* Added `about` layout.
* Added `not-found` layout.
* Added `redirect` layout

See the [the migration guide][migration] for instructions on how to upgrade.

### Minor
* The "accent" font (heading font) is now used for all headings. This gives the theme a "bolder" look and was necessary for the animation: link => heading.
* Changed default text font from "PT Serif" to "Noto Serif".
* Added [CSS classes][writing] for styling markdown content.
* Links have a new style. They now always display an underline to make the choice of the link color less critical (darker colors were hard to distinguish from regular text).
* Made social media icons larger and easier to tap.
* Social media icons are now also part of the "about" sections of a post.
* Added support for a copyright notice at the bottom. Can be set via the config variable `copyright`.
* Changed responsive breakpoints and added support for very large displays.
* The site is now printable.
* The `blog` layout now only shows the excerpt instead of the full post.
* Links to external pages are now marked with a symbol.
* Added margin above social media icons to prevent accidental tapping
* Added gem files so that `bundle install` and `bundle exec jekyll serve` work
* Disabled HTML minification when running via `jekyll serve`
* Added dingbat to signal end of post

### Fixes
* Related posts is no longer blank for posts that do not belong to a category.
* Footnotes now use the text version of "leftwards arrow with hook" instead of the emoji on iOS.
* Text is no longer invisible while waiting for Google Fonts to load.
* Always show scrollbar to prevent layout "jumps"

## v5.3.0
Oct 1 2016
{:.heading.post-date}

a11y improvements
- Use HTML5 semantics tags + roles
- Don't set `maximum-scale=1`
- Fix bug with `sr-only` class

Math support improvements
- LaTeX syntax errors will no longer prevent correct math blocks from being rendered
- LaTeX syntax errors logged to console

## v5.2.0
Sep 29 2016
{:.heading.post-date}

Prevent structural FOUC

## v5.1.0
Sep 28 2016
{:.heading.post-date}

Cross-browser compatibility improvements:
- Added features tests
- Fixed layout in IE 10 and 11
- Disabled stylesheets and JS in IE 9 and below.

## v5.0.0 (The Fast One)
Sep 16 2016
{:.heading.post-date}

This major release increases page load speed dramatically. The page now scores roughly 90/100 on [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fqwtel.com%2Fhydejack%2F) (up from ~50) and has a high score on similar tools.

Most importantly, the critical rendering path is no longer blocked by loading styles or scripts, meaning the site becomes visible faster.

Page load speed matters to Google, but is also _very_ apparent to visitors with slow internet connections.

However, as a side effect of these optimizations, the site now has a visible [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).
Future versions might address this, but it is the currency in which loading speed is being payed for and can not be fully avoided.

### Major
- HTML, CSS and JS served minified.
- JS downloading starts only after the rest of the page is renderd.
- Critical CSS (above-the-fold) is inlined into the document, the rest is fetched later.

In order to minify the CSS and make it more modular it has been rewritten in SCSS.

### Minor
- Colored focus outline in page color
- Tabindex for tab navigation
- Social media icons easier tappable with finger

### Trivia
Not strictly part of the release, but the images have been blurred to increase text readability and help with loading speed as well (burred images get compressed by JPG much better).

## v4.0.1
Sep 11 2016
{:.heading.post-date}

Fix per-page color and image

## v4.0.0 (Social Media Impocalypse)
Aug 30 2016
{:.heading.post-date}

### Breaking
- Structure of `_config.yml` has changed
  - Social media usernames are now located under `author: social: <platform>: <username>`.
  - `disqus` is now a top-level entry (moved from `author`).
  - Now has `font`, `font_accent` and `google_fonts` fields that are mandatory.
- Now defaults to the `blog` layout, old style is available via `blog-by-tag` layout, see `archive.html`.

### New features
- Added _a lot_ of social media icons, configurable via `_config.yml`.
- New `blog` layout. Classic, paginated.
- Fonts are configurable via `_config.yml`.

### Design
- Link underlines are now fixed-sized for all font sizes (no thicker lines for headlines, etc)

### Fixes
- Correctly set the meta description field using either the `description` field or `post.excerpt` as a fallback (used to contain the unmodified markdown).
- Fixed various URL bugs relating to `site.baseurl`.

### Internal
- Refactoring, preventing code duplications, heavier usage of `includes`.

## v3.0.0 (Hydejack)
May 7 2016
{:.heading.post-date}

Hydejack is a pretentious two-column [Jekyll](http://jekyllrb.com) theme, stolen by [`@qwtel`](https://twitter.com/qwtel) from [Hyde](http://hyde.getpoole.com). You could say it was.. [hydejacked](http://media3.giphy.com/media/makedRIckZBW8/giphy.gif).

### Features
Unlike Hyde, it's very opinionated about how you are going to use it.

Features include:
* Touch-enabled sidebar / drawer for mobile, including fallback when JS is disabled.
* Github Pages compatible tag support based on [this post][tag].
* Customizable link color and sidebar image, per-site, per-tag and per-post.
* Optional author section at the bottom of each post.
* Optional comment section powered by Disqus.
* Layout for posts grouped by year
* Wide array of social media icons on sidebar.
* Math blocks via [KaTeX](https://khan.github.io/KaTeX/).

## v2.0.0 (Hyde)
Jan 2 2014
{:.heading.post-date}

## v1.0.0 (Hyde)
Oct 15 2013
{:.heading.post-date}

[tag]: http://www.minddust.com/post/tags-and-categories-on-github-pages/
[migration]: docs/upgrade.md
[writing]: docs/writing.md
[scripts]: docs/scripts.md

[buy]: https://app.simplegoods.co/i/AQTTVBOE
[PRO-license]: licenses/PRO.md
[GPL-3.0]: licenses/GPL-3.0.md
