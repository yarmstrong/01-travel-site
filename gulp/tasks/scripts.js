var gulp = require('gulp'),
    webpack = require('webpack');

gulp.task('scripts', function(callback) {
    /* globally installed webpack allows command line to run webpack command
        to integrate webpack in a GULP task, need to download it within the project
    */
    webpack(require('../../webpack.config.js'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback(); // determines if webpack is completed
    });
});