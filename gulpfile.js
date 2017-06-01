var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

//SASS TASK
gulp.task('styles', function() {
    gulp.src('my_portfolio/src/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('my_portfolio/src/sass/css'))
        .pipe(browserSync.stream());
});

//PUG TASK
gulp.task('markup', function() {
    return gulp.src('my_portfolio/src/pug/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('././'))
        .pipe(gulp.dest('my_portfolio/dest'));
});

// AUTOPREFIXER TASK
gulp.task('autoprefixer', () =>
    gulp.src('my_portfolio/src/sass/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('my_portfolio/dest/css/'))
);



// Static Server + watching scss/html files
gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('my_portfolio/src/sass/**/*.sass',['styles']);
    gulp.watch('my_portfolio/src/sass/css/*.css',['autoprefixer']).on('change', browserSync.reload);
    gulp.watch('my_portfolio/src/pug/**/*.pug',['markup']).on('change', browserSync.reload);
});



// WATCH
gulp.task('watch',function() {

});

gulp.task('default', ['styles', 'markup', 'autoprefixer', 'watch', 'serve' ]);
