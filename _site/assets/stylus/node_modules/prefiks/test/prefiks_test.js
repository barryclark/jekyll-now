"use strict";

var prefiks = require( "../lib/prefiks.js" );

exports[ "prefiks" ] = {
  setUp: function( done ) {
    done();
  },
  "errors": function( test ) {
    var oBrowserHashOne = {
      "nothing": 9,
      "chrome": "<=35",
      "firefox": ">28",
      "opera": "*"
    };
    test.throws( function() { prefiks( "css-filters", "nothing", 2 ) }, Error, "Should throws for unknown browsers" );
    test.throws( function() { prefiks( "css-filters", oBrowserHashOne, 2 ) }, Error, "Should throws for unknown browsers" );
    test.throws( function() { prefiks( "nothing", "ie", 2 ) }, Error, "Should throws for unknown features" );
    test.done();
  },
  "browsers aliases": function( test ) {
    // TODO : there's many more aliases to add & test !
    // IE aliases
    test.doesNotThrow( function() { prefiks( "css-filters", "IE" ) }, Error, "Should not throw." );
    test.doesNotThrow( function() { prefiks( "css-filters", "Internet Explorer" ) }, Error, "Should not throw." );
    test.doesNotThrow( function() { prefiks( "css-filters", "InternetExplorer" ) }, Error, "Should not throw." );
    test.doesNotThrow( function() { prefiks( "css-filters", "Internet-Explorer" ) }, Error, "Should not throw." );
    test.doesNotThrow( function() { prefiks( "css-filters", "INTERNET_EXPLORER" ) }, Error, "Should not throw." );
    // FF aliases
    test.doesNotThrow( function() { prefiks( "css-filters", "ff" ) }, Error, "Should not throw." );
    // IOS Safari Aliases
    test.doesNotThrow( function() { prefiks( "css-filters", "ios" ) }, Error, "Should not throw." );
    test.done();
  },
  "no version given": function( test ) {
    test.deepEqual( prefiks( "transforms2d", "ie" ), [ "ms" ], "Should be [ 'ms' ]." );
    test.deepEqual( prefiks( "transforms2d", "firefox" ), [ "moz" ], "Should be [ 'moz' ]." );
    test.deepEqual( prefiks( "transforms2d", "chrome" ), [ "webkit" ], "Should be [ 'webkit' ]." );
    test.deepEqual( prefiks( "transforms2d", "safari" ), [ "webkit" ], "Should be [ 'webkit' ]." );
    test.deepEqual( prefiks( "transforms2d", "opera" ), [ "webkit", "o" ], "Should be [ 'webkit', 'o' ]." );
    test.deepEqual( prefiks( "transforms2d", "ios_saf" ), [ "webkit" ], "Should be [ 'webkit' ]." );
    test.deepEqual( prefiks( "transforms2d", "op_mini" ), [], "Should be []." );
    test.deepEqual( prefiks( "transforms2d", "android" ), [ "webkit" ], "Should be [ 'webkit' ]." );
    test.deepEqual( prefiks( "transforms2d", "bb" ), [ "webkit" ], "Should be [ 'webkit' ]." );
    test.deepEqual( prefiks( "transforms2d", "op_mob" ), [ "webkit", "o" ], "Should be [ 'webkit', 'o' ]." );
    test.deepEqual( prefiks( "transforms2d", "and_chr" ), [], "Should be []." );
    test.deepEqual( prefiks( "transforms2d", "and_ff" ), [], "Should be []." );
    test.deepEqual( prefiks( "transforms2d", "ie_mob" ), [], "Should be []." );
    test.done();
  },
  "numeric version given": function( test ) {
    test.deepEqual( prefiks( "transforms2d", "ie", 7 ), [], "Should be []." );
    test.deepEqual( prefiks( "transforms2d", "ie", 9 ), [ "ms" ], "Should be [ 'ms' ]." );
    test.deepEqual( prefiks( "transforms2d", "ie", 10 ), [], "Should be []." );
    test.done();
  },
  "semver versions given": function( test ) {
    test.deepEqual( prefiks( "transforms2d", "ie", "<9" ), [], "Should be []." );
    test.deepEqual( prefiks( "transforms2d", "ie", ">9" ), [], "Should be []." );
    test.deepEqual( prefiks( "transforms2d", "ie", ">8" ), [ "ms" ], "Should be [ 'ms' ]." );
    test.deepEqual( prefiks( "transforms2d", "ie", ">=9" ), [ "ms" ], "Should be [ 'ms' ]." );
    test.done();
  },
  "multiple browsers hash given": function( test ) {
    var oBrowserHashOne = {
      "Internet Explorer": 9,
      "chrome": "<=35",
      "firefox": ">28",
      "opera": "*"
    };
    test.deepEqual( prefiks( "transforms2d", oBrowserHashOne ), [ "webkit", "ms", "o" ], "Should be [ 'webkit', 'ms', 'o' ]." );
    test.done();
  },
};
