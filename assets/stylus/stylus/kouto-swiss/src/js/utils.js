/* leny/kouto-swiss
 *
 * /src/js/utils.js - Utils for pug/jade templates
 *
 * coded by leny@flatLand!
 * started at 07/12/2016
 */

var fs = require( "fs" ),
    marked = require( "marked" ),
    highlight = require( "highlight.js" ).highlightAuto;

marked.setOptions( {
    "highlight": function( sCode ) {
        return highlight( sCode ).value;
    },
} );

exports.date_format = function( sDate ) {
    var dDate = new Date( sDate );

    return dDate.toLocaleDateString( "en-GB", {
        "year": "numeric",
        "month": "long",
        "day": "numeric",
    } );
};

exports.capitalize = function( sSource ) {
    return sSource[ 0 ].toUpperCase() + sSource.substr( 1 );
};

exports.chapter_entry_content = function( sChapter, sEntry ) {
    return marked( fs.readFileSync( __dirname + "/../docs/" + sChapter + "/" + sEntry + ".md", "utf8" ) );
};
