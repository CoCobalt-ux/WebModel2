const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const del = require('del');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const header = require('gulp-header');
const strip = require('gulp-strip-comments');
const svgmin = require('gulp-svgmin'); // минификация SVG

// Очистка папки dist
async function clean() {
    await del(['dist/**', '!dist']);
}

// Проверка существования
function checkExists(path) {
    return fs.existsSync(path);
}

// SCSS → CSS
function styles() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

// Изображения (контент)
function imagesContent() {
    if (!checkExists('src/images/content')) return del(['dist/images/content/**']);
    return gulp.src('src/images/content/**/*.{jpg,jpeg,png}')
        .pipe(webp())
        .pipe(gulp.dest('dist/images/content'))
        .pipe(browserSync.stream());
}

// Изображения (иконки)
function imagesIcons() {
    if (!checkExists('src/images/icons')) return del(['dist/images/icons/**']);

    // SVG — минифицируем
    gulp.src('src/images/icons/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('dist/images/icons'))
        .pipe(browserSync.stream());

    // PNG/ICO — копируем без минификации
    return gulp.src('src/images/icons/**/*.{png,ico}')
        .pipe(gulp.dest('dist/images/icons'))
        .pipe(browserSync.stream());
}

// Шрифты
function fonts() {
    if (!checkExists('src/fonts')) return del(['dist/fonts/**']);
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
}

// PHPMailer
function phpmailer() {
    if (!checkExists('src/phpmailer')) return del(['dist/phpmailer/**']);
    return gulp.src('src/phpmailer/**/*')
        .pipe(gulp.dest('dist/phpmailer'))
        .pipe(browserSync.stream());
}

// Файлы robots / send
function files() {
    const tasks = [];
    if (checkExists('src/robots.txt')) {
        tasks.push(gulp.src('src/robots.txt').pipe(gulp.dest('dist')).pipe(browserSync.stream()));
    } else tasks.push(del(['dist/robots.txt']));

    if (checkExists('src/send.php')) {
        tasks.push(gulp.src('src/send.php').pipe(gulp.dest('dist')).pipe(browserSync.stream()));
    } else tasks.push(del(['dist/send.php']));

    return Promise.all(tasks);
}

// Прочие ресурсы
function download() {
    if (!checkExists('src/download')) return del(['dist/download/**']);
    return gulp.src('src/download/**/*')
        .pipe(gulp.dest('dist/download'))
        .pipe(browserSync.stream());
}

function translations() {
    if (!checkExists('src/translations')) return del(['dist/translations/**']);
    return gulp.src('src/translations/**/*')
        .pipe(gulp.dest('dist/translations'))
        .pipe(browserSync.stream());
}

function video() {
    if (!checkExists('src/video')) return del(['dist/video/**']);
    return gulp.src('src/video/**/*')
        .pipe(gulp.dest('dist/video'))
        .pipe(browserSync.stream());
}

// HTML
function html() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

// JS (dev)
function scripts() {
    return gulp.src('src/js/components/**/*.js')
        .pipe(concat('main.js'))
        .pipe(strip())
        .pipe(header('"use strict";\n\n'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

// JS (prod)
function scriptsProd() {
    return gulp.src('src/js/components/**/*.js')
        .pipe(concat('main.js'))
        .pipe(strip())
        .pipe(header('"use strict";\n\n'))
        .pipe(terser())
        .pipe(gulp.dest('dist/js'));
}

// BrowserSync сервер
function serve(done) {
    browserSync.init({
        server: { baseDir: 'dist' },
        notify: false,
        open: true,
        port: 3000
    });
    done();
}

// Универсальный хендлер
function handleNewFiles() {
    return Promise.all([
        imagesContent(),
        imagesIcons(),
        fonts(),
        files(),
        download(),
        translations(),
        video(),
        phpmailer()
    ]);
}

// WATCH
function watch(done) {
    gulp.watch('src/**/*.html',                              html);
    gulp.watch('src/**/*.scss',                              styles);
    gulp.watch('src/js/**/*.js',                             scripts);
    gulp.watch('src/images/content/**/*.{jpg,jpeg,png}',    imagesContent);
    gulp.watch('src/images/icons/**/*.{svg,png,ico}',       imagesIcons);
    gulp.watch('src/fonts/**/*',                             fonts);
    gulp.watch('src/translations/**/*',                      translations);
    gulp.watch('src/video/**/*',                             video);
    gulp.watch('src/phpmailer/**/*',                         phpmailer);
    gulp.watch('src/download/**/*',                          download);
    gulp.watch(['src/robots.txt', 'src/send.php'],           files);
    done();
}

// DEV задача
const dev = gulp.series(
    clean,
    gulp.parallel(
        styles,
        html,
        scripts,
        imagesContent,
        imagesIcons,
        fonts,
        files,
        download,
        translations,
        video,
        phpmailer
    ),
    serve,
    watch
);

// PROD сборка
const build = gulp.series(
    clean,
    gulp.parallel(
        styles,
        html,
        scriptsProd,
        imagesContent,
        imagesIcons,
        fonts,
        files,
        download,
        translations,
        video,
        phpmailer
    )
);

exports.clean = clean;
exports.build = build;
exports.dev = dev;
exports.default = dev;
