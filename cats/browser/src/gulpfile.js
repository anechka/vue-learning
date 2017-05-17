let gulp = require("gulp");
let rollup = require('rollup-stream');
let buble = require("rollup-plugin-buble");

let includePaths = require("rollup-plugin-includepaths");
let source = require('vinyl-source-stream');

let config = {
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