# kouto swiss: changelog

## `1.1.0` / 2017-02-26

* Add `flex-axis` mixin

## `1.0.0` / 2016-12-26

* **Breaking change:** remove grid system
* New design & build system for documentation
* Update dev dependencies

## `0.14.0` / 2016-12-06

* Add `min-size` & `max-size` mixins
* Add _relative_ keywords support in `position` mixin
* Refactor `calc` mixin

## `0.13.1` / 2016-11-12

* Fix `ks-vendors-prefixes` collision bug

## `0.13.0` / 2016-11-12

* Update normalize to `5.0.0`
* Update default minimal browsers version for vendors
* Mark grid system as **deprecated**
* Add System font stack
* Add yarn lock file
* Update node targets in travis
* Update Stylus to `0.54.5`, update dev dependencies.

## `0.12.0` / 2016-03-25

* Update node targets in travis
* Adding 'local' parameter to ks-font-face
* Update Stylus to `0.54.2`, update dev dependencies.

## `0.11.14` / 2015-12-26

* Update dev dependencies.
* Move repo from krkn to leny/kouto-swiss

## `0.11.13` / 2015-07-04

* Update dev dependencies.
* Fix issue in flex-flow vendors mixin.

## `0.11.12` / 2015-05-31

* Update Stylus to `0.51.1`, update dev dependencies.
* Fix tests due to Stylus' new Math strictness.
* Colons. [Colons everywhere](https://github.com/stylus/stylus/wiki/1.0.0#syntax).

## `0.11.11` / 2015-04-03

* Support multiple values in `rem()` function

## `0.11.10` / 2015-03-25

* Update documentation for position sticky
* Implement box-shadow vendors mixin

## `0.11.9` / 2015-03-16

* Remove grunt as *peerDependency*

## `0.11.8` / 2015-02-24

* Update dev dependencies
* Fix position mixins when using `!important` keyword

## `0.11.7` / 2015-02-05

* Update Stylus to `0.50.0`, update dev dependencies.
* Fix some grammatical/spelling errors
* Add `user-select` vendor prefixing
* Add `position: sticky` vendor prefixing

## `0.11.6` / 2014-11-27

* Implementing *no-conflict* mode
* Add `ratio-box` mixin

## `0.11.5` / 2014-11-21

* Implement & support WOFF2 by default for font-face mixin

## `0.11.4` / 2014-11-20

* Fix additional parameters support in clear & overflow utilities
* Fix support for additional parameters support in flex mixins

## `0.11.3` / 2014-11-19

* Fix index glob collision in importing

## `0.11.2` / 2014-11-08

* Add js-compiled Gruntfile

## `0.11.1` / 2014-11-08

* List contributors in package.json
* Fix possible collision for *row* and *column* values in `flex-flow` and `flex-direction` mixin
* Fix some grammatical/spelling errors
* Add docs section for webstorm IDEs
* Add editorconfig file

## `0.11.0` / 2014-11-08

* Refactor flex mixins
* Aliasing color-fallback mecanism, changing global support variable name
* Aliasing all the functions & mixins
* Fix typos and grammers in README
* Update Stylus to `0.49.3`, update dev dependencies.

## `0.10.3` / 2014-10-07

* Update Stylus to `0.49.1`, update dev dependencies.

## `0.10.2` / 2014-09-29

* Fix `perspective` vendor prefixing when using in a `transform` property context.

## `0.10.1` / 2014-09-29

* Fix variables in media query mixin bug.

## `0.10` / 2014-08-18

* Add [inheritance pattern](http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/) to box-sizing-reset mixin.

## `0.9.9` / 2014-08-09

* Update documentation.

## `0.9.8` / 2014-08-05

* Fixing bug with `0` value in size & position mixin.

## `0.9.7` / 2014-08-03

* Add global importation state variable (useful for third-party plugins).

## `0.9.6` / 2014-08-02

* Update documentation.

## `0.9.5` / 2014-08-02

* Add [normalize](https://github.com/necolas/normalize.css) "reset".

## `0.9.4` / 2014-07-30

* Add conditions in size mixin.

## `0.9.3` / 2014-07-29

* Add documentation for ellipsis mixin.
* Add conditions in position mixin.

## `0.9.2` / 2014-07-25

* Update Stylus to `0.47.3`.

## `0.9.1` / 2014-07-19

* Update Stylus to `0.47.2`. Remove workaround for [Stylus issue#1618](https://github.com/LearnBoost/stylus/issues/1618).

## `0.9.0` / 2014-07-19

* Change calling format of media queries, allows to skip it for legacy browsers.

## `0.8.8` / 2014-07-15

* Implement more vendors features, allows to disable the caniuse data's usage.

## `0.8.7` / 2014-07-14

* Use [caniuse website](http://caniuse.com) data for vendors mixins.

## `0.8.6` / 2014-07-11

* Fix *hsl* support in luminosity() function.

## `0.8.5` / 2014-07-08

* Allow users to disable autoprefixing (as suggered in issue #5).

## `0.8.4` / 2014-07-08

* Add custom vendors prefixes support (as asked in issue #5).

## `0.8.3` / 2014-07-05

* Update Stylus to `0.47.1`. Fix an issue caused by a bug introduced in Stylus `0.47`.

## `0.8.2` / 2014-07-04

* Small fix in docs & tests for `calc()`, according to specs (issue #4). Thanks to [PunKeel](https://github.com/PunKeel).

## `0.8.1` / 2014-06-30

* Add changelog
* Add contributing document
* Add some grunt tasks to help contributing
* Fix typo in docs page
* Add ios-type scroll in docs page for navigation column

## `0.8.0` / 2014-06-30

First stable version of the lib, ready for production, with [website and documentation](http://kouto-swiss.io).

* * *

The versions before `0.8.0` were strict development version and don't really need to appears here.
