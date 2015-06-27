var gulp = require('gulp');
var browserify = require('browserify')
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var babelify = require('babelify');
var jadeify = require('jadeify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var nib = require('nib');
var ext_replace = require('gulp-ext-replace');
var watch = require('gulp-watch');
var browsersync = require('browser-sync');

var paths = {
  scripts: './src/scripts',
  styles: './src/styles',
  src: './src',
  build: './build',
  build_scripts : './build/scripts',
  build_styles : './build/styles'
}

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src(paths.src + '/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(ext_replace('.php'))
    .pipe(gulp.dest(paths.build))
});

gulp.task('scripts', function(){
  return browserify({
    entries: paths.scripts + '/ix.js',
    transform: [jadeify, babelify]
  })
  .bundle()
  .pipe(source('ix.js'))
  .pipe( buffer() )
  .pipe( gulp.dest(paths.build_scripts) )
});

gulp.task('styles', function(){
  gulp.src(paths.styles + '/main.styl')
    .pipe(stylus({
        use: [nib()],
        'include css': true
      }))
    .pipe( gulp.dest( paths.build_styles ) );
});

gulp.task('watch', function() {
  gulp.watch(paths.src + '/**/*.js', ['scripts', 'browsersync-reload']);
  gulp.watch(paths.src + '/**/*.styl', ['styles', 'browsersync-reload']);
  gulp.watch(paths.src + '/**/*.jade', ['templates','scripts', 'browsersync-reload']);
});

// BrowserSync proxy
gulp.task('browser-sync', function() {
  browsersync.init({
        proxy: "sabana.dev"
  });
});

// BrowserSync reload all Browsers
gulp.task('browsersync-reload', function () {
    browsersync.reload();
});


gulp.task('default', ['browser-sync','watch']);
