var gulp = require('gulp');
var del = require('del');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var replace = require('gulp-rev-replace');
var less = require('gulp-less');


gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('compile', ['clean'], function () {

    var js = gulp.src('src/static/scripts/*.js', {base: 'src/static'})
        .pipe(uglify());

    var css = gulp.src('src/static/styles/*.less', {base: 'src/static'})
        .pipe(less());

    var img = gulp.src('src/static/images/*.less', {base: 'src/static'});

    return merge(js, css, img)
        .pipe(rev())
        .pipe(gulp.dest('dist/static'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/tmp'));
});

gulp.task('revision', ['compile'], function () {

    return gulp.src('dist/static/**')
        .pipe(rev())
        .pipe(gulp.dest('dist/static'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/tmp'));
});

gulp.task('replace', ['compile'], function () {

    return gulp.src('src/views/*.hbs')
        .pipe(replace({manifest: gulp.src('dist/tmp/rev-manifest.json')}))
        .pipe(gulp.dest('dist/views'));
});

gulp.task('copy', ['clean', 'compile', 'replace'], function () {
    return gulp.src([
        'src/**',
        '!src/static/**',
        '!src/views/**'
    ])
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'compile', 'replace', 'copy'], function () {
    return del(['dist/tmp']);
});

gulp.task('default', ['clean', 'build']);