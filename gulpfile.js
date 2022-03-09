// function task1(){
//   return Promise.resolve();
// }
// exports.t1=task1


// html
const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")

const htmlmin = require('gulp-htmlmin');
function minifyHTML() {
    return src('project/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
}

exports.html = minifyHTML



// js 
const concat = require('gulp-concat');
const terser = require('gulp-terser');

function jsMinify() {
    return src('project/js/**/*.js',{sourcemaps:true}) 
    
        .pipe(concat('all.min.js'))
        .pipe(terser())
        .pipe(dest('dist/assets/js',{sourcemaps:'.'}))
}
exports.js = jsMinify

//css 
var cleanCss = require('gulp-clean-css');
function cssMinify() {
    return src("project/css/*.css")
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css'))
}
exports.css = cssMinify


// images 
const imagemin = require('gulp-imagemin');

function imgMinify() {
    return gulp.src('project/pics/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}
exports.img = imgMinify


// sass 
const sass = require('gulp-sass')(require('sass'));
function sassMinify() {
    return src(["project/sass/**/*.scss", "project/css/**/*.css"],{sourcemaps:true})
        .pipe(sass()) 
        .pipe(concat('style.sass.min.css'))
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css',{sourcemaps:'.'}))
}



// var browserSync = require('browser-sync');
// function serve (cb){
//   browserSync({
//     server: {
//       baseDir: 'dist/'
//     }
//   });
//   cb()
// }

// function reloadTask(done) {
//   browserSync.reload()
//   done()
// }

// exports.default = parallel(imgMinify, jsMinify, minifyHTML)
// exports.default = series(imgMinify, jsMinify, minifyHTML)

//watch task
// function watchTask() {
//     watch('project/*.html',series(minifyHTML,reloadTask))
//     watch('project/js/*.js',series(jsMinify,reloadTask))
//     // watch('project/css/**/*.css',series(cssMinify))
//     watch(["project/css/*.css","project/sass/**/*.scss"], series(reloadTask));
// }

function watchTask() {
  watch('project/*.html',series(minifyHTML))
  watch('project/js/*.js',series(jsMinify))
  // watch('project/css/**/*.css',series(cssMinify))
  watch(["project/css/*.css","project/sass/**/*.scss"]);
}
exports.default = series(parallel(imgMinify, jsMinify, minifyHTML ,sassMinify),watchTask)




