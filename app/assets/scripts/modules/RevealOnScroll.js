import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor(els, offset) {
        this.itemsToReveal = $(els);
        this.offsetPercentage = offset;
        this.hideInitially();
        this.createWaypoints();
    }
    
    hideInitially() {
        this.itemsToReveal.addClass('reveal-item');
        /* create a new css file for this class since 
            we want this to be re-usable as an object
            applicable for any element */
    }
    
    createWaypoints() {
        
        /* note: the reason we dont use bind() here is
            bec we did not try click() event that 
            changes the value of 'this' */
        
        var that = this;
        /* save first the current 'this' value to another 
            var to preserve it since 'this' value will 
            changed once Waypoint object is created */
        
        this.itemsToReveal.each(function() {
            
            /* create a Waypoint object in order to use it
                BUT for each loop here, save first the current 
                'this' value to another var to preserve
                it since 'this' value will changed once 
                Waypoint object is created 
                
                the for loop value is different from the
                var that = this; above
            */
            
            var currentItem = this;
            
            new Waypoint({
                element: currentItem, 
                /* this is the trigger element or the element 
                    being watched */
                handler: function() {
                    $(currentItem).addClass('reveal-item--is-visible');
                },
                offset: that.offsetPercentage
                /* 0%: once the element reached 0% or top of the 
                    window it will then trigger the callback function 
                   100%: once the elements passes the 100% or 
                    bottom of the window
                   */
            });
        });
    } 
}

export default RevealOnScroll;