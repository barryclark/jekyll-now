'use strict';


module.exports = function(grunt) {

  // Project config
  /* SET - theme name, description and version number
  **/
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    },

    // Opens up the browser to the localhost along with the port defined above
    open: {
      dev: {
        path: 'http://127.0.0.1:<%= connect.server.options.port %>/'
      }
    },

    // Observe the js/html/css files for changes and execute the tasks
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['jquery.photoset-grid.js'],
        tasks: ['jshint', 'uglify'],
      },
      html: {
        files: ['**/*.html', '!**/node_modules/**']
      },
      css: {
        files: '**/*.css'
      },
      scss: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },

    // Check for ghetto js in the plugin
    jshint: {
      files: ['jquery.photoset-grid.js']
    },

    // Minify the file and add a comment banner at the top with settings from package.json
    uglify: {
      options: {
        banner: '/**\n' +
          ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
          ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          ' * <%= pkg.description %>\n' +
          ' * <%= pkg.repository.docs %>\n' +
          ' *\n' +
          ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
          ' */\n'
      },
      dist: {
        files: {
          'jquery.photoset-grid.min.js': ['jquery.photoset-grid.js']
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'nested'
        },
        files: {
          'css/main.css': ['css/scss/_normalize.scss', 'css/scss/_clearfix.scss', 'css/scss/main.scss']
        }
      }
    }


  });

  // Load the grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-open');

  // $ grunt
  // Checks the js and minifies it
  grunt.registerTask('default', ['jshint', 'uglify', 'sass']);
  // $ grunt server
  // Checks the js, minfies it, starts livereload, connects to a local server, opens the browser and watches for changes 
  grunt.registerTask('server', ['default', 'connect', 'open:dev', 'watch']);

};