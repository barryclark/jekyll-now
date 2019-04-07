### As middleware, for *on the fly* compilation.

There's an exemple of how to use stylus with kouto-swiss within Connect or Express.

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
