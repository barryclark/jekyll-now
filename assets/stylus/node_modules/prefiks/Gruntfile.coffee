"use strict"

module.exports = ( grunt ) ->

    grunt.initConfig
        clean:
            test: [ "test/fixtures" ]
        coffeelint:
            options:
                arrow_spacing:
                    level: "error"
                camel_case_classes:
                    level: "error"
                duplicate_key:
                    level: "error"
                indentation:
                    level: "ignore"
                max_line_length:
                    level: "ignore"
                no_backticks:
                    level: "error"
                no_empty_param_list:
                    level: "error"
                no_stand_alone_at:
                    level: "error"
                no_tabs:
                    level: "error"
                no_throwing_strings:
                    level: "error"
                no_trailing_semicolons:
                    level: "error"
                no_unnecessary_fat_arrows:
                    level: "error"
                space_operators:
                    level: "error"
            lib:
                files: "src/**/*.coffee"
        coffee:
            lib:
                expand: yes
                cwd: "src/"
                src: [ "**/*.coffee" ]
                dest: "lib/"
                ext: ".js"
                options:
                    bare: yes
        nodeunit:
            files: [ "test/**/*_test.js" ]
        watch:
            lib:
                files: "src/**/*.coffee"
                tasks: [
                    "coffeelint"
                    "coffee"
                    "test"
                ]

    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-contrib-nodeunit"
    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-coffeelint"

    grunt.registerTask "default", [
        "coffeelint"
        "coffee"
        "clean"
        "test"
    ]

    grunt.registerTask "test", [
        "clean"
        "nodeunit"
    ]

