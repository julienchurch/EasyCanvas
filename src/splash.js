
// Some frequently-used DOM elements
var subheader = document.querySelector("#splash-nav"),
    bottomWrap = document.querySelector(".splash .wrap.bottom"),
    splashOverlay = document.getElementById("splash-overlay"),
    splashOverlayWrap    = document.querySelector("#splash-overlay .wrap");

function query(selector) {
    return document.querySelector("." + selector);
}

function setCanvasToContainerDims( canvas, container ) {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
}


var splashCanvas    = document.getElementById( "splashCanvas" ),
    splashCtx       = splashCanvas.getContext("2d"),
    splashImage     = new Image(),
    splashContainer = document.getElementById( "splashContainer" ),
    splashDims      = Util.getDims( splashContainer );
splashImage.src = splashBGURL; 

var splashBlur;

window.addEventListener("load", function() {
    // Getting spaghetti everywhere again
    // This function pulls the animation from the covernav
    var removeCoverNavAnim = setTimeout( function() {
        var compensators = Array.prototype.slice.call( document.getElementsByClassName("compensator") );
        for ( c in compensators ) {
            classie.add( compensators[c], "loaded" );
        }
        clearTimeout( removeCoverNavAnim );
    }, 1500 );

    splashOverlay.style.top = subheader.offsetHeight + "px";

    // Set the canvas to the dimensions of its container, then draw the image onto it
    setCanvasToContainerDims( splashCanvas, splashContainer );
    canvasIP.drawCover( splashCanvas, splashImage );


    // Initialize the blurring effects for the splash canvas 
    splashBlur = new blurFx(),
    stackBlurCallback = function( radius ) {
        return stackBlurCanvasRGB( "splashCanvas", 0, 0, splashDims.width, splashDims.height, radius );
    };
    splashBlur.createEnv( splashCanvas, 100, stackBlurCallback );
    // ...and create some variables we'll need
    var blurStack = splashBlur.getBlurStack();
    // This doesn't quite logically follow, but it's relatied
    var blurryImageData = blurStack[ blurStack.length - 1 ].id,
        blurryCanvas = CanvasUtil.createCanvas( splashDims.width, splashDims.height, blurryImageData );
    // ...and create a context for resizing
    var splashBlurResize = Util.callAfterFinalResize();
    // We want to blur under the button, so get the button offset dimensions.
    // (We already have a reference to the subheader, so we just take the offsetWidth/offsetHeight);
    var buttonOffsetY = bottomWrap.offsetTop,
    // Have to account for the padding
        buttonOffsetX = bottomWrap.offsetLeft + parseInt(window.getComputedStyle(bottomWrap, null).getPropertyValue("padding-left").slice(0,-2));

    function x() {
        // So now we have a blurred canvas in memory and the offset dimensions
        // Back on the original canvas we create a path around the elements we want to blur under
        CanvasUtil.createRoundedRect( splashCtx, buttonOffsetX, buttonOffsetY, 150, 40, 3 );
        splashCtx.rect( 0, 0, splashDims.width, subheader.offsetHeight );
        splashCtx.clip();
        splashCtx.drawImage( blurryCanvas.canvas, 0, 0 );
    }
    x();

    function drawUnderblursToBlurStack() {
        var tmp = CanvasUtil.createCanvas( splashDims.width, splashDims.height );
        for ( var i = 0; i < blurStack.length - 1; i ++ ) {
            if ( i == 0 ) {
                tmp.ctx.drawImage( splashCanvas, 0, 0 );

            } else {
                tmp.ctx.putImageData( blurStack[i].id, 0, 0 );
            }
            tmp.ctx.rect( 0, 0, splashDims.width, subheader.offsetHeight );
            CanvasUtil.createRoundedRect( splashCtx, buttonOffsetX, buttonOffsetY, 150, 40, 3 );
            tmp.ctx.clip();
            tmp.ctx.drawImage( blurryCanvas.canvas, 0, 0 );
            var tmpImgData = {
                id : tmp.ctx.getImageData( 0, 0, splashDims.width, splashDims.height ),
                tx : 0,
                ty : 0
            };
            splashBlur.updateBlurStack( i, tmpImgData );
        }
    } 
    drawUnderblursToBlurStack();
    var close = document.querySelector( ".js-closeSplashOverlay" );

    SplashOverlay.attachEvent( "click", uploadImagesButton, "This is some content" );
    SplashOverlay.attachEvent( "click", close  );

    var a = new galleryBlur( "gallery-thumbnail-fx-1" );
    var b = new galleryBlur( "gallery-thumbnail-fx-2" );
    var c = new galleryBlur( "gallery-thumbnail-fx-3" );
    var d = new galleryBlur( "gallery-thumbnail-fx-4" );
    var e = new galleryBlur( "gallery-thumbnail-fx-5" );
    var f = new galleryBlur( "gallery-thumbnail-fx-6" );
    var g = new galleryBlur( "gallery-thumbnail-fx-7" );
    var h = new galleryBlur( "gallery-thumbnail-fx-8" );
    var i = new galleryBlur( "gallery-thumbnail-fx-9" );
    var j = new galleryBlur( "gallery-thumbnail-fx-10" );
    var k = new galleryBlur( "gallery-thumbnail-fx-11" );
    var l = new galleryBlur( "gallery-thumbnail-fx-12" );
    window.addEventListener("resize", function() {

        if ( ! SplashOverlay.isOpen() ) {
            setCanvasToContainerDims( splashCanvas, splashContainer );
            canvasIP.drawCover( splashCanvas, splashImage ); 
            newSplashDims = Util.getDims( splashContainer );
            splashDims = Util.getDims( splashContainer );
            // We want to blur under the button, so get the button offset dimensions.
            // (We already have a reference to the subheader, so we just take the offsetWidth/offsetHeight);
            buttonOffsetY = bottomWrap.offsetTop;
            // Have to account for the padding
            buttonOffsetX = bottomWrap.offsetLeft + parseInt(window.getComputedStyle(bottomWrap, null).getPropertyValue("padding-left").slice(0,-2));

            newStackBlurCallback = function( radius ) {
                return stackBlurCanvasRGB( "splashCanvas", 0, 0, newSplashDims.width, newSplashDims.height, radius );
            }

            splashBlurResize.createEnv( function() {
                splashBlur.createEnv( splashCanvas, 150, newStackBlurCallback );
                blurStack = splashBlur.getBlurStack();
                blurryImageData = blurStack[ blurStack.length - 1 ].id;
                blurryCanvas = CanvasUtil.createCanvas( splashDims.width, splashDims.height, blurryImageData );
                x();
                drawUnderblursToBlurStack();
            }, 250 );
            splashBlurResize.execute();
        } else {
            // do nothing yet
        }
    });
});

