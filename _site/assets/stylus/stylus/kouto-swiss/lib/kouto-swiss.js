/*!
 * Kouto Swiss
 * A complete CSS framework for Stylus
 * https://github.com/leny/kouto-swiss
 * MIT Licensed
 */

var stylus = require( "stylus" ),
    path = require( "path" ),
    nodes = stylus.nodes,
    utils = stylus.utils;

exports = module.exports = function() {
    return function( oStyle ){
        oStyle.include( __dirname );
    };
};

exports.version = require( path.join( __dirname, "../package.json" ) ).version;

exports.path = __dirname;
