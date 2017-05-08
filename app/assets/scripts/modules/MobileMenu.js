/* normal way to define Object vs the es6 code since we are now using babel
function Person(fullName, favColor) {
    this.name = fullName;
    this.favoriteColor = favColor;
    this.greet = function() {
        console.log(this.name + ' has a favorite color of ' + this.favoriteColor + '.');
    }
}
*/

/* module.exports = Person;
    what does this line of code do??
    if simple console logging is added here, this logging will take effect
    meaning that the export works. however, what module.exports does is to
    export or expose certain part of the Person.js file and make those part
    accessible or callable from within the main App.js 
    
    if we dont do this line of code, the exported Object in the REQUIRE from
    the main App.js is just an empty Object (an empty exports Object)
    
    if we want to put an object into it, we try to set things as follows
    (exposing multiple things instead of 1 simple constructor function):
    
    exports.exampleProperty = "Some value";
    exports.exampleFunction = function() {
        alert('this is an example');
    };
    
    and this will now be the Object exported into main App.js
*/

/* module.exports = Person; replaced by export default Person;
    why is it replaced?
    instead of using the REQUIRE functionality of node.js / gulp, 
    we can now replace it with es6 import and export functionality 
    since babel is integrated
*/

var $ = require('jquery');

class MobileMenu {
    
    constructor() {
        // this is created as soon as the object is created
        this.siteHeader = $(".site-header");
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $(".site-header__menu-content");
        this.events();
    }
    
    /* list all events you want to watch for
        note that browser will not listen to any events
        listed here as soon as the object is created 
        unless you manually call it in the constructor() */
    events() {
        
        this.menuIcon.click(this.toggleTheMenu.bind(this));
        
        /* we dont want the element that was clicked to be
            sent to the called function, we want 'this' keyword 
            to point back to our object so we can manipulate the DOM
            ie. this(which is the object) --> this(.site-header__menu-icon) 
            that's why we use ".bind(this)" where value of 'this' is the
            main object */
    }
    
    toggleTheMenu() {
        this.menuContent.toggleClass("site-header__menu-content--is-visible");
        this.siteHeader.toggleClass("site-header--is-expanded");
        this.menuIcon.toggleClass("site-header__menu-icon--close-x");
    }
}

export default MobileMenu;











