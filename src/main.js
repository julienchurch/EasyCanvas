splashImage = new Image();
splashImage.src = window.UIAttributes.canvasImageURL;

window.addEventListener("load", function() {
    var headerButtons = document.getElementsByClassName("splash-utility--icon");
    if ( document.getElementById("splash") ) {
        splashCanvasCallback();
        var headerButtonsParent = document.getElementById("splash");
    }
    if ( document.getElementById("view-box") ) {
        viewBoxBlurCallback();
        viewBoxLayoutHeaderDropdownCallback();
    }
    for ( var i = 0; i < headerButtons.length; i++ ) {
        StraylightUI.createBlurredOverlay( headerButtonsParent,
                                           headerButtons[i],
                                           splashImage,
                                           80,
                                           4 );
    }

    var layoutHeaderDDTarget = document.getElementById( "layout-header--dropdown-target" );
    var layoutHeaderDD = new dd( layoutHeaderDDTarget,
                         document.getElementById( "layout-header--dropdown" ));
    StraylightUI.createBlurredOverlay( splash, layoutHeaderDD.dropdown, splashImage, 90, 3  );
    // var ddCanvas = new EasyCanvas();
    // ddCanvas.setCanvas( document.querySelector( "#layout-header--dropdown canvas" ) );
    // ddCanvas.cacheImageData();
    // ddCanvas.saturate( 5 );
    // var layoutHeaderDDBfx = new BlurFx( ddCanvas );
    // layoutHeaderDDBfx.createBlurStack( "stackblur", 120 );
    // var ddTimeout = function() {
        // window.setTimeout( function() {
            // layoutHeaderDDBfx.animateF( 120 );
        // }, 0);
    // }
    // layoutHeaderDDTarget.addEventListener( "mouseup", ddTimeout );
    // for ( var i = 0; i < headerButtons.length; i++ ) {
        // var boundingRect = headerButtons[i].getBoundingClientRect(),
            // canv = new EasyCanvas(),
            // canvUnderlay = new EasyCanvas();

        // // Style the overlay
        // canv.canvas.className = "overlay";
        // canv.canvas.style.position     = "absolute";
        // canv.canvas.style.borderRadius = "3px";
        // canv.canvas.width              = headerButtons[i].offsetWidth;
        // canv.canvas.height             = headerButtons[i].offsetHeight;

        // // Style the underlay
        // canvUnderlay.canvas.className = "underlay";
        // canvUnderlay.canvas.style.position     = "absolute";
        // canvUnderlay.canvas.style.borderRadius = "3px";
        // canvUnderlay.canvas.width              = headerButtons[i].offsetWidth;
        // canvUnderlay.canvas.height             = headerButtons[i].offsetHeight;

        // canv.ctx.drawImage( window.UICanvas.canvas,
                            // boundingRect.left >> 3 | 0,
                            // boundingRect.top >> 3 | 0,
                            // canv.canvas.width >> 3,
                            // canv.canvas.height >> 3, 
                            // 0,
                            // 0,
                            // canv.canvas.width << 3,
                            // canv.canvas.height << 3);

        // canvUnderlay.ctx.drawImage( window.UICanvas.canvas,
                                    // boundingRect.left >> 3 | 0,
                                    // boundingRect.top >> 3 | 0,
                                    // canvUnderlay.canvas.width >> 3,
                                    // canvUnderlay.canvas.height >> 3, 
                                    // 0,
                                    // 0,
                                    // canvUnderlay.canvas.width << 3,
                                    // canvUnderlay.canvas.height << 3);

        // canv.cacheImageData();

        // canvUnderlay.cacheImageData( canvUnderlay.ctx.getImageData( 0,
                                                                    // 0,
                                                                    // canvUnderlay.canvas.width,
                                                                    // canvUnderlay.canvas.height ) );
        // if ( window.UIAttributes.scheme == "light" ) {
            // canv.saturate( 2 );
            // canv.lighten( 150 );
            // canv.contrast( -35 );
            // canvUnderlay.lighten( 80 );
            // canvUnderlay.saturate( 9 );
        // } else {
            // canv.contrast( -100 );
            // canv.saturate( 2 );
            // canvUnderlay.saturate( 4 );
        // }

        // headerButtons[i].appendChild( canv.canvas );
        // headerButtons[i].insertBefore( canvUnderlay.canvas, headerButtons[i].firstChild );
    // }
    var themeTargets = document.getElementsByClassName("theme-target");
    for ( var i = 0; i < themeTargets.length; i++ ) {
        themeTargets[i].addEventListener( "click", function( e ) {
            e.preventDefault();
            var themedElements = document.getElementsByClassName("themed");
            var classes = this.className.split(" ");
            var theme = classes.filter( function( el ) {
                return ( el.indexOf( "theme-target--" ) === 0 );
            } );
            theme = theme[0].substr( 14, theme[0].length );
            if ( theme == "snow" ) {
                for ( i = 0; i < themedElements.length; i++ ) {
                    classie.remove( themedElements[i], "theme-midnight" );
                    classie.add( themedElements[i], "theme-snow" )
                    console.log( themedElements[i] );
                }
            } else {
                for ( i = 0; i < themedElements.length; i++ ) {
                    classie.remove( themedElements[i], "theme-snow" );
                    classie.add( themedElements[i], "theme-midnight" )
                    console.log( themedElements[i] );
                }
            }
        } );
    }
});

window.addEventListener( "resize", function() {
    splashCanvasResizeCallback();
} );
