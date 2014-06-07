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
        '_source/js/*.js',
        '!_source/js/main.js'
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
          '_source/*.*',
          '_source/_layouts/**',
          '_source/_includes/**',
          '_source/_posts/**',
          '_source/_work/**'
        ],
        tasks: ['shell:jekyllBuild'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: [
          '_source/_sass/*.scss'
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
          '_source/_images/*.{png,jpg,jpeg}'],
        tasks: ['newer:imagemin', 'shell:jekyllBuild'],
        options: {
          livereload: true
        }
      },
      svgs: {
        files: [
          '_source/_images/*.svg'],
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
          '_source/css/main.min.css':'_source/_sass/main.scss'
        }
      },
      dev: {
        options: {
          sourcemap: false,
          compass: false,
        },
        files: {
          '_source/css/main.css':'_source/_sass/main.scss'
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
          '_source/js/main.js': [
            '_source/js/plugins/*.js',
            '_source/js/_*.js'
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
          cwd: '_source/_images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '_source/images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '_source/_images/',
          src: '{,*/}*.svg',
          dest: '_source/images/'
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