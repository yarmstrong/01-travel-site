import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
    constructor() {
        this.siteHeader = $('.site-header');
        this.headerTriggerElement = $('.large-hero__title'); /* this jquery will return a Jquery object and not the JS native DOM element */
        this.createHeaderWaypoint();
        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWaypoint();
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
                    
                    if (direction == "down") {
                        /* either js or jquery way will work 
                        var marchingHeaderLink = currentPageSection.getAttribute("data-matching-link"); */
                        var marchingHeaderLink = $(currentPageSection).attr("data-matching-link");

                        /* reset class of is-current-link before setting a new one */
                        that.headerLinks.removeClass("is-current-link");
                        $(marchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "18%"
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
                offset: "-50%" /* uses (-) for upward */
            });
        });
    }
}

export default StickyHeader;