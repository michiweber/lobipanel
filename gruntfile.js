module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        sass : {
            development: {
                files: {
                    'css/lobipanel.css': ['scss/lobipanel.scss']
                }
            }
        },
        
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: 'lobipanel.css',
                        dest: 'dist/css',
                        ext: '.min.css'
                    }
                ]
            }
        },
        
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'js',
                        src: '*.js',
                        dest: 'dist/js'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: '*.css',
                        dest: 'dist/css'
                    }
                ]
            }
        },
        
        uglify: {
            options: {
                mangle: false
            },
            js : {
                files: [
                    {
                        expand: true,
                        cwd: 'js',
                        src: '*.js',
                        dest: 'dist/js',
                        ext: '.min.js'
                    }
                ]
            }
        },
        
        watch: {
            scriptsDev: {
                files: ['js/*.js'],
                tasks: ['copy:js']
            },
            cssDev: {
                files: 'scss/*.scss',
                tasks: ['sass', 'copy:css']
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['copy:js', 'uglify']
            },
            css: {
                files: 'scss/*.scss',
                tasks: ['sass', 'cssmin', 'copy:css']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('dev', ['sass', 'copy', 'watch:scriptsDev', 'watch:cssDev']);
    grunt.registerTask('default', ['sass', 'cssmin', 'copy', 'uglify', 'watch']);
};