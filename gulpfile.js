// Initialize modules
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const purgecss = require("gulp-purgecss");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const browsersync = require("browser-sync").create();
const babelify = require("babelify");

// Sass Task
// sourcemaps make debug easier!
function scssTask() {
  return src("./src/scss/style.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(dest("./dist/style", { sourcemaps: "." }));
  // .pipe(purgecss({ content: ["./*.html"] }))
}

// JavaScript Task
function jsTask() {
  return browserify({
    entries: ["./src/js/controller.js"],
    debug: true,
  })
    .transform(
      babelify.configure({
        presets: ["@babel/preset-env"],
        sourceMaps: true,
      })
    )
    .bundle()
    .pipe(source("controller.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./dist/script/"));
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ["./"],
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("./*.html", browserSyncReload);
  watch(
    ["./src/scss/**/*.scss", "src/**/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
