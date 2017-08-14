import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        
        this.lazyImages = $(".lazyload");

        this.siteHeader = $('.site-header');
        this.headerTriggerElement = $('.large-hero__title'); /* this jquery will return a Jquery object and not the JS native DOM element */
        this.createHeaderWaypoint();
        
        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        
        /* get height of the siteHeader as 
            offset for downward scrolling */
        this.siteHeaderHeight = this.siteHeader.innerHeight();
        
        this.createPageSectionWaypoint();
        this.addSmoothScrolling();

        this.refreshWaypoints();
    }
    
    refreshWaypoints() {
        this.lazyImages.on('load', function() {
            Waypoint.refreshAll();
        })
    }

    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
    }
    
    createHeaderWaypoint() {
        var that = this;
        new Waypoint({
            element: that.headerTriggerElement[0],
            /* element: this.headerTriggerElement wrong
                since should use JS native DOM element,
                and Object[0] is the JS native DOM */
            /* note: 'this' keyword is still preserved here
                compared when handler function is triggered
                i think. bec same result for using 
                that.headerTriggerElement[0] vs
                this.headerTriggerElement[0] */
            /* once this element reached top of the screen
                where our site-header is, then do something */
            handler: function(direction) {
                if (direction == "down") {
                    that.siteHeader.addClass('site-header--dark');
                    /* 'this' keyword is no longer preserved here i think
                        bec it is no longer understood by browser */    
                }
                else {
                    that.siteHeader.removeClass('site-header--dark');
                }
            }
        });
    }
    
    createPageSectionWaypoint() {
        var that = this;
        
        this.pageSections.each(function() {
            
            var currentPageSection = this;
            
            /* how to get which index array is the current 'this'
                console.log('$currentPageSection');
                console.log($(currentPageSection));  
                console.log('index: ' + that.pageSections.index(this));
                var that2 = that; --> set this on this scope
                console.log('index: ' + that2.pageSections.index(currentPageSection)); --> set this on the next function
            */
            var firstIndex = false;
            if (that.pageSections.index(this) == 0) {
                firstIndex = true;
            }
            
            /* to watch for downward direction */
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    /* once you reached a page section, you will target 
                        its custom attributes which points to the id
                        you set on the nav links. once you acesss this
                        link, you can now modify its css style via 
                        addition of class */
                    
                    /* this is the DOM html div for currentPageSection
                        console.log('currentPageSection');
                        console.log(currentPageSection); 
                        <div id="our-beginning" class="page-section" data-matching-link="#our-beginning-link"> */
                    
                    /* this is the currentPageSection array object?? 
                        console.log('$currentPageSection');
                        console.log($(currentPageSection));
                        [div#our-beginning.page-section] */
                    
                    /* either js or jquery way will work 
                        var marchingHeaderLink = currentPageSection.getAttribute("data-matching-link"); */
                    var marchingHeaderLink = $(currentPageSection).attr("data-matching-link");
                    
                    if (direction == "down") {
                        /* reset class of is-current-link before setting a new one */
                        that.headerLinks.removeClass("is-current-link");
                        $(marchingHeaderLink).addClass("is-current-link");
                    }
                    else {
                        /* during upward movement and this is the first of the section */
                        if (firstIndex) {
                            that.headerLinks.removeClass("is-current-link"); 
                        }
                    }
                },
                offset: that.siteHeaderHeight
                /* 0: when top of element reaches the top of screen
                    25: when top of element reached top + 25px of the screen 
                    -whole height of your element for bottom of element to hit the top of the window */
            });
            
            /* to watch for upward direction */
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction == "up") {
                        var marchingHeaderLink = $(currentPageSection).attr("data-matching-link");
                        that.headerLinks.removeClass("is-current-link");
                        $(marchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: function() {
                    return -$(currentPageSection).innerHeight();
                    /* trigger handler when bottom of element 
                        hit the top of the window --> need offset
                        to be (-) of the whole height of the section;
                        (-) means out of view of the window screen */
                }
            });
        });
    }
}

export default StickyHeader;