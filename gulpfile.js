var gulp = require('gulp'),
  less = require('gulp-less'),
  jade = require('gulp-jade'),
  bower = require('gulp-bower'),
  gutil = require('gulp-util'),
  browserify = require('browserify'),
  path = require('path'),
  minifycss = require('gulp-minify-css'),
  buffer = require('vinyl-buffer'),
  source = require('vinyl-source-stream'),
  shell = require('gulp-shell'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  paths = {
    public: 'public/**',
    jade: ['!app/shared/**', 'app/**/*.jade'],
    scripts: 'app/**/*.js',
    styles: 'app/styles/*.+(less|css)'
  };

gulp.task('less', function() {
  gulp.src(paths.styles)
    .pipe(less({
      paths: [path.join(__dirname, './app/styles')]
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public/'));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('browserify', function() {
  return browserify('./app/scripts/app.js').bundle()
    .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
    .on('error', gutil.log.bind(gutil, 'Browserify ' +
      'Error: in browserify gulp task'))
    // vinyl-source-stream makes the bundle compatible with gulp

  .pipe(source('app.min.js')) // Desired filename
    // Output the file
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('serve', ['less'], function() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
});

gulp.task('test:fend', ['browserify', 'bower'], function() {
  // Be sure to return the stream
  return gulp.src('*.js', {
      read: false
    })
    .pipe(shell([
      'karma start'
    ]));
});


gulp.task('watch', function() {
  // livereload.listen({ port: 35729 });
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
  gulp.watch(paths.scripts, ['browserify']);
  gulp.watch(paths.public).on('change', reload);
});

gulp.task('build', ['jade', 'less', 'browserify', 'bower']);

gulp.task('default', ['watch', 'build', 'serve']);
