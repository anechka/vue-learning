const gulp = require("gulp");

const rollup = require('rollup-stream');// JS modules
const buble = require("rollup-plugin-buble");// ES6 compiler
const eslint = require('gulp-eslint');// Code style checker

const includePaths = require("rollup-plugin-includepaths");// import module by name
const source = require('vinyl-source-stream');// saving rollup bundle

const config = {
    bundleName: "vueDjango",
    srcLocation: "js/",
    distLocation: "../dist/",

    includePathOptions: {
        paths: ['js/']
    }
};

gulp.task('javascript', function() {

    return rollup({
            // any option supported by Rollup can be set here.
            format: 'iife',
            sourceMap: true,
            entry: config.srcLocation +'index.js',
            moduleName: config.bundleName,
            plugins: [
                //vue(),
                buble({transforms: { forOf: false }}),
                includePaths(config.includePathOptions),
                //nodeResolve({ browser: true, jsnext: true, main: true }),
                //commonjs()
            ]
        })
        .pipe(source('all.js'))
        .pipe(gulp.dest(config.distLocation +'js'));

});

gulp.task('lint', () => {
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
                rules: {
                    "indent": "error",
                    "camelcase": "warn",
                    "comma-dangle": "warn",
                    "quotes": ["warn", "double", { "allowTemplateLiterals": true, "avoidEscape": true }],
                    "no-console": ["warn", { allow: ["warn", "error"] }],
                    "no-alert": "error",
                    "no-constant-condition": "error",
                    "no-empty": "warn",
                    "no-extra-boolean-cast": "warn",
                    "no-extra-parens": "error",
                    "no-extra-semi": "error",
                    "no-else-return"   : "warn",
                    "block-spacing": "error",
                    "space-unary-ops": "error",
                    "consistent-return": "error",
                    "no-sparse-arrays": "error",
                    "no-template-curly-in-string": "error",
                    "no-unreachable": "error",
                    "no-unsafe-negation": "error",
                    "valid-typeof": "error",
                    "no-unexpected-multiline": "error",

                    "block-scoped-var": "error",
                    "class-methods-use-this": "error",
                    "complexity": "error",
                    "curly": ["warn", "multi-line"],
                    "dot-location": ["warn", "property"],
                    "dot-notation": ["warn", { "allowPattern": "^[a-z]+(_[a-z]+)+$" }],
                    "eqeqeq": ["warn", "smart"],
                    //"guard-for-in": ["warn"],
                    "no-empty-function": "error",
                    "no-eval": "error",
                    "no-fallthrough": "error",
                    "no-global-assign": "error",
                    "no-invalid-this": "error",
                    "no-lone-blocks": "error",
                    "no-multi-spaces": "error",
                    "no-redeclare": "error",
                    "no-self-assign": "error",
                    "no-throw-literal": "error",
                    "no-unmodified-loop-condition": "error",
                    "no-unused-expressions": "warn",
                    "no-useless-concat": "warn",
                    "no-useless-escape": "warn",
                    "no-useless-return": "warn",
                    "no-warning-comments": "warn",
                    "no-with": "error",
                    "prefer-promise-reject-errors": "error",
                    "radix": "warn",
                    "require-await": "warn",
                    "vars-on-top": "error",
                    "yoda": "warn",
                    "init-declarations": ["error", "always"],
                    "no-undef": "error",
                    "no-undef-init": "error",
                    "no-undefined": "error",
                    "no-use-before-define": "error",
                    "no-unused-vars": ["warn", { "varsIgnorePattern": "^[aA]pp$" }],
                    // Stylistic
                    "array-bracket-spacing": "warn",
                    "brace-style": ["warn", "stroustrup", { "allowSingleLine": true }],
                    "comma-style": "warn",
                    "consistent-this": ["error", "self"],
                    "func-call-spacing": "error",
                    "func-name-matching": "error",
                    "func-style": ["warn", "expression", { "allowArrowFunctions": true }],
                    //"semi": ["warn", "always", { "omitLastInOneLineBlock": true }],
                    "semi-spacing": "error",
                    "comma-spacing": "warn",
                    "id-length": "warn",
                    "key-spacing": "error",
                    "keyword-spacing": "error",
                    "line-comment-position": "warn",
                    "linebreak-style": "error",
                    "lines-around-comment": ["error",
                        {
                            "beforeBlockComment": true,
                            "allowBlockStart": true,
                            "allowObjectStart": true
                        }
                    ]
                },
                envs: [
                    'es6'
                ],
                globals: [
                    'Vue',
                    'window',
                    'console',
                    'fetch',
                    'XMLHttpRequest'
                ]
            }
        ))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});