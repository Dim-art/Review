var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');
	autoprefixer = require('gulp-autoprefixer'),
	// ftp = require('vinyl-ftp'),
	notify = require('gulp-notify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	rsync = require('gulp-rsync')

gulp.task('common-js', function(){
	return gulp.src([
		'app/js/common.js',
	])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.min.js',
		])
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "./app"
		},
		notify: false,
		// tunnel: true,
		// tunnel: "review", //Demo page: http://review.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix: ''}))
	.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function () {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['app/libs/**/*.js', 'app/js/common.js'], ['js']);
	//gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

// gulp.task('styles', function () {
// 	return gulp.src('sass/*.sass')
// 		.pipe(sass({
// 			includePaths: require('node-bourbon').includePaths
// 		}).on('error', sass.logError))
// 		.pipe(rename({ suffix: '.min', prefix: '' }))
// 		.pipe(autoprefixer({ browsers: ['last 15 versions'], cascade: false }))
// 		.pipe(cleanCSS())
// 		.pipe(gulp.dest('app/css'))
// 		.pipe(browserSync.stream());
// });

// gulp.task('scripts', function () {
// 	return gulp.src([
// 		'./app/libs/modernizr/modernizr.js',
// 		'./app/libs/jquery/jquery-1.11.2.min.js',
// 		'./app/libs/waypoints/waypoints.min.js',
// 		'./app/libs/animate/animate-css.js',
// 		'./app/libs/plugins-scroll/plugins-scroll.js',
// 		'./app/libs/superfish/dist/js/superfish.min.js',
// 		'./app/libs/owl.carousel/dist/owl.carousel.min.js',
// 		'./app/libs/jQuery.mmenu/dist/jQuery.mmenu.js'
// 	])
// 		.pipe(concat('libs.js'))
// 		// .pipe(uglify()) //Minify libs.js
// 		.pipe(gulp.dest('./app/js/'));
// });

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });
gulp.task('default', ['browser-sync', 'watch']);
