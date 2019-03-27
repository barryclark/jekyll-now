// caniuse-prefixes( property )
// returns prefixes list from caniuse db, for vendors functions (using prefiks package)

var prefiks = require( "prefiks" ),
    aBrowsersSupportVars = [
        "ie",
        "firefox",
        "chrome",
        "safari",
        "opera",
        "ios-safari",
        "opera-mini",
        "android-browser",
        "blackberry-browser",
        "opera-mobile",
        "android-chrome",
        "android-firefox",
        "ie-mobile"
    ],
    rUnquote = /(\"|\')/gi,
    _unquote = function( sStr ) {
        return sStr.replace( rUnquote, "" );
    };

module.exports = function() {
    return function( oStyle ) {
        var fCaniuseMethod = function( sFeature ) {
            var oBrowsersSupport = {},
                i = -1,
                sBrowserSupportVar,
                mBrowserSupportVarValue,
                aFeaturePrefiks;
            for( ; sBrowserSupportVar = aBrowsersSupportVars[ ++i ] ; ) {
                mBrowserSupportVarValue = this.global.scope.lookup( "ks-support-" + sBrowserSupportVar ) ? this.global.scope.lookup( "ks-support-" + sBrowserSupportVar ).first.val : false;;
                if( !mBrowserSupportVarValue ) {
                    continue;
                }
                oBrowsersSupport[ sBrowserSupportVar ] = isNaN( +mBrowserSupportVarValue ) ? mBrowserSupportVarValue : ( ">=" + ( +mBrowserSupportVarValue ) );
            }
            aFeaturePrefiks = prefiks( _unquote( sFeature.toString() ), oBrowsersSupport )
            return aFeaturePrefiks;
        };
        oStyle.define( "ks-caniuse-prefixes", fCaniuseMethod );
        if( !( this.evaluator.global.scope.lookup( "ks-no-conflict" ) ? this.evaluator.global.scope.lookup( "ks-no-conflict" ).first.val : false ) ) {
            oStyle.define( "caniuse-prefixes", fCaniuseMethod );
        }
    };
};
