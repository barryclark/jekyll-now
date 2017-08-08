# viewbox

[![npm](https://img.shields.io/npm/v/viewbox.svg?style=flat-square)](https://www.npmjs.com/package/viewbox)
[![Travis](https://img.shields.io/travis/tracespace/viewbox.svg?style=flat-square)](https://travis-ci.org/tracespace/viewbox)
[![Coveralls](https://img.shields.io/coveralls/tracespace/viewbox.svg?style=flat-square)](https://coveralls.io/github/tracespace/viewbox)
[![David](https://img.shields.io/david/tracespace/viewbox.svg?style=flat-square)](https://david-dm.org/tracespace/viewbox)
[![David](https://img.shields.io/david/dev/tracespace/viewbox.svg?style=flat-square)](https://david-dm.org/tracespace/viewbox#info=devDependencies)

Utility library for dealing with SVG viewboxes as plain arrays.

Install with:

```
$ npm install --save viewbox
```

## usage

``` javascript
var viewbox = require('viewbox')
```

See [API.md](API.md) for usage.

## developing and contributing

Clone and then `$ npm install`. Please accompany all PRs with applicable tests. Please test your code in browsers, as Travis CI cannot run browser tests for PRs.

### unit testing

This module uses [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/) for unit testing, [Istanbul](https://github.com/gotwarlost/istanbul) for coverage, and [ESLint](http://eslint.org/) for linting.

* `$ npm test` - run the tests, calculate coverage, and lint
* `$ npm run test:watch` - run the tests on code changes (does not lint nor cover)
* `$ npm run lint` - lint the code (will be run as a pre-commit script)

### browser testing

Browser tests are run with [Zuul](https://github.com/defunctzombie/zuul) and [Sauce Labs](https://saucelabs.com/opensauce/) on the latest two versions of Chrome, Firefox, Safari, and Internet Explorer, as well as the latest version of Edge.

* `$ npm run test:browser` - run the unit tests in a local browser
* `$ npm run test:sauce` - run the units tests in several browsers using Open Sauce (Sauce Labs account and local [.zuulrc](https://github.com/defunctzombie/zuul/wiki/Zuulrc) required)
