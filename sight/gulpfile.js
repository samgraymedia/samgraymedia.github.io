//requires gulp
var gulp = require('gulp');
//requires gulp sass plugin
var sass = require('gulp-sass');
//requires browser sync plugin
var browserSync = require('browser-sync').create();
//requires gulp useref plugin
var useref = require('gulp-useref');
// Other requires...
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

//compile sass to css and reload broswer
gulp.task('sass', function() {
  return gulp.src('src/sass/style.sass')
  .pipe(sass())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});
// start server and broswer sync
gulp.task('browserSync', function() {
  browserSync.init({
    server:{
      baseDir: 'dist'
    },
  })
});
gulp.task('html', function(){
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
});

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('src/media/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      // Setting interlaced to true
      interlaced: true
    }))
  .pipe(gulp.dest('dist/media'))
});

gulp.task('images', function(){
  return gulp.src('drc/media/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/mesia'))
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'html', 'watch'],
    callback
  )
});

//watch for changes in dist foler and reload broswer.
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('src/**/*.sass', ['sass']);
  gulp.watch('dist/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});
