// kouto-swiss gruntfile

"use strict";

module.exports = function( grunt ) {

    require( "load-grunt-tasks" )( grunt );

    grunt.initConfig( {
        "mochacli": {
            "options": {
                "require": [ "should" ],
                "reporter": "spec",
                "inline-diffs": true,
            },
            "tests": {
                "src": "test/runner.js",
            },
        },
        "clean": {
            "docs": [ "docs/**" ],
        },
        "stylus": {
            "options": {
                "compress": true,
                "use": [ require( "./lib/kouto-swiss.js" ) ],
            },
            "docs": {
                "files": {
                    "docs/assets/css/styles.css": "src/stylus/styles.styl",
                },
            },
        },
        "pug": {
            "options": {
                "compress": true,
            },
            "website": {
                "options": {
                    "data": {
                        "pkg": grunt.file.readJSON( "package.json" ),
                        "index": grunt.file.readJSON( "src/docs/index.json" ),
                        "utils": require( __dirname + "/src/js/utils.js" ),
                    },
                },
                "files": {
                    "docs/index.html": "src/pug/index.pug",
                },
            },
        },
        "copy": {
            "cname": {
                "src": "src/CNAME",
                "dest": "docs/CNAME",
            },
        },
        "connect": {
            "docs": {
                "options": {
                    "port": 5555,
                    "hostname": "*",
                    "base": "./docs",
                    "keepalive": true,
                    "livereload": true,
                },
            },
        },
        "concurrent": {
            "docs": {
                "tasks": [ "connect:docs", "watch" ],
                "options": {
                    "logConcurrentOutput": true,
                },
            },
        },
        "watch": {
            "options": {
                "livereload": true,
            },
            "pug": {
                "files": "src/pug/**/*.pug",
                "tasks": [ "pug" ],
            },
            "styles": {
                "files": "src/stylus/**/*.styl",
                "tasks": [ "stylus" ],
            },
            "docs": {
                "files": "_docs/**/*.md",
                "tasks": [ "pug" ],
            },
        },
    } );

    grunt.registerTask( "default", [
        "clean",
        "pug",
        "stylus",
        "copy",
    ] );

    grunt.registerTask( "test", [
        "mochacli",
    ] );

    grunt.registerTask( "preview", [
        "default",
        "connect:docs",
    ] );

    grunt.registerTask( "work", [
        "default",
        "concurrent",
    ] );

    grunt.registerTask( "build", [
        "default",
    ] );
};
