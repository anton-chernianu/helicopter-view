var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'), 
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'), 
	pngquant = require('imagemin-pngquant'), 
	tinypng = require('gulp-tinypng'), 
	del = require('del'), 
	pug = require('gulp-pug'), 
  browserSync  = require('browser-sync'),

  concat = require('gulp-concat'),
  minifyJS = require('gulp-minify'),

  uglify = require('gulp-uglifyjs'),
  cssmin = require('gulp-cssmin'),
  htmlmin = require('gulp-htmlmin'),

	rename = require('gulp-rename')
    ; 

gulp.task('tinypng', function () {
    gulp.src('src/images/**/*.{png,jpg,jpeg}')
        .pipe(tinypng('_yFpjOjLfxb02qJjVNOpqjF2g0eiNZwp1'))
        .pipe(gulp.dest('build/tinypng'));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера 
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']); 
	gulp.watch('src/*.html', browserSync.reload); 
	gulp.watch('src/js/**/*.js', browserSync.reload);
	gulp.watch('src/css/**/*.css', browserSync.reload);
	gulp.watch('src/pug/**/*.pug', ['pug']); 
});

gulp.task('pug', function() {
  return gulp.src('src/pug/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('src'));
});


gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('./src/css/'));
});

// gulp.task('img', function() {
// 	return gulp.src('src/images/**/*') // Берем все изображения из src
// 		.pipe(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
// 			interlaced: true,
// 			progressive: true,
// 			svgoPlugins: [{removeViewBox: false}],
// 			use: [pngquant()]
// 		}))
// 		.pipe(gulp.dest('build/images')); // Выгружаем на продакшен
// });

gulp.task('build', ['clean', 'sass'], function() {

	var buildCss = gulp.src('src/css/**/*') // Переносим css в продакшен
	.pipe(gulp.dest('build/css'))

	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('build/fonts'))

	var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('build/js'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('build'));

	var buildHtml = gulp.src('src/images/**/*') // Переносим TinyPng в продакшен
	.pipe(gulp.dest('build/images'));

});

gulp.task('con-css', function() { // объединение файлов
  return gulp.src([
  	'./src/css/font-awesome.min.css',
  	'./src/css/jquery.lineProgressbar.min.css',
  	'./src/css/magnific-popup.css',
  	'./src/css/owl.carousel.min.css',
  	'./src/css/main.css'
  	 ])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('min/'));
});

gulp.task('con-js', function() { // объединение файлов
  return gulp.src([
  	'./src/js/jquery-3.2.1.min.js',
  	'./src/js/jquery.lineProgressbar.js',
  	'./src/js/jquery.magnific-popup.min.js',
  	'./src/js/progressbar.js',
  	'./src/js/scrollreveal.min.js',
  	'./src/js/jquery.viewportchecker.min.js',
  	'./src/js/jquery.shuffle.min.js',
  	'./src/js/owl.carousel.min.js',
  	'./src/js/main.js'
  	 ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('min/'));
});


gulp.task('compress-js', function () {
  gulp.src('min/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('min/'))
});

gulp.task('compress-css', function () {
    gulp.src('min/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('min/'));
});

gulp.task('htmlmin', function() {
  return gulp.src('build/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('min'));
});

gulp.task('compress', ['clean-min','con-css','con-js'], function() {
console.log('finish');
});

gulp.task('minify', ['compress-js', 'compress-css'], function() {
console.log('finish');
});

gulp.task('clean', function() {
	return del.sync('build'); 
});

gulp.task('clean-min', function() {
	return del.sync('min'); 
});

gulp.task('default', ['watch']);