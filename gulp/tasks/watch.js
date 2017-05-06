var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(); //use only the create() method that it has

/* define a watch task that everytime changes been made to the 
    (parent directory or root of our proj folder)/app/index.html
    the gulp html task is started
    
    run it as: $ gulp watch and end it with ctrl+c
    note that gulp doesnt end unless we tell it to end
*/
gulp.task('watch', function() {
    
    browserSync.init({
        // tell browserSync where our website lives (the index.html)
        notify: false,
        server: {
            baseDir: "app"
        }
    });
    
    // tell browserSync to do reload everytime index.html changes
    watch('./app/index.html', function() {
//        gulp.start('html');
        browserSync.reload();
    });
    
    /* trigger this new task for any changes made on any 
        css files on the ./app/assets/styles/ folder and 
        any hypothetical folder inside with *.css extension
    */
    watch('./app/assets/styles/**/*.css', function() {
        /* gulp.start('styles');
            IMPT: will no longer run the styles stask here?? why oh why?
            so now when will our POSTCSS task (styles) ever run??
            if you look at the gulp.task declation for cssInject,
            we added the task dependecies ([task here] -- which should 
            be finished first before running the cssInject function)
        */
        gulp.start('cssInject');
    });
    
    watch('./app/assets/scripts/**/*.js', function() {
        // make browsersync to refresh browser for us, once webpack task completed
        gulp.start('scriptsReload');
    });
});

// tell browserSync to do reload everytime css changes
gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
    // browserSync.stream() anything we pipe into it is available in the browser
    // note gulp.src has return bec it is an async action
});

gulp.task('scriptsReload', ['scripts'], function() {
    browserSync.reload();
})