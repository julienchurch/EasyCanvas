var boardScripts = (function() {
    var splashCanvas    = new EasyCanvas(),
        splashTmpCanvas = new EasyCanvas(),
        splashImage     = new Image();
    splashCanvas.canvas.setAttribute("id", "splash--canvas");
    splashTmpCanvas.canvas.setAttribute("id", "splash--canvas-tmp");
    splashImage.src = window.UIAttributes.canvasImageURL;

    function splashCanvasCallback() {
        var splash = document.getElementById("splash");
        var splashOverlay = document.querySelector(".splash--overlay");
        var splashUtilities = document.getElementById("splash--utilities");

        StraylightUI.createBlurredOverlay( splash, splashUtilities, splashImage, 90, 2.5 );
        splash.insertBefore( splashCanvas.canvas, splash.firstChild );
        splashCanvas.styleAsBackground( splash, splashImage );
        splashCanvas.cacheImageData();
        splashBlurFx = new BlurFx( splashCanvas );
        splashBlurFx.createBlurStack( "stackblur", 120 );
        // var state = true;
        // splash.addEventListener( "click", function() {
            // if ( state ) {
                // // classie.add( splashOverlay, "darken" );
                // splashBlurFx.animateF( 150 );
                // classie.add( document.querySelector(".splash .heading-wrap"), "hidden");
            // } else {
                // // classie.remove( splashOverlay, "darken" );
                // splashBlurFx.animateB( 150 );
                // classie.remove( document.querySelector(".splash .heading-wrap"), "hidden");
            // }
            // state = !state;
        // } );

        window.UICanvas = StraylightUI.createBlurredTempCanvas( splashCanvas.canvas, 90 );

        var headerButtons = document.querySelectorAll(".splash-utility--icon .overlay");
        for ( var i = 0; i < headerButtons.length; i++ ) {
            headerButtons[i].className = headerButtons[i].getAttribute("class") + " overlay-light";
        }

        var boardImages = document.getElementsByClassName("board-image");
        for ( var i = 0; i < boardImages.length; i++ ) {
            StraylightUI.createBoardImageBlurredOverlay( boardImages[i], 50, 2 );
        }
    }

    function splashCanvasResizeCallback() {
        splashCanvas.sizeTo( splash );
        splashCanvas.drawCover( splashImage );
    }

    return { splashCanvasCallback       : splashCanvasCallback,
             splashCanvasResizeCallback : splashCanvasResizeCallback
           };
})();

var splashCanvas     = new EasyCanvas(),
    splashTmpCanvas  = new EasyCanvas(),
    splashImage      = new Image();
splashCanvas.canvas.setAttribute("id", "splash--canvas");
splashTmpCanvas.canvas.setAttribute("id", "splash--canvas-tmp");
splashImage.src = window.UIAttributes.canvasImageURL;

function splashCanvasCallback() {
    var splash = document.getElementById("splash");
    var splashOverlay = document.querySelector(".splash--overlay");
    var splashUtilities = document.getElementById("splash--utilities");

    StraylightUI.createBlurredOverlay( splash, splashUtilities, splashImage, 90, 2.5 );
    splash.insertBefore( splashCanvas.canvas, splash.firstChild );
    splashCanvas.styleAsBackground( splash, splashImage );
    splashCanvas.cacheImageData();
    splashBlurFx = new BlurFx( splashCanvas );
    splashBlurFx.createBlurStack( "stackblur", 120 );
    // var state = true;
    // splash.addEventListener( "click", function() {
        // if ( state ) {
            // // classie.add( splashOverlay, "darken" );
            // splashBlurFx.animateF( 150 );
            // classie.add( document.querySelector(".splash .heading-wrap"), "hidden");
        // } else {
            // // classie.remove( splashOverlay, "darken" );
            // splashBlurFx.animateB( 150 );
            // classie.remove( document.querySelector(".splash .heading-wrap"), "hidden");
        // }
        // state = !state;
    // } );

    window.UICanvas = StraylightUI.createBlurredTempCanvas( splashCanvas.canvas, 90 );

    var headerButtons = document.querySelectorAll(".splash-utility--icon .overlay");
    for ( var i = 0; i < headerButtons.length; i++ ) {
        headerButtons[i].className = headerButtons[i].getAttribute("class") + " overlay-light";
    }

    var boardImages = document.getElementsByClassName("board-image");
    for ( var i = 0; i < boardImages.length; i++ ) {
        StraylightUI.createBoardImageBlurredOverlay( boardImages[i], 50, 2 );
    }
}

function splashCanvasResizeCallback() {
    splashCanvas.sizeTo( splash );
    splashCanvas.drawCover( splashImage );
}


// window.addEventListener("load", function() {
    // viewBox.insertBefore( nc.canvas, viewBoxOverlay );
    // viewBox.insertBefore( tmp.canvas, nc.canvas );
    // nc.canvas.style.position = "absolute";
    // tmp.canvas.style.position = "absolute";
    // tmp.canvas.style.background = "lime";
    // // Bitshifted to decrease size in proportion with viewbox
    // tmp.size( viewBox.offsetWidth >> 3, viewBox.offsetHeight >> 3 );
    // nc.sizeTo( viewBox );
    // tmp.drawCover( image );
    // tmp.saturate( 2 );
    // bfx.setCanvas( tmp.canvas );
    // bfx.setImageData( tmp.imageData );
    // bfx.createBlurStack( "stackblur", 120 );
    // bfx.setCanvas( nc.canvas );
    // var s = true;
    // window.addEventListener("click", function() {
        // if (s) {
            // bfx.animateF( 100 );
        // } else {
            // bfx.animateB( 100 );
        // }
        // s = !s;
    // });
    // //nc.lighten( 60 );
    // // tmp.contrast( 255 );
    // var imgd = stackBlurCanvasRGB( "view-box--canvas-tmp", 
            // 0, 0, nc.canvas.width, nc.canvas.height, 120 >> 3  );
    // tmp.ctx.putImageData( imgd.id, 0, 0 );
    // nc.ctx.drawImage( tmp.canvas, 0, 0, nc.canvas.width, nc.canvas.height );
    // nc.ctx.drawImage( image, 0, 0, nc.canvas.width, nc.canvas.height );
    // // nc.ctx.drawImage( tmp, 0, 0, (viewBox.offsetWidth << 3) + 100, (viewBox.offsetHeight << 3)  + 100);

// });
// window.addEventListener("resize", function() {
    // nc.sizeTo( viewBox );
    // nc.drawCover( image );
    // nc.saturate( 2 );
    // var imgd = stackBlurCanvasRGB( "view-box--canvas", 
        // 0, 0, nc.canvas.width, nc.canvas.height, 120  );
    // nc.ctx.putImageData( imgd.id, 0, 0 )
// });



