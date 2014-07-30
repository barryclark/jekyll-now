'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'js/*.js',
        '!js/main.js'
      ]
    },
    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: '_site'
        }
      }
    },
    watch: {
      jekyll: {
        files: [
          '_config.yml',
          '*.*',
          '_layouts/**',
          '_includes/**',
          '_posts/**',
          '_work/**'
        ],
        tasks: ['shell:jekyllBuild'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: [
          '_sass/*.scss'
        ],
        tasks: ['sass', 'shell:jekyllBuild'],
        options: {
          livereload: true
        }
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify', 'shell:jekyllBuild'],
        options: {
          livereload: true
        }
      },
      images: {
        files: [
          '_images/*.{png,jpg,jpeg}'],
        tasks: ['newer:imagemin', 'shell:jekyllBuild'],
        options: {
          livereload: true
        }
      },
      svgs: {
        files: [
          '_images/*.svg'],
        tasks: ['newer:svgmin', 'shell:jekyllBuild'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          sourcemap: false,
          style: 'compressed',
          compass: false,
        },
        files: {
          'css/main.min.css':'_sass/main.scss'
        }
      },
      dev: {
        options: {
          sourcemap: false,
          compass: false,
        },
        files: {
          'css/main.css':'_sass/main.scss'
        }
      }
    },
    uglify: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
          compress: true,
          beautify: false,
          mangle: false
        },
        files: {
          'js/main.js': [
            'js/plugins/*.js',
            'js/_*.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '_images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '_images/',
          src: '{,*/}*.svg',
          dest: 'images/'
        }]
      }
    },
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-newer');

  // Register tasks
  grunt.registerTask('default', ['jshint', 'uglify', 'newer:imagemin', 'newer:svgmin']);
  grunt.registerTask('serve', ['shell', 'connect', 'watch']);
  grunt.registerTask('optimize', ['imagemin', 'svgmin']);

};