



const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify')
const del = require('del')
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create();



function js(){
    return src('./dev/js/**.js', 'node_modules/medium-editor/dist/js/medium-editor.min.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('./public/javascripts'))
}

function scss(){
    return src('./dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('./public/stylesheets'))
}

function clear(){
    return del('dist')
}

function serve(){
    sync.init({
        server: './public'
    })
    watch('dev/scss/**/*.scss', series(scss)).on('change', sync.reload)
    watch('dev/js/**/*.js', series(js)).on('change', sync.reload)
}

exports.build = series(clear, scss, js)
exports.serve = series(clear, scss, js, serve)
exports.clear = clear



