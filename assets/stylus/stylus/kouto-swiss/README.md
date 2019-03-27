# kouto swiss

[![NPM version](https://badge.fury.io/js/kouto-swiss.svg)](http://badge.fury.io/js/kouto-swiss) [![Build Status](http://img.shields.io/travis/leny/kouto-swiss.svg)](https://travis-ci.org/leny/kouto-swiss) ![Dependency Status](https://david-dm.org/leny/kouto-swiss.svg) ![Downloads counter](http://img.shields.io/npm/dm/kouto-swiss.svg)

> A complete CSS framework for [Stylus](http://learnboost.github.io/stylus/)

* * *

**kouto swiss** is a complete CSS framework for Stylus, inspired by great tools like nib, compass, bourbon…

## Installation

```bash
$ npm install --save-dev kouto-swiss
```

## Usage

### Included in compilation, with grunt or gulp.

#### Grunt

For grunt, you can use [grunt-contrib-stylus](https://www.npmjs.org/package/grunt-contrib-stylus), and include **kouto swiss** in your `use` option for the task.

You can also use [grunt-ks-stylus](https://www.npmjs.org/package/grunt-ks-stylus), which is a fork of **grunt-contrib-stylus**, with **kouto swiss** included.

#### Gulp

For gulp, use [gulp-stylus](https://www.npmjs.org/package/gulp-stylus) and include **kouto swiss** in your `use` option for the task.

### PHPStorm/WebStorm File Watchers

On some IDEs like PHPStorm and Webstorm, you can automatically compile your styles as they change, without relying on a third-party tool.  In PHPStorm and Webstorm, this functionality is known as *file watchers*.  To use with PHPStorm or WebStorm, as a file watcher, simply:

- Ensure you have added ``kouto-swiss`` as a dependency:

```
$ npm install --save-dev kouto-swiss
```

- Do an ``npm install``
- Create a new file watcher with settings like these: ![image](https://cloud.githubusercontent.com/assets/1750837/4965903/60310eac-679d-11e4-85db-95950c854398.png)
- Create an ``@import`` in one of you ``.styl`` files:
```
@import "../../../node_modules/kouto-swiss" // import kuoto-swiss for auto-prefixing (or whatever relative path where node-modules lives
```

### Included in compilation with third-party tools.

To use **kouto swiss** with third-party tools like [Codekit](https://incident57.com/codekit/) or [Prepros](http://alphapixels.com/prepros/), you should include **kouto swiss** on your project by yourself. You can download it [on github](https://github.com/leny/kouto-swiss/releases).

_More information coming soon._

### As middleware, for *on the fly* compilation.

There's an example of how to use stylus with kouto-swiss within Connect or Express.

```javascript
var connect = require( "connect" ),
    stylus = require( "stylus" ),
    koutoSwiss = require( "kouto-swiss" ),
    server = connect();

function compile( str, path ) {
    return stylus( str )
        .set( "filename", path )
        .set( "compress", true )
        .use( koutoSwiss() );
}

server.use( stylus.middleware( {
    src: __dirname,
    compile: compile
} ) );

```

## Stylus API

To gain access to the kouto swiss tools from your Stylus files, simply add:

```stylus
@import "kouto-swiss"
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests and update the docs for any new or changed functionality.
More informations in the `CONTRIBUTING.md` file.

### Special call for contribution : someone who's English is better than I am !

> I am committed to improving the readability of documents with heart and soul. As you can see, I'm **not** a native English speaker. I need your help.

If you want to help the **kouto swiss** project, but don't want to write code, please consider reviewing the docs, correcting my *very bad* English.
Many thanks!

## Release History

For more details, look at the [changelog](./CHANGELOG.md).

- **2017-02-26:** version `1.1.0`
- **2016-12-26:** version `1.0.0`
- **2016-12-06:** version `0.14.0`
- **2016-11-12:** version `0.13.0`
- **2016-03-25:** version `0.12.0`
- **2014-11-08:** version `0.11.0`
- **2014-08-18:** version `0.10.0`
- **2014-07-19:** version `0.9.0`
- **2014-06-30:** version `0.8.0`
- **2014-05-20:** version `0.1.0`
- **2014-05-05:** version `0.0.1`
- **2014-05-03:** starting project

## License

Copyright (c) 2014 [leny](http://leny.me)
Licensed under the MIT license.

### Licenses for ressources used in docs

#### Fonts

* [Norwester by Jamie Wilson](http://jamiewilson.io/norwester/) ([SIL Open Font License](http://scripts.sil.org/OFL))
