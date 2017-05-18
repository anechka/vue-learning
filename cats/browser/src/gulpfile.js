const gulp = require("gulp");

const rollup = require("rollup-stream");// JS modules
const buble = require("rollup-plugin-buble");// ES6 compiler
const eslint = require("gulp-eslint");// Code style checker

const includePaths = require("rollup-plugin-includepaths");// import module by name
const source = require("vinyl-source-stream");// saving rollup bundle

const config = {
    bundleName: "vueDjango",

    srcLocation: "js/",
    distLocation: "../dist/",
    eslintRules: require("./rules"),

    includePathOptions: {
        paths: ["js/"]
    }
};

gulp.task("javascript", function() {

    return rollup({
            // any option supported by Rollup can be set here.
            format: "iife",
            sourceMap: true,
            entry: `${config.srcLocation}index.js`,
            moduleName: config.bundleName,
            plugins: [
                //vue(),
                buble({transforms: { forOf: false }}),
                includePaths(config.includePathOptions),
                //nodeResolve({ browser: true, jsnext: true, main: true }),
                //commonjs()
            ]
        })
        .pipe(source("all.js"))
        .pipe(gulp.dest(`${config.distLocation}js`));
});

gulp.task("lint", () => {
    // ESLint ignores files with "tests" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([`${config.srcLocation}/**/*.js`, `!${config.srcLocation}tests/**`])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint(
            {
                useEslintrc: false,
                parserOptions: {
                    "ecmaVersion": 6,
                    "sourceType": "module"
                },
                extends: "eslint:recommended",
                rules: config.eslintRules,
                envs: [
                    "es6"
                ],
                globals: [
                    "Vue",
                    "window",
                    "console",
                    "fetch",
                    "XMLHttpRequest"
                ]
            }
        ))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format("codeframe"))
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task("default", () => gulp.watch(`${config.srcLocation}**/*`, ["lint", "javascript"]));