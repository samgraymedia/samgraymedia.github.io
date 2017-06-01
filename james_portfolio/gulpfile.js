var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

//SASS TASK
gulp.task('styles', function() {
    gulp.src('src/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.stream());
});

//PUG TASK
gulp.task('markup', function() {
    return gulp.src('src/pug/**/*.pug')
        .pipe(pug()) // pip to jade plugin
        .pipe(gulp.dest('././dest')); // tell gulp our output folder
});

// AUTOPREFIXER TASK
gulp.task('autoprefixer', () =>
    gulp.src('src/sass/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('././dest/css/'))
);



// Static Server + watching scss/html files
gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "dest"
    });

    gulp.watch('src/sass/**/*.sass',['styles']);
    gulp.watch('src/sass/css/*.css',['autoprefixer']).on('change', browserSync.reload);
    gulp.watch('src/pug/**/*.pug',['markup']).on('change', browserSync.reload);
});



// WATCH
gulp.task('watch',function() {

});

gulp.task('default', ['styles', 'markup', 'autoprefixer', 'watch', 'serve' ]);
