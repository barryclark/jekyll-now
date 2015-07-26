module.exports = function(grunt){

	grunt.initConfig({

		pkg : grunt.file.readJSON('package.json'),

		sass : {
			dist : {
				options : {
					style : 'expanded',
					sourcemap: true,
					trace: true
				},

				files : [{
					expand: true,
					cwd: 'assets/sass',
					src: [
						'*.scss',
						'**/*.scss'
					],
					dest: 'assets/build/css',
					ext: '.css'
				}]
			}
		},

		watch : {
			sass : {
				files : ['assets/sass/**/*.scss'],
				tasks : ['sass'],
				options : {
					spawn: false,
					livereload: true
				}
			},

			js : {
				files: ['assets/js/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		},

		concat: {
			javascript: {
				files: {
					'assets/build/js/main.js': [
						'bower_components/jquery/dist/jquery.min.js',
						'assets/js/**/*.js'
					]
				}
			}
		},

		uglify: {
			javascript: {
				files: {
					'assets/build/js/main.min.js' : ['assets/build/js/main.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['sass', 'concat', 'uglify']);
	grunt.registerTask('local', ['sass', 'concat', 'uglify', 'watch']);
	grunt.registerTask('build', ['default']);

	// TODO: build some helpful tasks
	grunt.registerTask('install', []);
	grunt.registerTask('update', []);

};
