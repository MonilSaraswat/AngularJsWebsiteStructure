module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration will be written here
        jshint: {
            options: {
                curly: true,
                eqeqeq: false,
                eqnull: true,
                browser: true,
                node: true,
                sub: true,
                globals: {
                    jQuery: true,
                    moment: true,
                    angular: true,
                    underscore: true,
                    _: true,
                    $: true
                }
            },
            "globals": {
                angular: true
            },
            all: ['Gruntfile.js', 'static/js/app/**/*.js']
        },
        concat: {
            options: {
                separator: ''
            },
            lib: {
                src: [
                    'static/js/lib/jquery.min.js',
                    'static/js/lib/angular.min.js',
                    'static/js/lib/amplify.min.js',
                    'static/js/lib/bootstrap.min.js',
                    'static/js/lib/moment.js',
                    'static/js/lib/moment-locale.js',
                    'static/js/lib/toaster.js',
                    'static/js/lib/underscore.min.js'
                ],
                dest: 'dist/<%= pkg.name %>-lib.js'
            },
            dist: {
                src: [
                    'static/js/app/app.js',
                    'static/js/app/components/shared/js/config/urls.js',
                    'static/js/app/components/shared/js/utils/pubsub.js',
                    'static/js/app/components/shared/js/utils/utils.js',
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/* ! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy")%> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %><%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            },
            lib: {
                files: {
                    'dist/<%= pkg.name %><%= pkg.version %>lib.min.js': ['<%= concat.lib.dest %>']
                }
            }
        },
        html2js: {
            options: {
                base: 'static/js/app/components',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['static/js/app/**/*.html'],
                dest: 'dist/templates<%= pkg.version %>.js'
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy")%> */\n'
                },
                files: {
                    'dist/<%= pkg.buildVersion %>/css/<%= pkg.name %><%= pkg.version %>.min.css': [
                        'static/css/bootstrap.min.css',
                        'static/css/style.css'
                    ]
                }
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [{
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.name %><%= pkg.version%>.min.js'],
                        dest: 'comp/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.name %><%= pkg.version%>lib.min.js'],
                        dest: 'comp/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/<%= pkg.buildVersion %>/css/',
                        src: ['<%= pkg.name %><%= pkg.version%>.min.css'],
                        dest: 'comp/<%= pkg.buildVersion %>/css/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/<%= pkg.buildVersion %>/css/',
                        src: ['print<%= pkg.version%>.min.js'],
                        dest: 'comp/<%= pkg.buildVersion %>/css/'
                    }
                ]
            }
        }

    });

    // Loading of tasks and registering tasks will be written here
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');



    grunt.registerTask('default', ['html2js', 'concat', 'uglify', 'cssmin', 'compress']);
};