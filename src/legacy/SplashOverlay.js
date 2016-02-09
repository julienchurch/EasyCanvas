var uploadImagesButton = document.querySelector(".splash .utilities button.button");

var SplashOverlay = (function( overlay ) {

    var open   = false,
        events = [],
        content;

    var categoryFollowers = [].slice.call( document.querySelectorAll(".followers .img-wrapper") ),
        categoryFollowersText = document.querySelector(".followers span");
        h1 = document.querySelector("h1"),
        hideableAssets = [];
    hideableAssets.push( h1 );
    hideableAssets.push( uploadImagesButton );
    hideableAssets.push( categoryFollowersText );
    hideableAssets = hideableAssets.concat( categoryFollowers );
        

    function isOpen() {
        return open;
    }
    
    function toggleState() {
        open = !open;
    }

    function toggleCoverAssets( assets ) {
        for (var i = 0; i < assets.length; i++ ) {
            if ( classie.has( assets[i], "hidden" ) || classie.has( assets[i], "visible" ) ) {
                classie.toggle( assets[i], "hidden" );
                classie.toggle( assets[i], "visible" );
            } else {
                classie.add( assets[i], "hidden" );
            }
        }
    }

    function toggleOverlay() {
        classie.toggle( overlay, "open" );
        classie.toggle( overlay, "close" )
    }

    function removeContent() {

    }

    function injectContent() {

    }

    function attachEvent( e, target, newContent ) {
        target.addEventListener( e, function() {
            if ( ! isOpen() ) {
                splashBlur.animateBlurF( 100 );
                toggleCoverAssets( hideableAssets );
                toggleOverlay();
                injectContent( content );
                if ( ! newContent === undefined ) {
                    content = newContent;
                } else {
                    content = "Something went wrong.";
                }
                toggleState();
            } else { // If it's already open
                removeContent( content );
                toggleOverlay();
                splashBlur.animateBlurB( 100 );
                toggleCoverAssets( hideableAssets );
                toggleState();
            }
        } );
    };
    // var methods = {
        // toggle : function(trigger) {
            // classie.toggle(coverOverlayContent, "close");
            // classie.toggle(coverOverlayContent, "open");
        // }
    // };
    return {
           isOpen    : isOpen,
           toggleState : toggleState,
           attachEvent : attachEvent
           }

})( document.getElementById("splash-overlay") );

( function() {
    
} )()

