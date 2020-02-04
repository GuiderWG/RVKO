var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		browserSync  = require('browser-sync'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify-es').default,
		cleancss     = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		rsync        = require('gulp-rsync'),
		newer        = require('gulp-newer'),
		rename       = require('gulp-rename'),
		responsive   = require('gulp-responsive'),
		del          = require('del');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done(); };

// Custom Styles
gulp.task('styles', function() {
	return gulp.src('app/scss/*.scss')
	.pipe(sass())
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// LIBS CONCAT
gulp.task('minicss', function() {
	return gulp.src([
		'app/scss/libs/**/*.scss',
		'app/scss/libs/**/*.min.scss',
	])
	.pipe(sass({ outputStyle: 'expanded' }))
	.pipe(concat('libs.min.css'))
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// Scripts & JS Libraries
gulp.task('scripts', function() {
	return gulp.src([
		// 'node_modules/jquery/dist/jquery.min.js', // Optional jQuery plug-in (npm i --save-dev jquery)
		'app/js/libs/_lazy.js', // JS library plug-in example
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});
// Scripts & JS Libraries
gulp.task('scripts', function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js', // Optional jQuery plug-in (npm i --save-dev jquery)
		'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
		'node_modules/owl.carousel/dist/owl.carousel.min.js',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
		'node_modules/wow.js/dist/wow.min.js',
		'app/js/libs/_lazy.js', // JS library plug-in example
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// Responsive Images
gulp.task('img-responsive', async function() {
	return gulp.src('app/img/_src/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('app/img/@1x'))
		.pipe(responsive({
			'*': [{
				// Produce @2x images
				width: '100%', quality: 90, rename: { prefix: '@2x/', },
			}, {
				// Produce @1x images
				width: '50%', quality: 90, rename: { prefix: '@1x/', }
			}]
		})).on('error', function () { console.log('No matching images found') })
		.pipe(rename(function (path) {path.extname = path.extname.replace('jpeg', 'jpg')}))
		.pipe(gulp.dest('app/img'))
});
gulp.task('img', gulp.series('img-responsive', bsReload));

// Clean @*x IMG's
gulp.task('cleanimg', function() {
	return del(['app/img/@*'], { force: true })
});

// Code & Reload
gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

// Deploy
gulp.task('rsync', function() {
	return gulp.src('app/')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('watch', function() {
	gulp.watch('app/scss/libs/**/*.scss', gulp.parallel('minicss'));
	gulp.watch('app/scss/*.scss', gulp.parallel('styles'));
	gulp.watch(['app/js/libs.min.js', 'app/js/scripts.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch('app/img/_src/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('img', 'styles', 'minicss', 'scripts', 'browser-sync', 'watch'));
