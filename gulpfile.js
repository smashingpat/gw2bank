'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const watch = require('gulp-watch')
const gulpif = require('gulp-if')
const ghPages = require('gulp-gh-pages')
const jade = require('gulp-jade')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const budo = require('budo')
const argv = require('yargs').argv;
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const stream = require('gulp-streamify')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const watchify = require('watchify')
const babelify  = require('babelify').configure({
    presets: ['es2015', 'react'],
    plugins: ['transform-object-rest-spread', 'transform-decorators-legacy']
})


// set production variables and states

let PRODUCTION = argv.production
process.env.NODE_ENV = PRODUCTION ? 'production' : 'development';


// files

const entry = './source/index.js'
const outfile = 'bundle.js'


// Tasks and functions

const tasks = {
    jade: function() {
        gulp.src([
            './source/jade/**/*.jade',
            '!./source/jade/layouts/**/*.jade',
            '!./source/jade/includes/**/*.jade'
        ])
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./app'))
    },
    sass: function() {
        gulp.src('./source/sass/global.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(postcss([
                require('postcss-assets')({
                    loadPaths: ['**'],
                    basePath: './app',
                    cachebuster: true
                }),
                require('autoprefixer')({ browsers: ['last 1 version'] }),
                require('csswring')()
            ]))
            .pipe(gulp.dest('./app'))
    },
    server: function(callback) {

        // dev server
        let server = budo(!PRODUCTION ? entry : null, {
            serve: outfile,
            port: argv.port ? argv.port : 3000,
            live: true,
            dir: './app',
            open: argv.open,
            cors: true,
            browserify: PRODUCTION ? null : {
                transform: babelify
            },
            stream: process.stdout
        }).on('exit', callback)

        watch(['source/sass/**/*.{scss,sass}'], () => gulp.start('sass'))
        watch(['source/jade/**/*.jade'], () => gulp.start('jade'))

    },
    script: function() {

        let bundler = browserify(entry, {
            transform: babelify,
            basedir: __dirname,
            debug: !PRODUCTION,
            cache: {},
            packageCache: {},
            fullPaths: true //!PRODUCTION
        })

        if (PRODUCTION) {
            bundler = watchify(bundler)
            bundler.on('update', bundle)
            bundler.on('log', gutil.log)
        }

        function bundle() {
            return bundler.bundle()
                .pipe(source('index.js'))
                .pipe(gulpif(PRODUCTION, stream(uglify({
                    output: {
                        beautify: argv.beautify ? true : false
                    },
                    compress: {
                        global_defs: {
                            __DEV__: false
                        }
                    }
                }))))
                .pipe(rename(outfile))
                .pipe(gulp.dest('./app'))
        }

        return bundle()
    },
    deploy: function() {
        gulp.src('./app/**/*')
            .pipe(ghPages())
    }
}

gulp.task('jade', tasks.jade)
gulp.task('sass', tasks.sass)
gulp.task('server', ['sass', 'script'], tasks.server)
gulp.task('script', tasks.script)
gulp.task('deploy', ['bundle'], tasks.deploy)

gulp.task('bundle', ['jade', 'sass', 'script'])
