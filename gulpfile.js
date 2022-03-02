// Initialize modules
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const purgecss = require("gulp-purgecss");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// Sass Task
// sourcemaps make debug easier!
function scssTask() {
  return src("./src/scss/style.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(purgecss({ content: ["./*.html"] }))
    .pipe(dest("./dist/style", { sourcemaps: "." }));
}

// JavaScript Task
function jsTask() {
  return src("./src/js/script.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("./dist/script", { sourcemaps: "." }));
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
  watch("./src/*.html", browserSyncReload);
  watch(
    ["./src/scss/**/*.scss", "src/**/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
