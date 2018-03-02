
module.exports = function (gulp, plugins, browserSync) {

	// STYLES

	return function (cb) {
		
		gulp.src(['frontend/sass/*.{scss,sass}', 'core/sass/**/*.{scss,sass}'])
			.pipe(plugins.sourcemaps.init())	

			.pipe(plugins.wait(200))
			// .pipe(plugins.changed('./app/css', {
			// 	extension: '.css',
			// 	hasChanged: plugins.changed.compareContents
			// }))
			.pipe(plugins.sass({
				outputStyle: 'expanded',
				errLogToConsole: true,
			}))
			.on('error', plugins.notify.onError({
				title: 'SASS error'
			}))
			//.pipe(plugins.rename({suffix: '.min', prefix : ''}))
			.pipe(plugins.autoprefixer({
				browsers: ['last 15 versions'],
				cascade: false
			}))
			//.pipe(plugins.cleanCSS())
			.pipe(plugins.sourcemaps.write())		
			.pipe(gulp.dest('./app/css'))
			.pipe(browserSync.stream());
		cb();
	};
};