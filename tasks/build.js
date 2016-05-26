import gulp from 'gulp';
import babel from 'gulp-babel';

import paths from '../paths.json';

gulp.task('build', () => {
	return gulp.src(paths.source.javascript)
		.pipe(babel())
		.pipe(gulp.dest(paths.build.directories.output));
});
