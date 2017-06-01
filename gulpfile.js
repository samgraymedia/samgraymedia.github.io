var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

//SASS TASK
gulp.task('styles', function() {
    gulp.src('my_portfolio/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('my_portfolio/sass/css'))
        .pipe(browserSync.stream());
});

//PUG TASK
gulp.task('markup', function() {
    return gulp.src('my_portfolio/pug/**/*.pug')
        .pipe(pug()) // pip to jade plugin
        .pipe(gulp.dest('././')); // tell gulp our output folder
});

// AUTOPREFIXER TASK
gulp.task('autoprefixer', () =>
    gulp.src('my_portfolio/sass/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('././css/'))
);



// Static Server + watching scss/html files
gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('my_portfolio/sass/**/*.sass',['styles']);
    gulp.watch('my_portfolio/sass/css/*.css',['autoprefixer']).on('change', browserSync.reload);
    gulp.watch('my_portfolio/pug/**/*.pug',['markup']).on('change', browserSync.reload);
});



// WATCH
gulp.task('watch',function() {

});

gulp.task('default', ['styles', 'markup', 'autoprefixer', 'watch', 'serve' ]);
