
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      sass: {
        files: ["scss/**/*.{scss,sass}"],
        tasks: ["sass:dev"]
      }
    },

    sass: {
      dev: {
        options: {
          style: 'nested'
        },
        files: {
          '_site/style.css': 'scss/style.scss',
          'style.css': 'scss/style.scss'
        }
      },
    },
  });

  grunt.registerTask("default", ["watch"]);

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks("grunt-contrib-watch");
};
