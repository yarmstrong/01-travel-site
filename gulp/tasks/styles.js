var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    csssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    hexrgba = require('postcss-hexrgba');

gulp.task('styles', function() {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, mixins, csssvars, nested, hexrgba, autoprefixer]))
        .on('error', function(errorInfo) {
            /* end things on a positive note even if an error happens
                ?? this was put before the gulp.dest() since the error
                came from postcss() actions ??, and on.error() is called
                for us to manipulate the info returned to GULP aka...
                on error, we want 'this' task or this stream to tell 
                GULP or emit to GULP, that the task has ended gracefully
                (GULP doesnt need to know if the task completed
                correctly or with error) --> but this will not 
                log any error since GULP has no idea we encountered
                an error in the 1st place, --> so we log an errorInfo
                note: errorInfo by itself will give many unneeded
                info so we trigger toString() method
            */
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});