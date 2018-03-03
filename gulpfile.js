const gulp 			= require('gulp'); // gulp
const plugins 		= require('gulp-load-plugins')(); // Автоматическая подгрузка gulp плагинов

const del 			= require('del');
const ftp 			= require('vinyl-ftp');
const fs 			= require('fs');

const browserSync 	= require('browser-sync').create();
const op 			= require('./options.json');




// Дополнительные либы Node.js
const libs = {

	del: require('del'),
	ftp: require('vinyl-ftp'),
	fs: require('fs'),
	gulpif: require('gulp-if'),

	sprity: require('sprity'),
	injectSvg: require('gulp-inject-svg'),

	emitty: require('emitty').setup('frontend/pug', 'pug', {  makeVinylFile: true})	
}

const tasks = './gulp/';  // Путь к gulp таскам






//Сборка стилей sass
gulp.task('styles', require(tasks + 'styles')(gulp, plugins, browserSync));



//Сборка разметки pug
gulp.task('pug', require(tasks + 'pug')(gulp, plugins, libs, browserSync, op));





//Копирование папки
// gulp.task('copy', require(tasks + 'copy')(gulp, file, dest));




//Таск выбора типа проекта
gulp.task('base-front', require(tasks + 'base-front')(gulp, plugins, op));




//Копирование вендорных файлов при создании проекта
gulp.task('copy-vendors', require(tasks + 'copy-vendors')(gulp, plugins, op));




//Добавляет папки
gulp.task('add-dist', require(tasks + 'add-dist')(fs));




//Создает фавки для мобильных
gulp.task('fav-resize', require(tasks + 'fav-resize')(gulp, plugins));




//Удаляет папку
gulp.task('remove-base', (cb) => {
	var pause = setTimeout(delFile, 3000);
	function delFile() {
		del.sync('base_folders');
	}
	cb();
});





// PNG SPRITE
gulp.task('sprite:png', require(tasks + 'sprite-png')(gulp, plugins));




// SVG SPRITE
gulp.task('sprite:svg', require(tasks + 'sprite-svg')(gulp, plugins));




//Заливка на хостинг
gulp.task('deploy', require(tasks + 'deploy')(gulp, plugins, ftp, op, libs));




//Запуск локального сервера
gulp.task('server', require(tasks + 'server')(browserSync, op));



 
gulp.task('injectSvg', function() {
 
  return gulp.src('app/*.html')
    .pipe(libs.injectSvg({
    	base: '/app'
    }))
    .pipe(gulp.dest('app/'));
 
});






gulp.task('watch', () => {

	gulp.watch(['frontend/**/*.{scss,sass}', 'core/**/*.{scss,sass}'], gulp.series('styles'));

	global.watch = true;

	gulp.watch(['frontend/**/*.pug', 'core/pug/**/*.pug'], gulp.series('pug'))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});

	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);

	gulp.watch(['core/sprites/png/*.{png,jpg}'], gulp.series('sprite:png'));
	gulp.watch(['core/sprites/svg/*.svg'], gulp.series('sprite:svg'));

});





gulp.task('create', gulp.series('add-dist', 'copy-vendors', 'fav-resize'));

gulp.task('default', gulp.parallel('server', gulp.series('pug', 'styles'), 'watch'));


