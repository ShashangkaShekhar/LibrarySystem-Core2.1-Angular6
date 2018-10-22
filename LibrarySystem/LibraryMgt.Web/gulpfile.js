/// <binding AfterBuild='build-all' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

var root_path = {
    webroot: "./wwwroot/"
};

//library source
root_path.nmSrc = "./node_modules/";

//library destination
root_path.package_lib = root_path.webroot + "lib/";

gulp.task('copy-lib-js', function () {
    gulp.src('./node_modules/core-js/**/*.js')
        .pipe(gulp.dest(root_path.package_lib + 'core-js'));

    gulp.src('./node_modules/@angular/**/*.js')
        .pipe(gulp.dest(root_path.package_lib + '@angular'));

    gulp.src('./node_modules/zone.js/**/*.js')
        .pipe(gulp.dest(root_path.package_lib + 'zone.js'));

    gulp.src('./node_modules/systemjs/**/*.js')
        .pipe(gulp.dest(root_path.package_lib + 'systemjs'));

    gulp.src('./node_modules/reflect-metadata/**/*.js')
        .pipe(gulp.dest(root_path.package_lib + 'reflect-metadata'));

    gulp.src('./node_modules/rxjs/**/*.js')
        .pipe(gulp.dest(root_path.package_lib + 'rxjs'));

    gulp.src('./node_modules/angular-highcharts/**/*.js')
        .pipe(gulp.dest(root_path.package_lib + 'angular-highcharts'));

    gulp.src('./node_modules/highcharts/**.js')
        .pipe(gulp.dest(root_path.package_lib + 'highcharts'));
});

gulp.task("copy-all", ["copy-lib-js"]);
//Copy End

gulp.task('min-js', function () {
    gulp.src(['./clientapp/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(root_path.webroot + 'app'));
});

gulp.task('copy-html', function () {
    gulp.src('clientapp/**/*.html')
        .pipe(gulp.dest(root_path.webroot + 'app'));
});

gulp.task("build-all", ["min-js", "copy-html"]);
//Build End