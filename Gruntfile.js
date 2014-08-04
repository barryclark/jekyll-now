module.exports = function(grunt){

	grunt.initConfig({

		pkg : grunt.file.readJSON('package.json'),

		sass : {
			
			dist : {
				
				options : {
					style : 'compressed',
					sourcemap: true
				},

				files : [{
					expand: true,
					cwd: '_scss',
					src: [
						'*.scss',
						'*/*.scss'
					],
					dest: 'css',
					ext: '.css'
				}]
			}
		},

		watch : {

			css : {
				
				files : [
					'_scss/*.scss',
					'_scss/*/*.scss'
				],
				
				tasks : ['sass'],
				
				options : {
					spawn: false,
					livereload: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass']);

};