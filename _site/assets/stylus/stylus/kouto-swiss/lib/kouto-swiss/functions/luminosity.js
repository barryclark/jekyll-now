// luminosity( color )
// returns the luminosity value according to WCAG (http://www.w3.org/TR/WCAG20/#relativeluminancedef)
// inspired by https://npmjs.org/package/color

module.exports = function() {
    return function( oStyle ) {
        var _getChannelLuminosity = function( iValue ) {
            var iChannel = iValue / 255;
            return ( iChannel <= 0.03928 ) ? iChannel / 12.92 : Math.pow( ( ( iChannel + 0.055 ) / 1.055 ), 2.4 );
        };

        var fLuminosityMethod = function( oColor ) {
            oColor = oColor.rgba;
            return 0.2126 * _getChannelLuminosity( oColor.r ) + 0.7152 * _getChannelLuminosity( oColor.g ) + 0.0722 * _getChannelLuminosity( oColor.b );
        };

        oStyle.define( "ks-luminosity", fLuminosityMethod );
        if( !( this.evaluator.global.scope.lookup( "ks-no-conflict" ) ? this.evaluator.global.scope.lookup( "ks-no-conflict" ).first.val : false ) ) {
            oStyle.define( "luminosity", fLuminosityMethod );
        }
    };
};
