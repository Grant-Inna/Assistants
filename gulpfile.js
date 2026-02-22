const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      del = require('del'),
      browserSync = require('browser-sync').create(),
      sourcemaps = require('gulp-sourcemaps'),
      gulpif = require('gulp-if'),
      gcmq = require('gulp-group-css-media-queries'),
      imagemin = require('gulp-imagemin'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      jade = require('gulp-jade'),
      less = require('gulp-less');

const isDev = process.argv.indexOf('--dev') !== -1,
      isProd = !isDev,
      isSync = process.argv.indexOf('--sync') !== -1;

const base = './develop/',
      src = './develop/assets/',
      prod = './build/',
      dist = './build/assets/';

function html(done){
   return gulp.src( base + '*.jade' )
   .pipe(jade({pretty: true}))
   .pipe(gulp.dest( prod ))
   .pipe(gulpif(isSync, browserSync.stream()));
   done();
}


function styles(){
   return gulp.src( [ src + 'css/style.less' ])
   .pipe(gulpif(isDev, sourcemaps.init()))
   .pipe(less())
   .pipe(gcmq())
   .pipe(autoprefixer())
   .pipe(gulpif(isProd, cleanCSS({
      level: 2
   })))
   .pipe(gulpif(isDev, sourcemaps.write() ))
   .pipe(gulp.dest( dist + 'css'))
   .pipe(gulpif(isSync, browserSync.stream()))
}

function data(done){
   return gulp.src([src + 'data/*', src + 'data/**/*'])
   .pipe(gulp.dest( dist + 'data'));
   done();
}
function font(done){
   return gulp.src(src + 'font/**/*')
   .pipe(gulp.dest( dist + 'font/'));
   done();
}
function js(done){
   return gulp.src(src + 'js/*')
   .pipe(gulpif(isProd, uglify()))
   .pipe(gulp.dest( dist + 'js'));
   done();
}

function clear(){
   return del( prod + '*');
}


function watch(done){
   if(isSync){
      browserSync.init({
         server: {
            baseDir: './build/'
         }
      });
   }
   
   gulp.watch( src + 'css/**/*.less', styles);
   gulp.watch( base + '*.jade', html);
   gulp.watch( src + 'jade/**/*.jade', html);
   gulp.watch( src + 'data/*', data);
   gulp.watch( src + 'data/**/*', data);
   gulp.watch( src + 'js/*', js);
   done();
}

// function grid(done){
//    smartgrid( src + 'css/base', gridOptions);
//    done();
// }

const build = gulp.series(clear,
   gulp.parallel(html, styles, js, data, font )
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
// gulp.task('grid', gulp.parallel(grid));
gulp.task('font', font);
gulp.task('js', js);
gulp.task('data', data);


/*

let gridOptions = {
   columns: 24,
   offset: "60px",
   // mobileFirst: true,
   container: {
      maxWidth: "1400px",
      fields: "60px" // fields не меньше offset делённого на 2
   },
   breakPoints: {
      ll: {
         width: "1350px"
      },
      xxl: {
         width: "1240px"
      },
      xl: {
         width: "1150px",
         offset: "40px"
      },
      middle: {
         width: "1030px",
         offset: "30px"
      },
      lg: {
         width: "995px",
         fields: "40px",
         offset: "20px"
      },
      md: {
         width: "770px"
      },
      smmd: {
         width: "660px"
      },
      sm: {
         width: "580px",
         fields: "30px",
         offset: "10px"
      },
      xs: {
         width: "470px"
      },
      xxs: {
         width: "370px"
      }
   }
};
*/
