'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const watch = require('gulp-watch')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const ghPages = require('gulp-gh-pages')
const jade = require('gulp-jade')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const budo = require('budo')
const argv = require('yargs').argv;
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const stream = require('gulp-streamify')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const watchify = require('watchify')
const babelify  = require('babelify').configure({
    presets: ['es2015', 'react'],
    plugins: ['transform-object-rest-spread', 'transform-decorators-legacy']
})
const browserSync = require('browser-sync')


// Variables, production state and settings

let PRODUCTION = argv.production
process.env.NODE_ENV = PRODUCTION ? 'production' : 'development';

let PORT = argv.port ? argv.port : 3000

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

        browserSync.notify('[<span style="color: cyan;">Sass</span>] compiling')

        gulp.src('./source/sass/global.scss')
            .pipe(plumber({
                errorHandler: function(err) {
                    browserSync.notify('[<span style="color: red;">Sass</span>] Error')
                    gutil.log(`[${gutil.colors.cyan('Sass')}] - ${gutil.colors.red('error')} \n${err.toString()}`)
                    this.emit('end')
                }
            }))
            .pipe(gulpif(!PRODUCTION, sourcemaps.init({loadMaps: true})))
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
            .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
            .pipe(gulp.dest('./app'))
    },
    script: function(watchOn) {

        browserSync.notify('[<span style="color: cyan;">Browserify</span>] compiling')

        let bundler = browserify({
            entries: [entry],
            transform: babelify,
            basedir: __dirname,
            debug: !PRODUCTION,
            cache: {},
            packageCache: {},
            fullPaths: true
        })

        if (watchOn) {
            bundler = watchify(bundler)
            bundler.on('update', bundle)
            bundler.on('log', msg => gutil.log(`[${gutil.colors.cyan('Browserify')}] - ${msg}`))
        }

        function bundle() {
            return bundler.bundle()
                .on('error', function(err) {
                    gutil.log(`[${gutil.colors.cyan('Browserify')}] - ${gutil.colors.red('error')} \n${err.codeFrame}`)
                    browserSync.notify('[<span style="color: red;">Browserify</span> Error]')
                    this.emit('end')
                })
                .pipe(source('index.js'))
                .pipe(buffer())
                .pipe(gulpif(!PRODUCTION, sourcemaps.init({loadMaps: true})))
                .pipe(gulpif(PRODUCTION, uglify({
                    output: {
                        beautify: argv.beautify ? true : false
                    }
                })))
                .pipe(rename(outfile))
                .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
                .pipe(gulp.dest('./app'))
                .pipe(browserSync.stream())
        }

        return bundle()
    },
    server: function() {

        watch(['source/sass/**/*.{scss,sass}'], () => gulp.start('sass'))
        watch(['source/jade/**/*.jade'], () => gulp.start('jade'))
        tasks.script(true)

        return browserSync({
            server: {
                baseDir: './app'
            },
            host: "localhost",
            online: true,
            open: argv.open ? true : false,
            port: PORT,
            notify: {
                styles: [
                    'color: rgba(255, 255, 255, .8)',
                    'position: fixed',
                    'z-index: 999999',
                    'bottom: 0px',
                    'left: 0px',
                    'font-size: 1rem',
                    'background: rgba(0, 0, 0, 0.8)',
                    'font-family: arial, sans-serif',
                    'padding: 10px'
                ]
            }
        });
    },
    deploy: function() {
        return gulp.src('./app/**/*')
            .pipe(ghPages())
    }
}

gulp.task('jade', tasks.jade)
gulp.task('sass', tasks.sass)
gulp.task('server', ['sass'], tasks.server)
gulp.task('script', tasks.script)
gulp.task('deploy', ['bundle'], tasks.deploy)

gulp.task('bundle', ['jade', 'sass', 'script'])
