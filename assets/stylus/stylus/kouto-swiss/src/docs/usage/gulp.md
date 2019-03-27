### Included in compilation with gulp

To use **kouto swiss** with gulp, use [gulp-stylus](https://www.npmjs.org/package/gulp-stylus) and include **kouto swiss** in your `use` option for the task.

```javascript
var gulp = require( "gulp" ),
    koutoSwiss = require( "kouto-swiss" ),
    stylus = require( "gulp-stylus" );

gulp.task( "styles", function() {
    gulp.src( "stylus/styles.styl" )
        .pipe( stylus( {
            "use": koutoSwiss()
        } ) )
        .pipe( gulp.dest( "css" ) );
} );
```
