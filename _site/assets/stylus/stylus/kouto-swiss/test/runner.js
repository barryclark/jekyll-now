/*!
 * Kouto Swiss
 * A complete CSS framework for Stylus
 * https://github.com/leny/kouto-swiss
 * MIT Licensed
 *
 * Test Runner
 * (inspired from nib test runner)
 */

var stylus = require( "stylus" ),
    koutoSwiss = require( "../" ),
    fs = require( "fs" ),
    rReturn = /\r/g,
    rTestNameSanitize = /[-.]/g;

var cases = fs.readdirSync( "test/cases" )
    .filter( function( oFile ){
        return ~oFile.indexOf( ".styl" );
    } )
    .map( function( oFile ){
        return oFile.replace( ".styl", "" );
    } );

describe( "Kouto Swiss Tests", function() {
    cases.forEach( function( sTest ) {
        var sName = sTest.replace( rTestNameSanitize, " " );

        // disabled tests
        if( sName.substr( 0, 1 ) === "_" ) {
            return;
        }

        it( sName, function( done ) {
            var sPath = "test/cases/" + sTest + ".styl",
                sStylusCase = fs.readFileSync( sPath, "utf8" ).replace( rReturn, "" ),
                sCSSExpected = fs.readFileSync( "test/cases/" + sTest + ".css", "utf8" ).replace( rReturn, "" ),
                oStylus;

            ( oStylus = stylus( sStylusCase ) )
                .use( koutoSwiss() )
                .set( "filename", sPath )
                .include( __dirname + "/cases/img" )
                .define( "url", stylus.url() );

            if ( ~sTest.indexOf("compress") ) {
                oStylus.set("compress", true);
            }

            oStylus.render( function( oError, sCSSActual ) {
                if( oError ) {
                    if( oError.message.indexOf( "expected" ) > -1 ) {
                        oError.message = oError.message.substring( 0, oError.message.indexOf( "expected" ) );
                    }
                    return done( oError );
                }
                sCSSActual
                    .trim()
                    .should
                    .equal( sCSSExpected.trim() );
                done();
            } );
        } );
    } );
} );
